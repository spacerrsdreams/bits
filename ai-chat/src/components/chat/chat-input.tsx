"use client";

import { ArrowUp, StopCircle } from "lucide-react";
import type React from "react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onStop: () => void;
  status: "submitted" | "streaming" | "ready" | "error";
};

export const ChatInput = ({ input, handleInputChange, handleSubmit, status, onStop }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    adjustHeight();
  }, [input]);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = "auto";
      // Set the height to match the content
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
      }
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className="mx-auto w-full gap-4 text-base md:max-w-3xl md:gap-5 lg:max-w-[40rem] xl:max-w-[48rem]">
      <div className="w-full border-gray-700 p-4">
        <div className="relative">
          <Textarea
            ref={textareaRef}
            className="min-h-[40px] w-full resize-none overflow-hidden rounded-lg border border-gray-300 p-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={input}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            placeholder="Message..."
            disabled={isLoading}
            rows={1}
          />

          <Button
            type="submit"
            onClick={isLoading ? onStop : onSubmit}
            className="absolute right-2 bottom-1.5 h-8 w-8 rounded-full bg-blue-500 p-0 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send message"
          >
            {!isLoading ? <ArrowUp /> : <StopCircle />}
          </Button>
        </div>
      </div>
    </div>
  );
};
