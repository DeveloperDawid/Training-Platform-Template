/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import {
  getRandomCustomerProfile,
  generateCustomerName,
} from "@/app/lib/chat/customer-profiles";

import {
  ChatMessage,
  CustomerProfile,
} from "@/app/home/(user)/training/chat/_components/types";

const ai = new GoogleGenAI({});

interface ChatRequest {
  message: string;
  chatHistory: ChatMessage[];
  caseData: {
    id: string;
    title: string;
    problem_description: string;
    solution: string;
    ai_instructions?: string;
    product_type: string;
    platform_type: string;
  };
  isFirstMessage?: boolean;
  customerProfile?: CustomerProfile;
}

// Retry configuration
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateContentWithRetry(
  ai: GoogleGenAI,
  params: any,
  retries = MAX_RETRIES
): Promise<any> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent(params);
      return response;
    } catch (error: any) {
      const isLastAttempt = attempt === retries;
      const isOverloaded =
        error?.status === 503 ||
        error?.message?.includes("overloaded") ||
        error?.message?.includes("UNAVAILABLE");

      if (!isOverloaded || isLastAttempt) {
        throw error;
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt);
      console.log(
        `Gemini API overloaded. Retrying in ${delay}ms... (Attempt ${
          attempt + 1
        }/${retries})`
      );
      await sleep(delay);
    }
  }
  throw new Error("Max retries exceeded");
}

export async function POST(request: NextRequest) {
  try {
    const {
      message,
      chatHistory,
      caseData,
      isFirstMessage,
      customerProfile,
    }: ChatRequest = await request.json();

    if (!caseData) {
      return NextResponse.json(
        { error: "Case data is required" },
        { status: 400 }
      );
    }

    // Generate or use existing customer profile
    let profile: CustomerProfile;
    if (customerProfile) {
      profile = customerProfile;
    } else {
      const { personality, company } = getRandomCustomerProfile();
      profile = {
        name: generateCustomerName(),
        personality,
        company,
      };
    }

    // Build conversation context with personality and company
    let conversationContext = `You are playing the role of ${
      profile.name
    }, a customer from ${profile.company.name} (${profile.company.industry}).

COMPANY CONTEXT: ${profile.company.description}
COMPANY SIZE: ${profile.company.size} company
URGENCY LEVEL: ${profile.company.urgencyLevel}

YOUR PERSONALITY TYPE: ${profile.personality.name} - ${
      profile.personality.description
    }
PERSONALITY TRAITS: ${profile.personality.traits.join(", ")}
COMMUNICATION STYLE: ${profile.personality.communicationStyle}
FRUSTRATION LEVEL: ${profile.personality.frustrationLevel}
TECHNICAL KNOWLEDGE: ${profile.personality.technicalKnowledge}

YOUR CURRENT PROBLEM: ${caseData.problem_description}
AFFECTED SYSTEM: ${caseData.product_type} on ${caseData.platform_type}
${
  caseData.ai_instructions
    ? `\nADDITIONAL CONTEXT FOR AI:\n${caseData.ai_instructions}\n`
    : ""
}
ROLE-PLAYING INSTRUCTIONS:
- Embody the personality type described above
- Use the communication style that matches your personality
- Show appropriate frustration level and technical knowledge
- Consider your company's urgency level when expressing concerns
- Don't reveal the solution directly - let the support agent guide you
- Keep responses natural and conversational (2-4 sentences)
- Respond in English
- Stay in character throughout the conversation
- IMPORTANT: Sometimes provide version numbers, log details, or technical specifics upfront, but not always. Let the support agent ask for these details occasionally - this varies the training experience and simulates real customer behavior.
- IMPORTANT: If the support agent provides the correct solution (matches the solution in YOUR CURRENT PROBLEM), accept it immediately. Thank them, confirm the problem is solved, and indicate the chat can be ended. Don't ask follow-up questions or for more details once the correct solution is given.
`;

    // Add previous chat history
    if (chatHistory && chatHistory.length > 0) {
      conversationContext += "Previous conversation:\n";
      chatHistory.forEach((msg) => {
        const role = msg.role === "user" ? "Support Agent" : "Customer (You)";
        conversationContext += `${role}: ${msg.content}\n`;
      });
      conversationContext += "\n";
    }

    let fullPrompt;
    if (isFirstMessage) {
      fullPrompt = `${conversationContext}

This is the start of the conversation. As ${profile.name} from ${profile.company.name}, introduce yourself and explain that you're having an issue. Match your personality type and communication style. Mention your company context briefly if it's relevant to the urgency.

Example introduction patterns:
- If angry: Be direct and emphasize urgency
- If confused: Be hesitant and ask for help
- If technical: Be specific and professional
- If friendly: Be polite and collaborative
- If skeptical: Express concern and ask questions`;
    } else {
      fullPrompt = `${conversationContext}

Support Agent just said: "${message}"

Respond as ${profile.name} with your specific personality and communication style. Consider your technical knowledge level when understanding the agent's response.`;
    }

    const response = await generateContentWithRetry(ai, {
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: `You are ${profile.name} from ${
          profile.company.name
        }. Embody the ${
          profile.personality.type
        } personality type. Use appropriate ${profile.personality.communicationStyle.toLowerCase()}. Match your technical knowledge level (${
          profile.personality.technicalKnowledge
        }) and frustration level (${
          profile.personality.frustrationLevel
        }). Keep responses natural and in character. Respond in the user's preferred language (default: English).
        
CRITICAL: If the support agent's message contains the correct solution (${
          caseData.solution
        }), immediately accept it. Thank them genuinely, confirm the problem is resolved, and indicate the conversation can end. DO NOT ask for additional details or clarifications once the correct solution is provided.`,
        maxOutputTokens: 3000,
        //temperature: 0.9,
      },
    });

    console.log("Gemini API Response:", JSON.stringify(response, null, 2));

    // Check if response is valid
    if (!response || !response.candidates || response.candidates.length === 0) {
      console.error("Invalid Gemini response:", response);
      throw new Error("No candidates in Gemini response");
    }

    const candidate = response.candidates[0];

    // Check for content filtering or blocked responses
    if (
      candidate.finishReason === "SAFETY" ||
      candidate.finishReason === "RECITATION"
    ) {
      console.error("Response blocked due to:", candidate.finishReason);
      throw new Error(`Response blocked: ${candidate.finishReason}`);
    }

    const aiResponse =
      candidate.content?.parts?.[0]?.text ||
      "Entschuldigung, ich konnte keine Antwort generieren.";

    const responseMessage: ChatMessage = {
      role: "assistant",
      content: aiResponse,
      timestamp: Date.now(),
    };

    return NextResponse.json({
      message: responseMessage,
      customerProfile: profile, // Include profile for consistency in subsequent messages
      success: true,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );

    // Check if it's a 503 overload error
    const isOverloaded =
      error?.status === 503 ||
      error?.message?.includes("overloaded") ||
      error?.message?.includes("UNAVAILABLE");

    if (isOverloaded) {
      return NextResponse.json(
        {
          error: "The AI service is currently overloaded",
          details:
            "The Gemini API is experiencing high traffic. Please try again in a few moments.",
          retryable: true,
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to process chat message",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        retryable: false,
      },
      { status: 500 }
    );
  }
}
