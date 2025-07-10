"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { createComment } from "@/lib/commentApi";
import { toast } from "sonner";

interface CommentFormProps {
  postId: string;
  parentId?: string;
  onCommentSubmit?: () => void;
  onCancel?: () => void;
  placeholder?: string;
}

const CommentForm = ({
  postId,
  parentId,
  onCommentSubmit,
  onCancel,
  placeholder = "Write a comment...",
}: CommentFormProps) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    setIsSubmitting(true);

    try {
      await createComment({
        content: content.trim(),
        postId,
        parentId,
      });

      setContent("");
      toast.success(
        parentId
          ? "Reply posted successfully!"
          : "Comment posted successfully!",
      );
      onCommentSubmit?.();
    } catch (error: any) {
      toast.error(error.message || "Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder={placeholder}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none"
            maxLength={1000}
          />

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {content.length}/1000 characters
            </div>

            <div className="flex gap-2">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              )}

              <Button
                type="submit"
                disabled={!content.trim() || isSubmitting}
                className="min-w-[80px]"
              >
                {isSubmitting ? "Posting..." : parentId ? "Reply" : "Comment"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommentForm;
