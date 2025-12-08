import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({});

interface EvaluationRequest {
  caseId: string;
  userSolution: string;
  correctSolution: string;
  caseDescription: string;
  aiInstructions?: string;
  productType: string;
  includeThoughts?: boolean; // Optional: whether to include AI thinking process
}

interface EvaluationResult {
  score: number;
  feedback: string;
  improvements: string[];
  thoughts?: string; // Optional: AI's thinking process
}

export async function POST(request: NextRequest) {
  try {
    const body: EvaluationRequest = await request.json();
    const {
      userSolution,
      correctSolution,
      caseDescription,
      aiInstructions,
      productType,
      includeThoughts = false,
    } = body;

    const prompt = `
Evaluate this ${productType} support case solution.

PROBLEM:
${caseDescription}

CORRECT SOLUTION:
${correctSolution}
${aiInstructions ? `\nADDITIONAL CONTEXT:\n${aiInstructions}\n` : ""}
USER SOLUTION:
${userSolution}

Evaluate the user's solution compared to the correct solution on a scale of 1-10 and provide structured feedback.

Evaluation Criteria:
- Technical Correctness (40%)
- Solution Completeness (30%)
- Clarity of Explanation (20%)
- Consideration of Best Practices (10%)

Respond exclusively with a JSON object in the following format:
{
  "score": number (1-10),
  "feedback": "Detailed feedback on the user's solution (in English, 2-3 sentences)",
  "improvements": ["Improvement suggestion 1", "Improvement suggestion 2", "Improvement suggestion 3"]
}

Be constructive and helpful. If the solution is good, acknowledge that. If it has shortcomings, explain specifically what can be improved.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // gemini-2.5-pro
      contents: prompt,
      config: {
        systemInstruction:
          "You are a helpful expert who evaluates solution approaches and provides constructive feedback. Analyze the solution objectively based on technical accuracy and completeness.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.NUMBER,
              description: "Rating from 1-10",
            },
            feedback: {
              type: Type.STRING,
              description: "Detailed feedback on the solution",
            },
            improvements: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
              description: "List of improvement suggestions",
            },
          },
          required: ["score", "feedback", "improvements"],
          propertyOrdering: ["score", "feedback", "improvements"],
        },
        thinkingConfig: includeThoughts
          ? {
              includeThoughts: true,
            }
          : {
              includeThoughts: false,
            },

        //temperature: 0.7,
        maxOutputTokens: 5000,
      },
    });

    // Log thinking process if available
    let thoughts = "";
    let answer = "";

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (!part.text) {
          continue;
        }
        if (part.thought === true) {
          if (!thoughts) {
            console.log("Thoughts summary:");
          }
          console.log(part.text);
          thoughts = thoughts + part.text;
        } else {
          if (!answer) {
            console.log("Answer:");
          }
          console.log(part.text);
          answer = answer + part.text;
        }
      }
    }

    if (!answer) {
      console.error(
        "No answer found in response. Full response:",
        JSON.stringify(response, null, 2)
      );
      throw new Error("No response from Gemini");
    }

    const responseText = answer;

    let evaluation: EvaluationResult;
    try {
      evaluation = JSON.parse(responseText);

      // Validate the response structure
      if (
        typeof evaluation.score !== "number" ||
        typeof evaluation.feedback !== "string" ||
        !Array.isArray(evaluation.improvements)
      ) {
        throw new Error("Invalid response structure");
      }

      // Ensure score is within valid range
      evaluation.score = Math.max(1, Math.min(10, evaluation.score));

      // Add thinking process only if requested and available
      if (includeThoughts && thoughts) {
        evaluation.thoughts = thoughts;
      }
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      console.error("Raw response:", responseText);

      // Fallback evaluation
      evaluation = {
        score: 5,
        feedback:
          "The solution was analyzed, but there was a problem with the detailed evaluation. Please try again.",
        improvements: ["Please try again later"],
      };
    }

    return NextResponse.json(evaluation);
  } catch (error) {
    console.error("Error evaluating solution:", error);
    return NextResponse.json(
      {
        error: "Failed to evaluate solution",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
