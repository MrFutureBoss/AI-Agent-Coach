import { inngest } from "@/inngest/client";
import JSONL from "jsonl-parse-stringify";
import { StreamTranscriptItem } from "@/modules/meetings/types";
import { db } from "@/db";
import { agents, meetings, user } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { createAgent, openai, TextMessage } from "@inngest/agent-kit";

// Configure which AI provider to use
const AI_PROVIDER = process.env.AI_PROVIDER || "openai"; // Options: "openai", "anthropic", "fallback"

const summarizer = createAgent({
  name: "summarizer",
  system:
    `You are an expert summarizer. You write readable, concise, simple content. You are given a transcript of a meeting and you need to summarize it.

Use the following markdown structure for every output:

### Overview
Provide a detailed, engaging summary of the session's content. Focus on major features, user workflows, and any key takeaways. Write in a narrative style, using full sentences. Highlight unique or powerful aspects of the product, platform, or discussion.

### Notes
Break down key content into thematic sections with timestamp ranges. Each section should summarize key points, actions, or demos in bullet format.

Example:
#### Section Name
- Main point or demo shown here
- Another key insight or interaction
- Follow-up tool or explanation provided

#### Next Section
- Feature X automatically does Y
- Mention of integration with Z`.trim(),
  model: openai({ model: "gpt-3.5-turbo", apiKey: process.env.OPENAI_API_KEY }), //depence on the model you want to use
});

// Fallback summarization function when AI APIs are unavailable
const createFallbackSummary = (transcript: StreamTranscriptItem[]) => {
  const speakerIds = [...new Set(transcript.map((item) => item.speaker_id))];
  const totalMessages = transcript.length;
  const duration =
    transcript.length > 0
      ? Math.round(
          (transcript[transcript.length - 1].stop_ts - transcript[0].start_ts) /
            1000 /
            60
        )
      : 0;

  const topics = transcript
    .filter((item) => item.text && item.text.length > 10)
    .slice(0, 5)
    .map((item) => item.text.substring(0, 100) + "...");

  return `### Overview
This meeting involved ${
    speakerIds.length
  } participants and lasted approximately ${duration} minutes. The conversation included ${totalMessages} exchanges covering various topics and discussions.

### Notes
#### Meeting Participants
- ${speakerIds.length} participants

#### Key Discussion Points
${topics.map((topic) => `- ${topic}`).join("\n")}

#### Meeting Statistics
- Total messages: ${totalMessages}
- Duration: ~${duration} minutes
- Participants: ${speakerIds.length}

*Note: This is an automatically generated summary due to API limitations. For enhanced analysis, please check your AI provider API quota.*`;
};

// Enhanced summarization with multiple provider support
const generateSummary = async (
  transcript: StreamTranscriptItem[],
  provider: string = "openai"
) => {
  switch (provider) {
    case "openai":
      try {
        const { output } = await summarizer.run(
          "Summarize the following transcript:" + JSON.stringify(transcript)
        );
        return (output[0] as TextMessage).content as string;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.warn("OpenAI API failed:", errorMessage);
        throw error;
      }

    case "anthropic":
      // You can add Anthropic Claude support here if needed
      // Requires @anthropic-ai/sdk package
      console.warn("Anthropic provider not yet implemented");
      throw new Error("Anthropic provider not implemented");

    case "fallback":
    default:
      return createFallbackSummary(transcript);
  }
};

export const meetingProcessing = inngest.createFunction(
  { id: "/meetings/processing" },
  { event: "meeting/processing" },
  async ({ event, step }) => {
    const response = await step.run("fetch-transcript", async () => {
      return fetch(event.data.transcriptUrl).then((res) => res.text());
    });

    const transcript = await step.run("parse-transcript", async () => {
      return JSONL.parse<StreamTranscriptItem>(response);
    });

    const transcriptWithSpeakers = await step.run("add-speakers", async () => {
      const speakerIds = [
        ...new Set(transcript.map((item) => item.speaker_id)),
      ];

      const userSpeakers = await db
        .select()
        .from(user)
        .where(inArray(user.id, speakerIds))
        .then((users) =>
          users.map((user) => ({
            ...user,
          }))
        );

      const agentSpeakers = await db
        .select()
        .from(agents)
        .where(inArray(agents.id, speakerIds))
        .then((agents) =>
          agents.map((agent) => ({
            ...agent,
          }))
        );

      const speakers = [...userSpeakers, ...agentSpeakers];

      return transcript.map((item) => {
        const speaker = speakers.find(
          (speaker) => speaker.id === item.speaker_id
        );

        if (!speaker) {
          return {
            ...item,
            user: {
              name: "Unknown",
            },
          };
        }

        return {
          ...item,
          user: {
            name: speaker.name,
          },
        };
      });
    });

    let summary: string;

    try {
      // Try to use configured AI provider
      summary = await generateSummary(transcriptWithSpeakers, AI_PROVIDER);
    } catch (error: unknown) {
      // If AI API fails, use fallback
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.warn(
        "AI API failed, using fallback summarization:",
        errorMessage
      );
      summary = createFallbackSummary(transcriptWithSpeakers);
    }

    await step.run("save-summary", async () => {
      await db
        .update(meetings)
        .set({
          summary: summary,
          status: "completed",
        })
        .where(eq(meetings.id, event.data.meetingId));
    });
  }
);
