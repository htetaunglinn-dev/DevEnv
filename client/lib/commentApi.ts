import { apiRequest } from "./api";

export interface Comment {
  _id: string;
  content: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  post: string;
  parent?: string;
  likes: string[];
  isEdited: boolean;
  editedAt?: string;
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
  repliesCount?: number;
  likesCount?: number;
}

export interface CreateCommentRequest {
  content: string;
  postId: string;
  parentId?: string;
}

export interface CreateCommentResponse {
  success: boolean;
  message: string;
  data: Comment;
}

export interface GetCommentsResponse {
  success: boolean;
  data: Comment[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface GetCommentsParams {
  page?: number;
  limit?: number;
}

export interface UpdateCommentRequest {
  content: string;
}

export interface UpdateCommentResponse {
  success: boolean;
  message: string;
  data: Comment;
}

export interface ToggleLikeResponse {
  success: boolean;
  message: string;
  data: {
    likesCount: number;
    isLiked: boolean;
  };
}

export const createComment = async (
  commentData: CreateCommentRequest,
): Promise<CreateCommentResponse> => {
  return apiRequest<CreateCommentResponse>("/comments", {
    method: "POST",
    body: JSON.stringify(commentData),
  });
};

export const getComments = async (
  postId: string,
  params: GetCommentsParams = {},
): Promise<GetCommentsResponse> => {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", params.page.toString());
  if (params.limit) searchParams.append("limit", params.limit.toString());

  const queryString = searchParams.toString();
  const endpoint = queryString
    ? `/comments/post/${postId}?${queryString}`
    : `/comments/post/${postId}`;

  return apiRequest<GetCommentsResponse>(endpoint, {
    method: "GET",
  });
};

export const getCommentReplies = async (
  commentId: string,
  params: GetCommentsParams = {},
): Promise<GetCommentsResponse> => {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", params.page.toString());
  if (params.limit) searchParams.append("limit", params.limit.toString());

  const queryString = searchParams.toString();
  const endpoint = queryString
    ? `/comments/${commentId}/replies?${queryString}`
    : `/comments/${commentId}/replies`;

  return apiRequest<GetCommentsResponse>(endpoint, {
    method: "GET",
  });
};

export const updateComment = async (
  commentId: string,
  commentData: UpdateCommentRequest,
): Promise<UpdateCommentResponse> => {
  return apiRequest<UpdateCommentResponse>(`/comments/${commentId}`, {
    method: "PUT",
    body: JSON.stringify(commentData),
  });
};

export const deleteComment = async (
  commentId: string,
): Promise<{ success: boolean; message: string }> => {
  return apiRequest<{ success: boolean; message: string }>(
    `/comments/${commentId}`,
    {
      method: "DELETE",
    },
  );
};

export const toggleCommentLike = async (
  commentId: string,
): Promise<ToggleLikeResponse> => {
  return apiRequest<ToggleLikeResponse>(`/comments/${commentId}/like`, {
    method: "POST",
  });
};
