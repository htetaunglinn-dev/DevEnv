'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageCircle } from 'lucide-react';
import { getComments, Comment } from '@/lib/commentApi';
import { toast } from 'sonner';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { useAuth } from '@/contexts/AuthContext';

interface CommentListProps {
  postId: string;
}

const CommentList = ({ postId }: CommentListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const { user } = useAuth();

  const fetchComments = async (page = 1, append = false) => {
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await getComments(postId, { page, limit: 10 });
      
      if (append) {
        setComments(prev => [...prev, ...response.data]);
      } else {
        setComments(response.data);
      }
      
      setHasMore(response.pagination.hasNextPage);
      setTotalComments(response.pagination.totalItems);
      setCurrentPage(page);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load comments');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = () => {
    fetchComments(1, false);
  };

  const handleLoadMore = () => {
    fetchComments(currentPage + 1, true);
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-16 w-full" />
            <div className="flex space-x-2">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-6 w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <MessageCircle className="h-5 w-5" />
        <h3 className="text-lg font-semibold">
          Comments ({totalComments})
        </h3>
      </div>

      {user && (
        <CommentForm
          postId={postId}
          onCommentSubmit={handleCommentSubmit}
        />
      )}

      {!user && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please log in to post comments
          </p>
          <Button variant="outline" asChild>
            <a href="/login">Log In</a>
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          <LoadingSkeleton />
        ) : comments.length > 0 ? (
          <>
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                onUpdate={() => fetchComments(1, false)}
                onReply={() => fetchComments(1, false)}
              />
            ))}
            
            {hasMore && (
              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="min-w-[120px]"
                >
                  {loadingMore ? 'Loading...' : 'Load More'}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No comments yet. Be the first to comment!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentList;