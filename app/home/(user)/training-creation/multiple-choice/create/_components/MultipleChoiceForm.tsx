"use client";
import React, { startTransition } from "react";

import { z } from "zod";

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

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
import { McQuestion } from "@/app/lib/multiple-choice/types";
import {
  CreateMcQuestionSchema,
  UpdateMcQuestionSchema,
} from "@/app/lib/multiple-choice/schema/mc_question.schema";
import {
  createMcQuestionAction,
  updateMcQuestionAction,
} from "@/app/lib/multiple-choice/server/server-actions";

const formSchema = z.object({
  question_text: z
    .string()
    .min(5, "Question text must be at least 5 characters")
    .max(500, "Question text must be less than 500 characters"),
  option_1: z
    .string()
    .min(1, "Option 1 must be at least 1 character")
    .max(200, "Option 1 must be less than 200 characters"),
  option_2: z
    .string()
    .min(1, "Option 2 must be at least 1 character")
    .max(200, "Option 2 must be less than 200 characters"),
  option_3: z
    .string()
    .min(1, "Option 3 must be at least 1 character")
    .max(200, "Option 3 must be less than 200 characters"),
  option_4: z
    .string()
    .min(1, "Option 4 must be at least 1 character")
    .max(200, "Option 4 must be less than 200 characters"),
  correct_option: z
    .number()
    .min(1, "Correct option must be 1, 2, 3, or 4")
    .max(4, "Correct option must be 1, 2, 3, or 4"),
  product_type: z.enum(PRODUCT_TYPES),
  platform_type: z.enum(PLATFORM_TYPES),
  difficulty: z.enum(DIFFICULTY_TYPES),
});

type FormValues = z.infer<typeof formSchema>;

interface MultipleChoiceFormProps {
  isEditing?: boolean;
  mcQuestionData?: McQuestion;
}

const MultipleChoiceForm = ({
  isEditing,
  mcQuestionData,
}: MultipleChoiceFormProps) => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question_text: mcQuestionData?.question_text ?? "",
      option_1: mcQuestionData?.option_1 ?? "",
      option_2: mcQuestionData?.option_2 ?? "",
      option_3: mcQuestionData?.option_3 ?? "",
      option_4: mcQuestionData?.option_4 ?? "",
      correct_option: 1, // Default to 1 if creating new question
      product_type: mcQuestionData?.product_type ?? PRODUCTS.PRODUCT_A.id,
      platform_type: mcQuestionData?.platform_type ?? PLATFORMS.PLATFORM_A.id,
      difficulty: mcQuestionData?.difficulty ?? DIFFICULTY_LEVELS.EASY.id,
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (isEditing) {
      startTransition(async () => {
        try {
          const newMcQuestionData = UpdateMcQuestionSchema.parse({
            id: mcQuestionData!.id,
            question_text: values.question_text,
            option_1: values.option_1,
            option_2: values.option_2,
            option_3: values.option_3,
            option_4: values.option_4,
            correct_option: values.correct_option,
            product_type: values.product_type,
            platform_type: values.platform_type,
            difficulty: values.difficulty,
          });
          const result = await updateMcQuestionAction(
            mcQuestionData!.id,
            newMcQuestionData
          );

          if (result.success) {
            console.log(
              "Multiple choice question updated successfully:",
              result.mcQuestion
            );
            toast.success("Multiple choice question updated successfully.");
            // Redirect to list after short delay
            setTimeout(() => {
              router.push("/home/training-creation/multiple-choice/list");
            }, 1500);
          }
        } catch (error) {
          console.error("Error updating multiple choice question:", error);
          toast.error("Error updating multiple choice question.");
        }
      });
      return;
    }

    startTransition(async () => {
      try {
        const mcQuestionData = CreateMcQuestionSchema.parse({
          question_text: values.question_text,
          option_1: values.option_1,
          option_2: values.option_2,
          option_3: values.option_3,
          option_4: values.option_4,
          correct_option: values.correct_option,
          product_type: values.product_type,
          platform_type: values.platform_type,
          difficulty: values.difficulty,
        });
        const result = await createMcQuestionAction(mcQuestionData);

        if (result.success) {
          console.log("Multiple choice question created successfully:", result);
          toast.success("Multiple choice question created successfully.");
          // Redirect to list after short delay
          setTimeout(() => {
            router.push("/home/training-creation/multiple-choice/list");
          }, 1500);
        }
      } catch (error) {
        console.error("Error creating multiple choice question:", error);
        toast.error("Error creating multiple choice question.");
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
              name="question_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter question text..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="option_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option 1: This is the correct Answer!</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter option 1 text = the correct answer..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="option_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter option 2 text..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="option_3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option 3</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter option 3 text..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="option_4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option 4</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter option 4 text..." {...field} />
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
                Update MC Question
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

export default MultipleChoiceForm;
