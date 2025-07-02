import { apiRequest } from './api';

export interface CreatePostRequest {
  title: string;
  content: string;
  category?: string;
  tags?: string;
  status?: 'draft' | 'published';
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