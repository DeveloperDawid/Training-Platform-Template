"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Send, StopCircle, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  currentMessage: string;
  setCurrentMessage: (v: string) => void;
  onSend: () => void;
  onEndChat: () => void;
  isLoading: boolean;
}

export default function ChatInput({
  currentMessage,
  setCurrentMessage,
  onSend,
  onEndChat,
  isLoading,
}: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex-shrink-0 p-6 border-t">
      <div className="flex gap-2">
        <Textarea
          placeholder="Type your response as support agent..."
          rows={5}
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
          className="flex-1"
        />
        <div className="flex flex-col gap-2 w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64">
          <Button
            onClick={onSend}
            disabled={!currentMessage.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
          <Button
            onClick={onEndChat}
            variant="outline"
            className="gap-2 w-full"
          >
            <StopCircle className="h-4 w-4" />
            End Chat & Get Feedback
          </Button>
        </div>
      </div>
    </div>
  );
}
