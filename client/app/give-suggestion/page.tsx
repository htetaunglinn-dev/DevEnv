"use client";

import React, { useState } from "react";
import Image from "next/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import whiteImg from "@/assets/suggestion/white1.jpg";
import darkImg from "@/assets/suggestion/dark1.jpg";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { suggestionApi, CreateSuggestionData } from "@/lib/suggestions-api";

const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(200, {
      message: "Title must not exceed 200 characters.",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(2000, {
      message: "Description must not exceed 2000 characters.",
    }),
  category: z.enum(["feature", "improvement", "bug", "other"], {
    required_error: "Please select a category.",
  }),
  priority: z.enum(["low", "medium", "high", "critical"], {
    required_error: "Please select a priority.",
  }),
  tags: z.string().optional(),
});

const SuggestionPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: undefined,
      priority: undefined,
      tags: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const suggestionData: CreateSuggestionData = {
        title: values.title,
        description: values.description,
        category: values.category,
        priority: values.priority,
        tags: values.tags
          ? values.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag.length > 0)
          : undefined,
      };

      await suggestionApi.create(suggestionData);

      toast.success("Suggestion submitted successfully!");
      form.reset();
    } catch (error: any) {
      console.error("Error submitting suggestion:", error);
      toast.error(
        error.message || "Failed to submit suggestion. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      <ScrollArea className="w-full">
        <div className="flex h-[calc(100vh-52px)] items-center justify-center">
          <Card className=" flex w-fit shadow-md lg:min-w-[50vw] ">
            <div className="relative hidden h-[500px] w-full basis-6/12 lg:block">
              <Image
                className="hidden rounded-xl object-cover object-right shadow-md dark:block"
                src={darkImg}
                fill
                alt="suggestion"
              />
              <Image
                className="rounded-xl object-cover object-right shadow-md dark:hidden"
                src={whiteImg}
                fill
                alt="suggestion"
              />
            </div>
            <div className="flex items-center justify-center p-10 lg:basis-6/12">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter suggestion title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            className="resize-none"
                            rows={4}
                            placeholder="Describe your suggestion in detail"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="feature">Feature Request</SelectItem>
                              <SelectItem value="improvement">Improvement</SelectItem>
                              <SelectItem value="bug">Bug Report</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter tags separated by commas (e.g., ui, mobile)" {...field} />
                        </FormControl>
                        <FormDescription>
                          Optional: Add relevant tags to help categorize your suggestion
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="!mt-6 inline-block" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit Suggestion'}
                  </Button>
                </form>
              </Form>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default SuggestionPage;
