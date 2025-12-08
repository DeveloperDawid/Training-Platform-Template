"use client";
import React, { startTransition } from "react";

import { z } from "zod";
import { Case } from "@/app/lib/cases/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  createCaseAction,
  updateCaseAction,
} from "@/app/lib/cases/server/server-actions";
import {
  CreateCaseSchema,
  UpdateCaseSchema,
} from "@/app/lib/cases/schema/case.schema";
import { toast } from "sonner";
import {
  PRODUCT_TYPES,
  PLATFORM_TYPES,
  DIFFICULTY_TYPES,
} from "@/app/lib/types";
import {
  PRODUCTS,
  PLATFORMS,
  DIFFICULTY_LEVELS,
} from "@/lib/config/app-config";

const formSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be less than 50 characters"),
  problem_description: z
    .string()
    .min(10, "Problem description must be at least 10 characters")
    .max(500, "Problem description must be less than 500 characters"),
  solution: z
    .string()
    .min(10, "Solution must be at least 10 characters")
    .max(500, "Solution must be less than 500 characters"),
  ai_instructions: z
    .string()
    .max(1000, "AI instructions must be less than 1000 characters")
    .optional(),
  product_type: z.enum(PRODUCT_TYPES),
  platform_type: z.enum(PLATFORM_TYPES),
  difficulty: z.enum(DIFFICULTY_TYPES),
  tags: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CasesWithAIFormProps {
  isEditing?: boolean;
  caseData?: Case;
}

export const CasesWithAIForm = ({
  isEditing = false,

  caseData,
}: CasesWithAIFormProps) => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: caseData?.title ?? "",
      problem_description: caseData?.problem_description ?? "",
      solution: caseData?.solution ?? "",
      ai_instructions: caseData?.ai_instructions ?? "",
      product_type: caseData?.product_type ?? PRODUCTS.PRODUCT_A.id,
      platform_type: caseData?.platform_type ?? PLATFORMS.PLATFORM_A.id,
      tags: Array.isArray(caseData?.tags)
        ? caseData.tags.join(", ")
        : caseData?.tags ?? "",
      difficulty: caseData?.difficulty ?? DIFFICULTY_LEVELS.EASY.id,
    },
  });

  const onSubmit = async (values: FormValues) => {
    // Convert tags string to array
    const tagsArray = values.tags
      ? values.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      : [];

    if (isEditing) {
      startTransition(async () => {
        try {
          const newCaseData = UpdateCaseSchema.parse({
            id: caseData!.id,
            title: values.title,
            problem_description: values.problem_description,
            solution: values.solution,
            ai_instructions: values.ai_instructions,
            product_type: values.product_type,
            platform_type: values.platform_type,
            tags: tagsArray,
            difficulty: values.difficulty,
          });
          const result = await updateCaseAction(caseData!.id, newCaseData);

          if (result.success) {
            console.log("Case updated successfully:", result.case);
            toast.success("Case updated successfully.");
            // Redirect to list after short delay
            setTimeout(() => {
              router.push("/home/training-creation/cases-with-ai/list");
            }, 1500);
          }
        } catch (error) {
          console.error("Error updating case:", error);
          toast.error("Error updating case.");
        }
      });
      return;
    }

    startTransition(async () => {
      try {
        const caseData = CreateCaseSchema.parse({
          title: values.title,
          problem_description: values.problem_description,
          solution: values.solution,
          ai_instructions: values.ai_instructions,
          product_type: values.product_type,
          platform_type: values.platform_type,
          tags: tagsArray,
          difficulty: values.difficulty,
        });
        const result = await createCaseAction(caseData);

        if (result.success) {
          console.log("Case created successfully:", result.case);
          toast.success("Case created successfully.");
          // Redirect to list after short delay
          setTimeout(() => {
            router.push("/home/training-creation/cases-with-ai/list");
          }, 1500);
        }
      } catch (error) {
        console.error("Error creating case:", error);
        toast.error("Error creating case.");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Support Case</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter case title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="problem_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the problem in detail..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="solution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solution</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the solution..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ai_instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI Instructions (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional context or instructions for the AI to better understand and evaluate this case (e.g., specific technical details, common pitfalls, evaluation criteria)..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Type</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {PRODUCT_TYPES.map((type) => {
                        const isSelected = field.value === type;
                        return (
                          <Badge
                            key={type}
                            variant={isSelected ? "default" : "outline"}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => {
                              field.onChange(type);
                            }}
                          >
                            {type}
                          </Badge>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="platform_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform Type</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {PLATFORM_TYPES.map((type) => {
                        const isSelected = field.value === type;
                        return (
                          <Badge
                            key={type}
                            variant={isSelected ? "default" : "outline"}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => {
                              field.onChange(type);
                            }}
                          >
                            {type}
                          </Badge>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter tags separated by commas (e.g., network, performance)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Type</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {DIFFICULTY_TYPES.map((type) => {
                        const isSelected = field.value === type;
                        return (
                          <Badge
                            key={type}
                            variant={isSelected ? "default" : "outline"}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => {
                              field.onChange(type);
                            }}
                          >
                            {type}
                          </Badge>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isEditing ? (
              <Button type="submit" className="w-full">
                Update Case
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Create Case
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CasesWithAIForm;
