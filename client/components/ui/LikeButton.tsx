'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { toggleLike } from '@/lib/postApi';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface LikeButtonProps {
  postId: string;
  initialLikes: string[];
  onLikeUpdate?: (newLikesCount: number, isLiked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  variant?: 'default' | 'ghost' | 'outline';
}

const LikeButton = ({ 
  postId, 
  initialLikes, 
  onLikeUpdate,
  size = 'md',
  showCount = true,
  variant = 'ghost'
}: LikeButtonProps) => {
  const { user, isAuthenticated } = useAuth();
  const [likes, setLikes] = useState<string[]>(Array.isArray(initialLikes) ? initialLikes : []);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [justClicked, setJustClicked] = useState(false);

  // Early return if no postId
  if (!postId) {
    return null;
  }

  // Update likes when props change
  useEffect(() => {
    const safeLikes = Array.isArray(initialLikes) ? initialLikes : [];
    setLikes(safeLikes);
    
    // Also update isLiked state when likes change
    if (user?._id) {
      setIsLiked(safeLikes.includes(user._id));
    } else {
      setIsLiked(false);
    }
  }, [initialLikes, user?._id]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    e.nativeEvent.stopImmediatePropagation(); // Prevent event bubbling to parent Link in Next.js
    
    if (!isAuthenticated || !user) {
      toast.error('Please log in to like posts');
      return;
    }

    if (isLoading || !postId) return;

    // Store the current state before making changes
    const currentLiked = isLiked;
    const currentLikes = [...likes];
    
    setJustClicked(true);
    setIsLoading(true);
    
    // Reset animation after a short delay
    setTimeout(() => setJustClicked(false), 600);
    
    try {
      const response = await toggleLike(postId);
      const newLikes = Array.isArray(response.data.likes) ? response.data.likes : [];
      const newIsLiked = user?._id ? newLikes.includes(user._id) : false;
      
      
      // Update with server response
      setLikes(newLikes);
      setIsLiked(newIsLiked);
      
      // Call the callback with updated data
      onLikeUpdate?.(newLikes.length, newIsLiked);
      
      // Show appropriate message based on the action taken (not the previous state)
      // If we went from not liked to liked, show liked message
      // If we went from liked to not liked, show unliked message
      if (!currentLiked && newIsLiked) {
        toast.success('Post liked! ❤️');
      } else if (currentLiked && !newIsLiked) {
        toast.success('Post unliked');
      }
    } catch (error: any) {
      // Revert to original state on error
      setIsLiked(currentLiked);
      setLikes(currentLikes);
      toast.error(error.message || 'Failed to toggle like');
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'h-8 px-2 text-xs',
    md: 'h-9 px-3 text-sm', 
    lg: 'h-10 px-4 text-base'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={handleLike}
      disabled={isLoading}
      className={`
        ${sizeClasses[size]} 
        flex items-center space-x-1 
        ${isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-red-500'}
        transition-colors duration-200
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <Heart 
        className={`
          ${iconSizes[size]} 
          ${isLiked ? 'fill-current' : ''} 
          transition-all duration-300 ease-in-out
          ${justClicked ? 'animate-bounce' : ''}
          ${isLiked && !justClicked ? 'scale-110' : 'hover:scale-105'}
          transform
        `} 
      />
      {showCount && (
        <span className={`
          min-w-[1rem] text-center transition-all duration-200
          ${justClicked ? 'scale-125' : 'scale-100'}
        `}>
          {Array.isArray(likes) ? likes.length : 0}
        </span>
      )}
    </Button>
  );
};

export default LikeButton;