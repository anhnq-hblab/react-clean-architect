// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Pagination
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

// Error
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}

// Loading state
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Select option
export interface SelectOption<T = string> {
  label: string;
  value: T;
}
