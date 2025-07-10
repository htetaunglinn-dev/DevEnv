"use client";

import React from "react";
import { MessageCircle, Eye, Share2 } from "lucide-react";
import LikeButton from "./LikeButton";

interface PostEngagementProps {
  postId: string;
  likes: string[];
  views: number;
  commentsCount: number;
  onLikeUpdate?: (newLikesCount: number, isLiked: boolean) => void;
  size?: "sm" | "md" | "lg";
  layout?: "horizontal" | "vertical";
  showShare?: boolean;
}

const PostEngagement = ({
  postId,
  likes = [],
  views = 0,
  commentsCount = 0,
  onLikeUpdate,
  size = "sm",
  layout = "horizontal",
  showShare = false,
}: PostEngagementProps) => {
  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const containerClass =
    layout === "horizontal"
      ? "flex items-center space-x-4"
      : "flex flex-col space-y-2";

  return (
    <div className={containerClass}>
      {/* Like Button */}
      <LikeButton
        postId={postId}
        initialLikes={Array.isArray(likes) ? likes : []}
        onLikeUpdate={onLikeUpdate}
        size={size}
        showCount={true}
        variant="ghost"
      />

      {/* Comments */}
      <div
        className={`flex items-center space-x-1 text-gray-500 dark:text-gray-400 ${textSizes[size]}`}
      >
        <MessageCircle className={iconSizes[size]} />
        <span>{commentsCount}</span>
      </div>

      {/* Views */}
      <div
        className={`flex items-center space-x-1 text-gray-500 dark:text-gray-400 ${textSizes[size]}`}
      >
        <Eye className={iconSizes[size]} />
        <span>{views}</span>
      </div>

      {/* Share (optional) */}
      {showShare && (
        <button
          className={`flex items-center space-x-1 text-gray-500 hover:text-blue-500 dark:text-gray-400 ${textSizes[size]} transition-colors`}
        >
          <Share2 className={iconSizes[size]} />
          <span>Share</span>
        </button>
      )}
    </div>
  );
};

export default PostEngagement;
