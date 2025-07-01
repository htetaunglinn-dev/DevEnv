import { apiRequest } from "./api";

export interface Suggestion {
  _id: string;
  title: string;
  description: string;
  category: "feature" | "improvement" | "bug" | "other";
  priority: "low" | "medium" | "high" | "critical";
  status: "pending" | "in-review" | "approved" | "rejected" | "implemented";
  submittedBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  assignedTo?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  votes: {
    upvotes: string[];
    downvotes: string[];
  };
  comments: {
    user: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    message: string;
    createdAt: string;
  }[];
  tags: string[];
  attachments?: string[];
  voteCount: number;
  totalVotes: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSuggestionData {
  title: string;
  description: string;
  category?: "feature" | "improvement" | "bug" | "other";
  priority?: "low" | "medium" | "high" | "critical";
  tags?: string[];
}

export interface UpdateSuggestionData {
  title?: string;
  description?: string;
  category?: "feature" | "improvement" | "bug" | "other";
  priority?: "low" | "medium" | "high" | "critical";
  tags?: string[];
}

export interface SuggestionFilters {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  priority?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface SuggestionResponse {
  message: string;
  suggestions: Suggestion[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface SingleSuggestionResponse {
  message: string;
  suggestion: Suggestion;
}

export interface SuggestionStats {
  message: string;
  stats: {
    total: number;
    byStatus: { _id: string; count: number }[];
    byCategory: { _id: string; count: number }[];
    byPriority: { _id: string; count: number }[];
    recent: Suggestion[];
  };
}

// API Functions
export const suggestionApi = {
  // Get all suggestions with filters
  getAll: async (filters?: SuggestionFilters): Promise<SuggestionResponse> => {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/suggestions${queryParams.toString() ? `?${queryParams}` : ''}`;
    return apiRequest<SuggestionResponse>(endpoint);
  },

  // Get suggestion by ID
  getById: async (id: string): Promise<SingleSuggestionResponse> => {
    return apiRequest<SingleSuggestionResponse>(`/suggestions/${id}`);
  },

  // Create new suggestion
  create: async (data: CreateSuggestionData): Promise<SingleSuggestionResponse> => {
    return apiRequest<SingleSuggestionResponse>('/suggestions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update suggestion
  update: async (id: string, data: UpdateSuggestionData): Promise<SingleSuggestionResponse> => {
    return apiRequest<SingleSuggestionResponse>(`/suggestions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete suggestion
  delete: async (id: string): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>(`/suggestions/${id}`, {
      method: 'DELETE',
    });
  },

  // Vote on suggestion
  vote: async (id: string, voteType: 'upvote' | 'downvote'): Promise<SingleSuggestionResponse> => {
    return apiRequest<SingleSuggestionResponse>(`/suggestions/${id}/vote`, {
      method: 'POST',
      body: JSON.stringify({ voteType }),
    });
  },

  // Remove vote
  removeVote: async (id: string): Promise<SingleSuggestionResponse> => {
    return apiRequest<SingleSuggestionResponse>(`/suggestions/${id}/vote`, {
      method: 'DELETE',
    });
  },

  // Add comment
  addComment: async (id: string, message: string): Promise<SingleSuggestionResponse> => {
    return apiRequest<SingleSuggestionResponse>(`/suggestions/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  },

  // Get user's suggestions
  getUserSuggestions: async (filters?: { page?: number; limit?: number }): Promise<SuggestionResponse> => {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/suggestions/user/my-suggestions${queryParams.toString() ? `?${queryParams}` : ''}`;
    return apiRequest<SuggestionResponse>(endpoint);
  },

  // Get statistics
  getStats: async (): Promise<SuggestionStats> => {
    return apiRequest<SuggestionStats>('/suggestions/stats');
  },

  // Admin update
  adminUpdate: async (
    id: string, 
    data: {
      status?: string;
      priority?: string;
      assignedTo?: string;
    }
  ): Promise<SingleSuggestionResponse> => {
    return apiRequest<SingleSuggestionResponse>(`/suggestions/${id}/admin`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};