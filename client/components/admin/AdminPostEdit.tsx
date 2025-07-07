"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Post } from "@/lib/postApi";
import { useUpdatePost } from "@/hooks/usePosts";

const editPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  content: z.string().min(1, "Content is required"),
  category: z.enum([
    "general",
    "news",
    "tutorial",
    "lifestyle",
    "technology",
    "other",
  ]),
  tags: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]),
  imageUrl: z.string().optional(),
});

type EditPostFormData = z.infer<typeof editPostSchema>;

interface AdminPostEditProps {
  post: Post;
  onSave?: () => void;
  onCancel?: () => void;
}

export default function AdminPostEdit({
  post,
  onSave,
  onCancel,
}: AdminPostEditProps) {
  const router = useRouter();
  const updatePostMutation = useUpdatePost();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditPostFormData>({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
      category: post.category as any,
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : post.tags || "",
      status: post.status as any,
      imageUrl: post.imageUrl || "",
    },
  });

  // Reset form when post changes
  useEffect(() => {
    reset({
      title: post.title,
      content: post.content,
      category: post.category as any,
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : post.tags || "",
      status: post.status as any,
      imageUrl: post.imageUrl || "",
    });
  }, [post, reset]);

  const watchedCategory = watch("category");
  const watchedStatus = watch("status");

  const onSubmit = useCallback(
    async (data: EditPostFormData) => {
      if (isSubmitting) return; // Prevent multiple submissions

      setIsSubmitting(true);
      try {
        await updatePostMutation.mutateAsync({
          id: post._id,
          postData: data,
        });

        toast.success("Post updated successfully");
        onSave?.();
      } catch (error: any) {
        toast.error(error.message || "Failed to update post");
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, updatePostMutation, post._id, onSave],
  );

  const categories = [
    { value: "general", label: "General" },
    { value: "news", label: "News" },
    { value: "tutorial", label: "Tutorial" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "technology", label: "Technology" },
    { value: "other", label: "Other" },
  ];

  const statuses = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived" },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="space-y-4 mb-6">
        <h2 className="text-lg font-semibold leading-none tracking-tight">Edit Post (Admin)</h2>
        <p className="text-sm text-muted-foreground">Edit any post as an administrator</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter post title"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                {...register("imageUrl")}
                placeholder="Enter image URL (optional)"
                className={errors.imageUrl ? "border-red-500" : ""}
              />
              {errors.imageUrl && (
                <p className="text-sm text-red-500">
                  {errors.imageUrl.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              {...register("content")}
              placeholder="Enter post content"
              rows={10}
              className={errors.content ? "border-red-500" : ""}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={watchedCategory}
                onValueChange={(value) => setValue("category", value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={watchedStatus}
                onValueChange={(value) => setValue("status", value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-sm text-red-500">{errors.status.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                {...register("tags")}
                placeholder="Enter tags separated by commas"
                className={errors.tags ? "border-red-500" : ""}
              />
              {errors.tags && (
                <p className="text-sm text-red-500">{errors.tags.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || updatePostMutation.isPending}
            >
              {isSubmitting || updatePostMutation.isPending
                ? "Updating..."
                : "Update Post"}
            </Button>
          </div>
        </form>
    </div>
  );
}
