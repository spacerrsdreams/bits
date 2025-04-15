import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

import { OPENAI_CHAT_SYSTEM_INSTRUCTIONS } from "@/constants/openai-chat-system-instructions";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    system: OPENAI_CHAT_SYSTEM_INSTRUCTIONS,
    messages,
  });

  return result.toDataStreamResponse();
}
