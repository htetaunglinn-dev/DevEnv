import { Post } from './postApi';
import { TArticle } from '@/interfaces/articles.interface';

export const transformPostToArticle = (post: Post): TArticle & { mongoId: string } => {
  // Create a consistent numeric ID from MongoDB ObjectID
  const numericId = parseInt(post._id.slice(-8), 16);
  
  return {
    id: numericId,
    mongoId: post._id,
    avatar: `https://robohash.org/${post.author.email}.png?size=50x50&set=set1`,
    title: post.title,
    time_stamp: new Date(post.createdAt).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    img: post.imageUrl || '/images/default-post.jpg' as any,
  };
};

export const transformPostsToArticles = (posts: Post[]): (TArticle & { mongoId: string })[] => {
  return posts.map(transformPostToArticle);
};