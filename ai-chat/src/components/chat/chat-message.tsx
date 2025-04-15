import { UIMessage } from "ai";

import { cn } from "@/lib/utils";
import { Markdown } from "@/components/markdown/mardkwon";

export const ChatMessage = ({ message }: { message: UIMessage }) => {
  return (
    <div
      className={cn(
        "max-w-[80%] rounded-lg p-3",
        message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800",
      )}
    >
      <Markdown>{message.content}</Markdown>
    </div>
  );
};
