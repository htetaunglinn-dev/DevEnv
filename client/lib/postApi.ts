import { apiRequest } from './api';

export interface CreatePostRequest {
  title: string;
  content: string;
  category?: string;
  tags?: string;
  status?: 'draft' | 'published' | 'archived';
  imageUrl?: string;
}

export interface CreatePostResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    title: string;
    content: string;
    imageUrl?: string;
    author: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    category: string;
    tags: string[];
    status: string;
    views: number;
    likes: string[];
    createdAt: string;
    updatedAt: string;
  };
}

export interface ImageUploadResponse {
  success: boolean;
  message: string;
  data: {
    imageUrl: string;
    publicId: string;
  };
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  category: string;
  tags: string[];
  status: string;
  views: number;
  likes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GetPostsResponse {
  success: boolean;
  data: Post[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface GetPostsParams {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const createPost = async (postData: CreatePostRequest): Promise<CreatePostResponse> => {
  return apiRequest<CreatePostResponse>('/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
  });
};

export const createPostWithImage = async (
  postData: CreatePostRequest,
  imageFile: File
): Promise<CreatePostResponse> => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('title', postData.title);
  formData.append('content', postData.content);
  if (postData.category) formData.append('category', postData.category);
  if (postData.tags) formData.append('tags', postData.tags);
  if (postData.status) formData.append('status', postData.status);

  const token = localStorage.getItem('token');
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

  const response = await fetch(`${baseUrl}/posts`, {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create post');
  }

  return data;
};

export const uploadImage = async (imageFile: File): Promise<ImageUploadResponse> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const token = localStorage.getItem('token');
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

  const response = await fetch(`${baseUrl}/posts/upload-image`, {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to upload image');
  }

  return data;
};

export const getPosts = async (params: GetPostsParams = {}): Promise<GetPostsResponse> => {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.category) searchParams.append('category', params.category);
  if (params.status) searchParams.append('status', params.status);
  if (params.search) searchParams.append('search', params.search);
  if (params.sortBy) searchParams.append('sortBy', params.sortBy);
  if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);

  const queryString = searchParams.toString();
  const endpoint = queryString ? `/posts?${queryString}` : '/posts';
  
  return apiRequest<GetPostsResponse>(endpoint, {
    method: 'GET',
  });
};

export const getPostById = async (id: string): Promise<{ success: boolean; data: Post }> => {
  return apiRequest<{ success: boolean; data: Post }>(`/posts/${id}`, {
    method: 'GET',
  });
};

export const getMyPosts = async (params: GetPostsParams = {}): Promise<GetPostsResponse> => {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.status) searchParams.append('status', params.status);
  if (params.sortBy) searchParams.append('sortBy', params.sortBy);
  if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);

  const queryString = searchParams.toString();
  const endpoint = queryString ? `/posts/my-posts?${queryString}` : '/posts/my-posts';
  
  return apiRequest<GetPostsResponse>(endpoint, {
    method: 'GET',
  });
};

export const updatePost = async (id: string, postData: Partial<CreatePostRequest>): Promise<CreatePostResponse> => {
  return apiRequest<CreatePostResponse>(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(postData),
  });
};

export const deletePost = async (id: string): Promise<{ success: boolean; message: string }> => {
  return apiRequest<{ success: boolean; message: string }>(`/posts/${id}`, {
    method: 'DELETE',
  });
};

export const toggleLike = async (id: string): Promise<{ success: boolean; data: Post }> => {
  return apiRequest<{ success: boolean; data: Post }>(`/posts/${id}/like`, {
    method: 'POST',
  });
};