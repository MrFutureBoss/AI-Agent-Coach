"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Bot,
  Users,
  MessageCircle,
  Video,
  Sparkles,
  Zap,
  Globe,
  ArrowRight,
  Play,
  Mic,
  Calendar,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const HomeView = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const features = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI Agents",
      description:
        "Create custom AI agents tailored to your specific needs and use cases",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Meeting Rooms",
      description:
        "Generate unique meeting rooms and invite friends to collaborate",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Real-time Chat",
      description:
        "Chat with AI agents in real-time with intelligent responses",
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Voice & Video",
      description:
        "Talk face-to-face with AI agents through voice and video calls",
    },
  ];

  const benefits = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Smart Conversations",
      description:
        "AI agents that understand context and provide meaningful insights",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Instant Setup",
      description: "Create and join meetings in seconds with just a few clicks",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Global Access",
      description:
        "Connect with AI agents and friends from anywhere in the world",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100">
      {/* Demo Video Modal */}
      <Dialog open={isDemoOpen} onOpenChange={setIsDemoOpen}>
        <DialogContent className="max-w-5xl w-[95vw] h-[85vh] p-0 border-0 bg-black">
          <DialogTitle className="sr-only">Watch Demo Video</DialogTitle>
          <div className="relative w-full h-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDemoOpen(false)}
              className="absolute top-4 right-4 z-10 h-10 w-10 p-0 bg-black/50 hover:bg-black/70 text-white rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
            <iframe
              src="https://player.vimeo.com/video/1087846557?autoplay=1&app_id=122963"
              width="w-[1080px]"
              height="h-[607px]"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Background Animation */}
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </motion.div>

          {/* Main Content */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="secondary" className="mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered Meetings
              </Badge>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Meet with{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  AI Agents
                </span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
                Create custom AI agents, build meeting rooms, and invite friends
                to collaborate. Chat, talk, and interact with intelligent AI
                assistants in real-time.
              </p>

              <div className="mt-10 flex items-center justify-center gap-x-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" asChild>
                    <Link href="/agents">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsDemoOpen(true)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for AI-powered meetings
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From creating AI agents to hosting collaborative sessions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center text-white mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Three simple steps to start your AI meeting
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create AI Agent",
                description:
                  "Design your custom AI agent with specific instructions and personality",
                icon: <Bot className="h-8 w-8" />,
              },
              {
                step: "02",
                title: "Generate Meeting Room",
                description:
                  "Create a unique meeting room and get a shareable link",
                icon: <Calendar className="h-8 w-8" />,
              },
              {
                step: "03",
                title: "Start Collaborating",
                description:
                  "Invite friends and start chatting or talking with your AI agent",
                icon: <Mic className="h-8 w-8" />,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative">
                  {/* <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 transform translate-x-4"></div> */}
                </div>
                <div className="w-12 h-12 mx-auto rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center text-white mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 w-[80%] mx-auto">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why choose our platform?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center text-white mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-green-600">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to start your AI meeting?
            </h2>
            <p className="mt-4 text-lg text-emerald-100">
              Join thousands of users who are already collaborating with AI
              agents
            </p>
            <div className="mt-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/agents">
                    Create Your First AI Agent
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
