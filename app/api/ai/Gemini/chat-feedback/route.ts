import {
  ChatFeedbackResult,
  ChatMessage,
} from "@/app/home/(user)/training/chat/_components/types";
import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({});

interface ChatFeedbackRequest {
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
}

export async function POST(request: NextRequest) {
  try {
    const { chatHistory, caseData }: ChatFeedbackRequest = await request.json();

    if (!chatHistory || chatHistory.length === 0) {
      return NextResponse.json(
        { error: "Chat history is required" },
        { status: 400 }
      );
    }

    if (!caseData) {
      return NextResponse.json(
        { error: "Case data is required" },
        { status: 400 }
      );
    }

    // Check conversation length and quality
    const supportAgentMessages = chatHistory.filter(
      (msg) => msg.role === "user"
    );
    const totalMessages = chatHistory.length;

    // Build conversation for analysis
    let conversationText = `ORIGINAL PROBLEM: ${caseData.problem_description}
PRODUCT: ${caseData.product_type} on ${caseData.platform_type}
CORRECT SOLUTION: ${caseData.solution}
${
  caseData.ai_instructions
    ? `\nADDITIONAL CONTEXT:\n${caseData.ai_instructions}\n`
    : ""
}
CONVERSATION METRICS:
- Total messages: ${totalMessages}
- Support agent responses: ${supportAgentMessages.length}
- Customer messages: ${chatHistory.length - supportAgentMessages.length}

IMPORTANT EVALUATION NOTES:
- If the support agent sent fewer than 3 messages, this indicates insufficient engagement (score should be very low 1-3)
- If the conversation was extremely short (less than 4 total messages), the agent likely didn't properly address the issue
- An effective support conversation should have multiple back-and-forth exchanges

CHAT CONVERSATION TO EVALUATE:
`;

    chatHistory.forEach((msg, index) => {
      const role = msg.role === "user" ? "Support Agent" : "Customer";
      conversationText += `${index + 1}. ${role}: ${msg.content}\n`;
    });

    const prompt = `
Evaluate the following customer support conversation based on these criteria:

${conversationText}

EVALUATION CRITERIA (each 1-10 points):
1. Problem Resolution: Did the support agent solve or make progress toward solving the customer's problem?
2. Communication Skills: Was the agent clear, professional, and easy to understand?
3. Customer Service: Was the agent friendly, patient, and customer-focused?
4. Technical Competence: Did the agent demonstrate good technical knowledge and troubleshooting skills?
5. Engagement Level: Did the agent engage sufficiently with the customer to understand and address the issue?

SCORING GUIDELINES:
- If support agent sent fewer than 3 messages: Maximum score should be 3/10 for all categories
- If conversation has fewer than 4 total messages: This indicates premature termination, scores should be 1-2/10
- If agent didn't ask clarifying questions or provide solutions: Low scores (1-4/10)
- Only give high scores (7-10) if there was substantial engagement and problem-solving effort

ADDITIONAL EVALUATION:
- Was the problem solved? (true/false)
- Overall score (1-10) - Should reflect actual engagement level
- Detailed feedback (2-3 sentences in English)
- Positive aspects (2-3 points)
- Improvement suggestions (2-3 points)

Respond ONLY with a JSON object in this exact format:
{
  "problemSolved": boolean,
  "friendlinessScore": number (1-10),
  "professionalismScore": number (1-10),
  "helpfulnessScore": number (1-10),
  "overallScore": number (1-10),
  "feedback": "Detailed feedback on overall performance",
  "improvements": ["Improvement suggestion 1", "Improvement suggestion 2", "Improvement suggestion 3"],
  "positiveAspects": ["Positive aspect 1", "Positive aspect 2", "Positive aspect 3"]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "You are an expert in conversation evaluation. Analyze conversations objectively and provide constructive feedback. Focus on agent performance, communication quality, and problem-solving effectiveness.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            problemSolved: {
              type: Type.BOOLEAN,
              description: "Wurde das Problem gelöst?",
            },
            friendlinessScore: {
              type: Type.NUMBER,
              description: "Freundlichkeit-Score von 1-10",
            },
            professionalismScore: {
              type: Type.NUMBER,
              description: "Professionalität-Score von 1-10",
            },
            helpfulnessScore: {
              type: Type.NUMBER,
              description: "Hilfsbereitschaft-Score von 1-10",
            },
            overallScore: {
              type: Type.NUMBER,
              description: "Gesamt-Score von 1-10",
            },
            feedback: {
              type: Type.STRING,
              description: "Detailliertes Feedback",
            },
            improvements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Liste von Verbesserungsvorschlägen",
            },
            positiveAspects: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Liste der positiven Aspekte",
            },
          },
          required: [
            "problemSolved",
            "friendlinessScore",
            "professionalismScore",
            "helpfulnessScore",
            "overallScore",
            "feedback",
            "improvements",
            "positiveAspects",
          ],
        },
        //temperature: 0.3,
        maxOutputTokens: 3000,
      },
    });

    const responseText = response.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) {
      throw new Error("No response from Gemini");
    }

    let evaluation: ChatFeedbackResult;
    try {
      evaluation = JSON.parse(responseText);

      // Validate and normalize scores
      evaluation.friendlinessScore = Math.max(
        1,
        Math.min(10, evaluation.friendlinessScore)
      );
      evaluation.professionalismScore = Math.max(
        1,
        Math.min(10, evaluation.professionalismScore)
      );
      evaluation.helpfulnessScore = Math.max(
        1,
        Math.min(10, evaluation.helpfulnessScore)
      );
      evaluation.overallScore = Math.max(
        1,
        Math.min(10, evaluation.overallScore)
      );
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      console.error("Raw response:", responseText);
      throw new Error("Failed to parse chat evaluation response");
    }

    return NextResponse.json(evaluation);
  } catch (error) {
    console.error("Chat feedback error:", error);
    return NextResponse.json(
      {
        error: "Failed to analyze chat",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
