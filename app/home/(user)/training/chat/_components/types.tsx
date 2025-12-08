export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface CustomerPersonality {
  type: string;
  name: string;
  description: string;
  traits: string[];
  communicationStyle: string;
  frustrationLevel: "low" | "medium" | "high";
  technicalKnowledge: "basic" | "intermediate" | "advanced";
}

export interface Company {
  name: string;
  industry: string;
  size: "small" | "medium" | "large";
  description: string;
  urgencyLevel: "low" | "medium" | "high";
}

export interface CustomerProfile {
  name: string;
  personality: CustomerPersonality;
  company: Company;
}

export interface ChatFeedbackResult {
  problemSolved: boolean;
  friendlinessScore: number;
  professionalismScore: number;
  helpfulnessScore: number;
  overallScore: number;
  feedback: string;
  improvements: string[];
  positiveAspects: string[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface Feedback {
  problemSolved: boolean;
  friendlinessScore: number;
  professionalismScore: number;
  helpfulnessScore: number;
  overallScore: number;
  feedback: string;
  improvements: string[];
  positiveAspects: string[];
}
