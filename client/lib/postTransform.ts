import { Post } from './postApi';
import { TArticle } from '@/interfaces/articles.interface';
import { generateAvatarUrl, generateAvatarUrlFromEmail } from '@/utils/avatarUtils';

export const transformPostToArticle = (post: Post): TArticle & { mongoId: string } => {
  // Create a consistent numeric ID from MongoDB ObjectID
  const numericId = parseInt(post._id.slice(-8), 16);
  
  return {
    id: numericId,
    mongoId: post._id,
    avatar: post.author?.firstName 
      ? generateAvatarUrl(post.author.firstName, post.author.lastName, 50)
      : generateAvatarUrlFromEmail(post.author?.email || 'user@example.com', 50),
    title: post.title,
    time_stamp: new Date(post.createdAt).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    img: post.imageUrl || '/images/default-post.jpg' as any,
    likes: post.likes || [],
    views: post.views || 0,
    commentsCount: post.commentsCount || 0,
  };
};

export const transformPostsToArticles = (posts: Post[]): (TArticle & { mongoId: string })[] => {
  return posts.map(transformPostToArticle);
};