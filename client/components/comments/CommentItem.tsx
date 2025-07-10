"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import {
  Comment,
  updateComment,
  deleteComment,
  toggleCommentLike,
} from "@/lib/commentApi";
import { toast } from "sonner";
import CommentForm from "./CommentForm";
import { useAuth } from "@/contexts/AuthContext";
import { generateAvatarUrl } from "@/utils/avatarUtils";

interface CommentItemProps {
  comment: Comment;
  onUpdate?: () => void;
  onReply?: () => void;
}

const CommentItem = ({ comment, onUpdate, onReply }: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likesCount || 0);
  const { user } = useAuth();

  // Check if current user has liked this comment and update like count
  useEffect(() => {
    if (user?._id && Array.isArray(comment.likes)) {
      setIsLiked(comment.likes.includes(user._id));
    } else {
      setIsLiked(false);
    }

    // Update likes count from comment prop
    setLikesCount(
      comment.likesCount ||
        (Array.isArray(comment.likes) ? comment.likes.length : 0),
    );
  }, [user?._id, comment.likes, comment.likesCount]);

  const isAuthor = user?._id === comment.author._id;
  const canEdit = isAuthor && !isEditing;
  const canDelete = isAuthor;

  const handleEdit = async () => {
    if (!editContent.trim()) return;

    setIsSubmitting(true);

    try {
      await updateComment(comment._id, { content: editContent.trim() });
      setIsEditing(false);
      toast.success("Comment updated successfully!");
      onUpdate?.();
    } catch (error: any) {
      toast.error(error.message || "Failed to update comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      await deleteComment(comment._id);
      toast.success("Comment deleted successfully!");
      onUpdate?.();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete comment");
    }
  };

  const handleLike = async () => {
    try {
      const response = await toggleCommentLike(comment._id);
      setIsLiked(response.data.isLiked);
      setLikesCount(response.data.likesCount);
    } catch (error: any) {
      toast.error(error.message || "Failed to toggle like");
    }
  };

  const handleReply = () => {
    setShowReplyForm(true);
  };

  const handleReplySubmit = () => {
    setShowReplyForm(false);
    onReply?.();
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={generateAvatarUrl(
                comment.author.firstName,
                comment.author.lastName,
              )}
            />
            <AvatarFallback>
              {comment.author.firstName[0]}
              {comment.author.lastName[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-medium">
                  {comment.author.firstName} {comment.author.lastName}
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
                {comment.isEdited && (
                  <span className="text-xs italic text-gray-400">(edited)</span>
                )}
              </div>

              {(canEdit || canDelete) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {canEdit && (
                      <DropdownMenuItem onClick={() => setIsEditing(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    )}
                    {canDelete && (
                      <DropdownMenuItem
                        onClick={handleDelete}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <div className="mt-2">
              {isEditing ? (
                <div className="space-y-2">
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="min-h-[80px] resize-none"
                    maxLength={1000}
                  />
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {editContent.length}/1000 characters
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsEditing(false);
                          setEditContent(comment.content);
                        }}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleEdit}
                        disabled={!editContent.trim() || isSubmitting}
                      >
                        {isSubmitting ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                  {comment.content}
                </p>
              )}
            </div>

            {!isEditing && (
              <div className="mt-3 flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
                >
                  <Heart
                    className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                  />
                  <span className="text-xs">{likesCount}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReply}
                  className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs">Reply</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        {showReplyForm && (
          <div className="ml-14 mt-4">
            <CommentForm
              postId={comment.post}
              parentId={comment._id}
              onCommentSubmit={handleReplySubmit}
              onCancel={() => setShowReplyForm(false)}
              placeholder="Write a reply..."
            />
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-14 mt-4 space-y-4">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply._id}
                comment={reply}
                onUpdate={onUpdate}
                onReply={onReply}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommentItem;
