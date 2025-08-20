# AI Configuration Guide

## Current Issue: OpenAI API Quota Exceeded

Your application is experiencing OpenAI API quota limitations. Here are the solutions implemented and configuration options available.

## Solutions Implemented

### 1. Fallback Summarization

- **Inngest Functions**: Added fallback summarization when OpenAI API fails
- **Webhook Route**: Added fallback responses when OpenAI API is unavailable
- **Real-time Client**: Graceful degradation when OpenAI connection fails

### 2. Error Handling

- All OpenAI API calls now have try-catch blocks
- Detailed error logging for debugging
- Graceful fallbacks instead of complete failures

### 3. Cost Optimization

- Changed from `gpt-4o` to `gpt-3.5-turbo` for webhook responses
- Maintained `gpt-3.5-turbo` for Inngest functions

## Environment Variables

Add these to your `.env` file:

```bash
# Required: Your OpenAI API key
OPENAI_API_KEY=your_openai_api_key_here

# Optional: AI Provider selection
AI_PROVIDER=openai  # Options: "openai", "anthropic", "fallback"
```

## Configuration Options

### Option 1: Use Fallback Mode (Recommended for now)

```bash
AI_PROVIDER=fallback
```

- **Pros**: No API costs, always works
- **Cons**: Basic summaries, less intelligent responses
- **Use case**: When you want to avoid API costs entirely

### Option 2: Keep OpenAI with Fallbacks

```bash
AI_PROVIDER=openai
```

- **Pros**: Best quality when API works, automatic fallbacks
- **Cons**: Still costs money when API succeeds
- **Use case**: When you want AI quality but need reliability

### Option 3: Add Alternative Provider

```bash
AI_PROVIDER=anthropic
```

- **Pros**: Different quota limits, potentially better pricing
- **Cons**: Requires additional setup and API key
- **Use case**: When you want to diversify AI providers

## Immediate Actions

### 1. Check OpenAI Billing

Visit [platform.openai.com/account/billing](https://platform.openai.com/account/billing)

- Check current usage
- Verify payment method
- Consider upgrading plan if needed

### 2. Set Fallback Mode

```bash
# Add to your .env file
AI_PROVIDER=fallback
```

### 3. Restart Your Application

```bash
npm run dev
```

## What Happens Now

### With Fallback Mode:

- Meeting summaries will be generated automatically without AI
- Chat responses will use pre-written fallback messages
- No API costs incurred
- All functionality continues to work

### Without Fallback Mode:

- System tries OpenAI first
- Falls back to basic responses if API fails
- You'll see warnings in logs but no crashes

## Long-term Solutions

### 1. OpenAI Plan Upgrade

- Upgrade to a higher tier plan
- Set spending limits
- Monitor usage patterns

### 2. Alternative Providers

- Implement Anthropic Claude
- Add Google Gemini support
- Consider local models for development

### 3. Rate Limiting

- Add delays between API calls
- Implement request queuing
- Cache responses when possible

## Monitoring

Check your application logs for:

- `"OpenAI API failed"` warnings
- `"Using fallback summarization"` messages
- Error details with status codes

## Support

If you continue experiencing issues:

1. Check the logs for specific error messages
2. Verify your environment variables
3. Test with `AI_PROVIDER=fallback` first
4. Contact OpenAI support for billing issues
