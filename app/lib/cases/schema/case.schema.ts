import { z } from "zod";
import { PRODUCT_TYPES, PLATFORM_TYPES, DIFFICULTY_TYPES } from "../../types";

export const CreateCaseSchema = z.object({
  title: z.string().min(2).max(50),
  problem_description: z.string().min(10).max(500),
  solution: z.string().min(10).max(500),
  ai_instructions: z.string().max(1000).optional(),
  product_type: z.enum(PRODUCT_TYPES),
  platform_type: z.enum(PLATFORM_TYPES),
  tags: z.array(z.string()).optional(),
  difficulty: z.enum(DIFFICULTY_TYPES),
});

export const UpdateCaseSchema = CreateCaseSchema.partial().extend({
  id: z.uuid(),
});

export const DeleteCaseSchema = z.object({
  id: z.uuid(),
});
