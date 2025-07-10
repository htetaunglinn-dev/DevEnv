'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { toggleLike } from '@/lib/postApi';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface SimpleLikeButtonProps {
  postId: string;
  initialLikes: string[];
  onLikeUpdate?: (newLikesCount: number, isLiked: boolean) => void;
}

const SimpleLikeButton = ({ 
  postId, 
  initialLikes, 
  onLikeUpdate
}: SimpleLikeButtonProps) => {
  const { user, isAuthenticated } = useAuth();
  const [likes, setLikes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize likes and check if user has liked
  useEffect(() => {
    const safeLikes = Array.isArray(initialLikes) ? initialLikes : [];
    setLikes(safeLikes);
  }, [initialLikes]);

  const isLiked = user?._id ? likes.includes(user._id) : false;

  const handleLike = async () => {
    if (!isAuthenticated || !user) {
      toast.error('Please log in to like posts');
      return;
    }

    if (isLoading || !postId) return;

    setIsLoading(true);
    
    try {
      console.log('Before API call - isLiked:', isLiked, 'likes:', likes);
      
      const response = await toggleLike(postId);
      const newLikes = Array.isArray(response.data.likes) ? response.data.likes : [];
      const newIsLiked = user._id ? newLikes.includes(user._id) : false;
      
      console.log('After API call - newIsLiked:', newIsLiked, 'newLikes:', newLikes);
      
      // Update state with server response
      setLikes(newLikes);
      
      // Call the callback
      onLikeUpdate?.(newLikes.length, newIsLiked);
      
      // Show toast based on new state
      if (newIsLiked) {
        toast.success('Post liked! ❤️');
      } else {
        toast.success('Post unliked');
      }
      
    } catch (error: any) {
      console.error('Like toggle error:', error);
      toast.error(error.message || 'Failed to toggle like');
    } finally {
      setIsLoading(false);
    }
  };

  if (!postId) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      disabled={isLoading}
      className={`
        flex items-center space-x-1 
        ${isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-red-500'}
        transition-colors duration-200
      `}
    >
      <Heart 
        className={`h-4 w-4 ${isLiked ? 'fill-current' : ''} transition-all duration-200`} 
      />
      <span>{likes.length}</span>
    </Button>
  );
};

export default SimpleLikeButton;