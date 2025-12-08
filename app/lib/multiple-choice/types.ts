import { Database } from "@/lib/supabase/database.types";


export type McQuestion = Database["public"]["Tables"]["mc_questions"]["Row"];
export type McQuestionInsert =
  Database["public"]["Tables"]["mc_questions"]["Insert"];
export type McQuestionUpdate =
  Database["public"]["Tables"]["mc_questions"]["Update"];

export type ShuffledOption = {
  text: string;
  isCorrect: boolean;
};

export type McQuestionWithShuffledOptions = McQuestion & {
  shuffledOptions: ShuffledOption[];
};
