import { z } from "zod";
import { PRODUCT_TYPES, PLATFORM_TYPES, DIFFICULTY_TYPES } from "@/app/lib/types";

export const CreateMcQuestionSchema = z.object({
  question_text: z.string().min(5).max(500),
  option_1: z.string().min(1).max(200),
  option_2: z.string().min(1).max(200),
  option_3: z.string().min(1).max(200),
  option_4: z.string().min(1).max(200),
  product_type: z.enum(PRODUCT_TYPES),
  platform_type: z.enum(PLATFORM_TYPES),
  tags: z.array(z.string()).optional(),
  correct_option: z.number().int().min(1).max(4).default(1),
  difficulty: z.enum(DIFFICULTY_TYPES),
});

export const UpdateMcQuestionSchema = CreateMcQuestionSchema.partial().extend({
  id: z.uuid(),
});

export const DeleteMcQuestionSchema = z.object({
  id: z.uuid(),
});
