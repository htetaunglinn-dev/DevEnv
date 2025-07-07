import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getPosts, 
  getPostById, 
  getMyPosts, 
  createPost, 
  createPostWithImage, 
  updatePost, 
  deletePost, 
  toggleLike,
  GetPostsParams,
  CreatePostRequest,
  Post 
} from '@/lib/postApi';

export const POSTS_QUERY_KEY = 'posts';

export const usePosts = (params: GetPostsParams = {}) => {
  return useQuery({
    queryKey: [POSTS_QUERY_KEY, params],
    queryFn: () => getPosts(params),
    select: (data) => ({ posts: data.data, pagination: data.pagination }),
  });
};

export const usePost = (id: string) => {
  return useQuery({
    queryKey: [POSTS_QUERY_KEY, id],
    queryFn: () => getPostById(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

export const useMyPosts = (params: GetPostsParams = {}) => {
  return useQuery({
    queryKey: [POSTS_QUERY_KEY, 'my-posts', params],
    queryFn: () => getMyPosts(params),
    select: (data) => ({ posts: data.data, pagination: data.pagination }),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
    },
  });
};

export const useCreatePostWithImage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ postData, imageFile }: { postData: CreatePostRequest; imageFile: File }) => 
      createPostWithImage(postData, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, postData }: { id: string; postData: Partial<CreatePostRequest> }) => 
      updatePost(id, postData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY, variables.id] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
    },
  });
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: toggleLike,
    onSuccess: (data, postId) => {
      queryClient.setQueryData([POSTS_QUERY_KEY, postId], (old: { data: Post } | undefined) => {
        if (!old) return old;
        return {
          ...old,
          data: data.data,
        };
      });
      
      queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
    },
  });
};

export const usePopularPosts = () => {
  return usePosts({ 
    sortBy: 'views', 
    sortOrder: 'desc', 
    limit: 10,
    status: 'published' 
  });
};

export const useLatestPosts = () => {
  return usePosts({ 
    sortBy: 'createdAt', 
    sortOrder: 'desc', 
    limit: 10,
    status: 'published' 
  });
};

export const useTechnologyPosts = () => {
  return usePosts({ 
    category: 'technology', 
    sortBy: 'createdAt', 
    sortOrder: 'desc',
    status: 'published' 
  });
};

export const useMostViewedPosts = () => {
  return usePosts({ 
    sortBy: 'views', 
    sortOrder: 'desc', 
    limit: 20,
    status: 'published' 
  });
};