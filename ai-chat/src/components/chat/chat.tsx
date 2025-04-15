"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessageList } from "@/components/chat/chat-message-list";
import { ChatScrollButton } from "@/components/chat/chat-scroll-button";
import { ChatTypingIndicator } from "@/components/chat/chat-typing-indicator";
import { ChatWelcomeText } from "@/components/chat/chat-welcome-text";

export const Chat = () => {
  const { messages, input, status, handleInputChange, handleSubmit, stop } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wasAtBottomRef = useRef(true);

  const [showScrollButton, setShowScrollButton] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollButton(false);
  };

  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;

    wasAtBottomRef.current = !isScrolledUp;
    setShowScrollButton(isScrolledUp ? true : false);
  };

  // Track if user was at bottom before new messages render
  useEffect(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    wasAtBottomRef.current = scrollHeight - scrollTop - clientHeight < 100;
  }, [messages.length]);

  // Observe resizing of container to show/hide scroll button
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      const newHeight = container.scrollHeight;

      const shouldShowButton = !wasAtBottomRef.current && newHeight !== contentHeight;
      if (shouldShowButton) {
        setShowScrollButton(true);
      }

      if (wasAtBottomRef.current && newHeight !== contentHeight) {
        scrollToBottom();
      }

      setContentHeight(newHeight);
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, [contentHeight]);

  // Attach scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex size-full flex-col bg-white dark:bg-zinc-900">
      <div
        ref={containerRef}
        className="mb-auto space-y-4 overflow-y-auto p-4"
        onScroll={handleScroll}
      >
        {messages.length === 0 && <ChatWelcomeText />}
        <ChatMessageList messages={messages} />
        {status === "submitted" && <ChatTypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {showScrollButton && <ChatScrollButton scrollToBottom={scrollToBottom} />}

      <ChatInput
        input={input}
        onStop={stop}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        status={status}
      />
    </div>
  );
};
