import { useState, useCallback } from "react";

export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

export function useApiError() {
  const [error, setError] = useState<ApiError | null>(null);

  const handleError = useCallback((err: any) => {
    const apiError: ApiError = {
      message: err.response?.data?.message || err.message || "An error occurred",
      status: err.response?.status,
      details: err.response?.data,
    };
    setError(apiError);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const getErrorMessage = useCallback(() => {
    return error?.message || "";
  }, [error]);

  return {
    error,
    handleError,
    clearError,
    getErrorMessage,
  };
}
