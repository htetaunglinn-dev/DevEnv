"use client";

import { useState, useCallback } from "react";
import { toggleLike } from "@/lib/postApi";
import { toast } from "sonner";

interface UsePostLikesProps {
  postId: string;
  initialLikes: string[];
  onUpdate?: (newLikesCount: number, isLiked: boolean) => void;
}

export const usePostLikes = ({
  postId,
  initialLikes,
  onUpdate,
}: UsePostLikesProps) => {
  const [likes, setLikes] = useState<string[]>(initialLikes || []);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleLike = useCallback(
    async (userId?: string) => {
      if (isLoading) return;

      setIsLoading(true);

      try {
        const response = await toggleLike(postId);
        const newLikes = response.data.likes;
        const newIsLiked = userId ? newLikes.includes(userId) : false;

        setLikes(newLikes);
        onUpdate?.(newLikes.length, newIsLiked);

        toast.success(newIsLiked ? "Post liked!" : "Post unliked!");

        return { likes: newLikes, isLiked: newIsLiked };
      } catch (error: any) {
        toast.error(error.message || "Failed to toggle like");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [postId, isLoading, onUpdate],
  );

  return {
    likes,
    isLoading,
    toggleLike: handleToggleLike,
    likesCount: likes.length,
  };
};
