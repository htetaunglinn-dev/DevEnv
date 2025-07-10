'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface LikeDebugProps {
  postId: string;
  likes: any;
  showDetails?: boolean;
}

const LikeDebug = ({ postId, likes, showDetails = false }: LikeDebugProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!showDetails) return null;

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-mono">
      <h4 className="font-bold mb-2">Debug Info:</h4>
      <div>PostID: {postId || 'null'}</div>
      <div>Likes Type: {typeof likes}</div>
      <div>Likes Value: {JSON.stringify(likes)}</div>
      <div>Is Array: {Array.isArray(likes) ? 'Yes' : 'No'}</div>
      <div>User ID: {user?._id || 'null'}</div>
      <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
      <div>User Object: {JSON.stringify(user)}</div>
    </div>
  );
};

export default LikeDebug;