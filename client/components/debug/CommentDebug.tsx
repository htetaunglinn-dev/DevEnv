'use client';

import React from 'react';
import { Comment } from '@/lib/commentApi';
import { useAuth } from '@/contexts/AuthContext';

interface CommentDebugProps {
  comment: Comment;
  show?: boolean;
}

const CommentDebug = ({ comment, show = false }: CommentDebugProps) => {
  const { user } = useAuth();

  if (!show) return null;

  const isLiked = user?._id ? comment.likes?.includes(user._id) : false;

  return (
    <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded text-xs font-mono mb-2">
      <div><strong>Comment ID:</strong> {comment._id}</div>
      <div><strong>User ID:</strong> {user?._id || 'null'}</div>
      <div><strong>Likes Array:</strong> {JSON.stringify(comment.likes)}</div>
      <div><strong>Likes Count:</strong> {comment.likesCount}</div>
      <div><strong>Is Liked:</strong> {isLiked ? 'Yes' : 'No'}</div>
      <div><strong>Array Includes User:</strong> {comment.likes?.includes(user?._id || '') ? 'Yes' : 'No'}</div>
    </div>
  );
};

export default CommentDebug;