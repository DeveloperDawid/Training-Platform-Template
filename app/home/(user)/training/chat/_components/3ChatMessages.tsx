"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { User, Loader2, Play } from "lucide-react";
import { ChatMessage, CustomerProfile } from "./types";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
  isChatStarted: boolean;
  customerProfile: CustomerProfile | null;
  onStartChat: () => void;
  // allow nullable ref (useRef<HTMLDivElement | null> is common)
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export default function ChatMessages({
  messages,
  isLoading,
  customerProfile,
  isChatStarted,
  onStartChat,
  messagesEndRef,
}: ChatMessagesProps) {
  // Show start chat prompt if chat hasn't started yet
  if (!isChatStarted) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p className="mb-4 max-w-md mx-auto">
            <strong>Your Role:</strong> You are a support agent. Help the
            customer solve their problem through chat. The AI will play the role
            of the customer.
          </p>

          <Button onClick={onStartChat} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Starting...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Chat
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 px-6">
      <div className="space-y-4 py-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin opacity-50" />
            <p>Customer is connecting...</p>
          </div>
        ) : (
          messages.map((message, index) => {
            if (message.role === "user") {
              return (
                <div key={index} className="flex gap-3 justify-end">
                  {/* User message bubble on the right */}
                  <div className="max-w-[70%] rounded-lg p-3 bg-primary text-primary-foreground">
                    <div className="text-xs mb-1 opacity-75">
                      Support Worker (You)
                    </div>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <div className="text-xs mt-1 opacity-75">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              );
            } else if (message.role === "assistant") {
              return (
                <div key={index} className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="max-w-[70%] rounded-lg p-3 bg-muted">
                    <div className="text-xs mb-1 text-muted-foreground">
                      {customerProfile
                        ? `${customerProfile.name} (${customerProfile.company.name})`
                        : "Customer"}
                    </div>
                    <p className="whitespace-pre-wrap text-foreground">
                      {message.content}
                    </p>
                    <div className="text-xs mt-1 text-muted-foreground">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })
        )}

        {isLoading && messages.length > 0 && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0 mt-1">
              <User className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">
                  Customer is typing...
                </span>
              </div>
            </div>
          </div>
        )}

        {/*  div to scroll to */}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
