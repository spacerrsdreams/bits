import { UIMessage } from "ai";

import { cn } from "@/lib/utils";
import { ChatMessage } from "@/components/chat/chat-message";

export const ChatMessageList = ({ messages }: { messages: UIMessage[] }) => {
  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
        >
          <ChatMessage message={message} key={message.id} />
        </div>
      ))}
    </>
  );
};
