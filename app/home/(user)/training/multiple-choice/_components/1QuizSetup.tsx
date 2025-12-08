"use client";
import React from "react";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PRODUCT_TYPES, PLATFORM_TYPES } from "@/app/lib/types";
import { ProductType, PlatformType } from "@/app/lib/types";
import { PRODUCTS, PLATFORMS } from "@/lib/config/app-config";

interface QuizConfig {
  questions_amount: number;
  product_type: ProductType;
  platform_type: PlatformType;
}

interface QuizSetupProps {
  onStartQuiz: (config: QuizConfig) => void;
}

const formSchema = z.object({
  questions_amount: z.number().min(1),
  product_type: z.enum(PRODUCT_TYPES),
  platform_type: z.enum(PLATFORM_TYPES),
});
type FormValues = z.infer<typeof formSchema>;

const QuizSetup: React.FC<QuizSetupProps> = ({ onStartQuiz }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questions_amount: 10,
      product_type: PRODUCTS.PRODUCT_A.id,
      platform_type: PLATFORMS.PLATFORM_A.id,
    },
  });

  const onSubmit = async (values: FormValues) => {
    onStartQuiz(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="questions_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Questions</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {[1, 10, 20, 30, 40, 50].map((amount) => {
                        const isSelected = field.value === amount;
                        return (
                          <Button
                            key={amount}
                            type="button"
                            variant={isSelected ? "default" : "outline"}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => field.onChange(amount)}
                          >
                            {amount}
                          </Button>
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
              name="product_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Type</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {PRODUCT_TYPES.map((type) => {
                        const isSelected = field.value === type;
                        return (
                          <Button
                            key={type}
                            type="button"
                            variant={isSelected ? "default" : "outline"}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => field.onChange(type)}
                          >
                            {type}
                          </Button>
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
                          <Button
                            key={type}
                            type="button"
                            variant={isSelected ? "default" : "outline"}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => field.onChange(type)}
                          >
                            {type}
                          </Button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={!form.formState.isValid}
            >
              Start Quiz
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default QuizSetup;
