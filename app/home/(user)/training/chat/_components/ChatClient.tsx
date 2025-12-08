"use client";

import { useState, useRef, useEffect } from "react";
import { Case } from "@/app/lib/cases/types";
import SupportCaseInfo from "./1SupportCaseInfo";
import CustomerProfileCard from "./2CustomerProfileCard";
import ChatMessages from "./3ChatMessages";
import ChatInput from "./4ChatInput";
import FeedbackModal from "./5FeedbackModal";
import InsufficientChatDialog from "./6InsufficientChatDialog";
import TimerWithNewCaseButton from "../../cases-with-ai/_components/0TimerWithNewCaseButton";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { MessageSquare } from "lucide-react";
import { ChatFeedbackResult, ChatMessage, CustomerProfile } from "./types";
import { IncreaseUpdateChatStatsAction } from "@/app/lib/statistics/chat-stats/server/server-actions";
import { IncreaseUpdateUserStatsChatAction } from "@/app/lib/statistics/user-stats/server/server-actions";
import { loadRandomCaseByUserLevel } from "@/app/lib/cases/server/loaders/cases.loader";

interface ChatClientProps {
  case: Case;
  userLevel: number;
  userId: string;
}

const ChatClient = ({
  case: initialCase,
  userLevel,
  userId,
}: ChatClientProps) => {
  const [caseData, setCaseData] = useState<Case>(initialCase);
  const [customerProfile, setCustomerProfile] =
    useState<CustomerProfile | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [isChatEnded, setIsChatEnded] = useState(false);
  const [evaluation, setEvaluation] = useState<ChatFeedbackResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoadingNewCase, setIsLoadingNewCase] = useState(false);
  const [showInsufficientChatDialog, setShowInsufficientChatDialog] =
    useState(false);

  // Chat timing state
  const [chatStartTime, setChatStartTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [chatDurationMs, setChatDurationMs] = useState<number>(0);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Timer effect to update current time (consistent with cases-with-ai approach)
  useEffect(() => {
    // Set start time on first render when chat is started
    if (isChatStarted && chatStartTime === null) {
      setChatStartTime(Date.now());
      return;
    }

    // Create interval for live timer updates when chat is running
    if (chatStartTime && !isChatEnded) {
      const interval = setInterval(() => {
        setCurrentTime(Date.now() - chatStartTime);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [chatStartTime, isChatEnded, isChatStarted]);

  const startChat = async () => {
    setIsChatStarted(true);
    setIsLoading(true);
    // Timer will be started in useEffect when isChatStarted becomes true

    try {
      const response = await fetch("/api/ai/Gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "start",
          chatHistory: [],
          caseData: {
            id: caseData.id,
            title: caseData.title,
            problem_description: caseData.problem_description,
            solution: caseData.solution,
            ai_instructions: caseData.ai_instructions,
            product_type: caseData.product_type,
            platform_type: caseData.platform_type,
          },
          isFirstMessage: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start chat");
      }

      const data = await response.json();

      if (data.success && data.message) {
        setMessages([data.message]);
        // Store customer profile for subsequent messages
        if (data.customerProfile) {
          setCustomerProfile(data.customerProfile);
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error starting chat:", error);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content:
          "Sorry, there was an error starting the chat. Please try again.",
        timestamp: Date.now(),
      };
      setMessages([errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading || isChatEnded) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: currentMessage.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/Gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          chatHistory: [...messages, userMessage],
          caseData: {
            id: caseData.id,
            title: caseData.title,
            problem_description: caseData.problem_description,
            solution: caseData.solution,
            ai_instructions: caseData.ai_instructions,
            product_type: caseData.product_type,
            platform_type: caseData.platform_type,
          },
          isFirstMessage: false,
          customerProfile: customerProfile, // Include existing customer profile
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      if (data.success && data.message) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "Sorry, there was an error. Please try again.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndChat = async () => {
    // Check if there are enough messages for meaningful evaluation
    const userMessages = messages.filter((msg) => msg.role === "user");
    if (messages.length === 0 || userMessages.length < 2) {
      setShowInsufficientChatDialog(true);
      return;
    }

    setIsChatEnded(true);
    setIsAnalyzing(true);

    // Stop timer immediately when evaluation starts
    const endTime = Date.now();
    const durationMs = chatStartTime ? endTime - chatStartTime : 0;
    setChatDurationMs(durationMs);

    try {
      const response = await fetch("/api/ai/Gemini/chat-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatHistory: messages,
          caseData: {
            id: caseData.id,
            title: caseData.title,
            problem_description: caseData.problem_description,
            solution: caseData.solution,
            ai_instructions: caseData.ai_instructions,
            product_type: caseData.product_type,
            platform_type: caseData.platform_type,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze chat");
      }

      const evaluation = await response.json();
      setEvaluation(evaluation);

      // Save chat statistics after successful evaluation analysis
      if (durationMs > 0) {
        const conversationTimeSeconds = Math.floor(durationMs / 1000);
        const messageCount = messages.length;

        await Promise.all([
          // Update chat statistics
          IncreaseUpdateChatStatsAction(userId, {
            ai_score: evaluation.overallScore,
            message_count: messageCount,
            conversation_time_seconds: conversationTimeSeconds,
            product_type: caseData.product_type,
            platform_type: caseData.platform_type,
          }),

          // Update user session statistics
          IncreaseUpdateUserStatsChatAction(userId, conversationTimeSeconds),
        ]);
      }
    } catch (error) {
      console.error("Error analyzing chat:", error);
      alert("Fehler bei der Chat-Analyse. Bitte versuchen Sie es erneut.");
      setIsChatEnded(false);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadNewCase = async () => {
    setIsLoadingNewCase(true);
    try {
      const newCase = await loadRandomCaseByUserLevel(userLevel);
      setCaseData(newCase);
      // Reset all states
      resetChat();
    } catch (error) {
      console.error("Error loading new case:", error);
    } finally {
      setIsLoadingNewCase(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentMessage("");
    setIsChatStarted(false);
    setChatStartTime(null);
    setCurrentTime(0);
    setChatDurationMs(0);
    setIsChatEnded(false);
    setEvaluation(null);
    setCustomerProfile(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Timer and New Case Button */}
      <TimerWithNewCaseButton
        onLoadNewCase={loadNewCase}
        isLoadingNewCase={isLoadingNewCase}
        startTime={chatStartTime}
        currentTime={currentTime}
        caseDurationMs={chatDurationMs}
      />

      {/* Top: Case + Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SupportCaseInfo caseData={caseData} />
        <CustomerProfileCard profile={customerProfile} />
      </div>

      {/* Chat Interface */}
      <Card className="min-h-[400px] flex flex-col">
        <div className="flex items-center px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <div className="font-semibold">Customer Support Chat</div>
          </div>
          <div className="ml-auto">
            {isChatEnded && <Badge variant="outline">Chat Ended</Badge>}
            {!isChatStarted && !isChatEnded && (
              <Badge variant="secondary">Ready to Start</Badge>
            )}
          </div>
        </div>

        <CardContent className="flex-1 flex flex-col p-0">
          <ChatMessages
            messages={messages}
            isLoading={isLoading}
            customerProfile={customerProfile}
            isChatStarted={isChatStarted}
            onStartChat={startChat}
            messagesEndRef={messagesEndRef}
          />
          {isChatStarted && !isChatEnded && (
            <ChatInput
              currentMessage={currentMessage}
              setCurrentMessage={setCurrentMessage}
              onSend={sendMessage}
              onEndChat={handleEndChat}
              isLoading={isLoading}
            />
          )}
        </CardContent>
      </Card>

      {/* Feedback Analysis & Results - Fixed Position (external component) */}
      <FeedbackModal
        open={Boolean(isAnalyzing || evaluation)}
        isAnalyzing={isAnalyzing}
        feedback={evaluation}
        caseData={caseData}
        isLoadingNewCase={isLoadingNewCase}
        onStartNewCase={loadNewCase}
        onRetry={resetChat}
        onClose={() => setEvaluation(null)}
      />

      {/* Insufficient Chat Dialog */}
      <InsufficientChatDialog
        open={showInsufficientChatDialog}
        onOpenChange={setShowInsufficientChatDialog}
        onLoadNewCase={loadNewCase}
        isLoadingNewCase={isLoadingNewCase}
      />
    </div>
  );
};

export default ChatClient;
