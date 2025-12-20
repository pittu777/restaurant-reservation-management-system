import { useState, useCallback } from "react";

export interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  variant: "default" | "destructive" | "warning";
  isLoading: boolean;
}

export function useConfirmation() {
  const [state, setState] = useState<ConfirmDialogState>({
    isOpen: false,
    title: "",
    description: "",
    confirmText: "Yes, Confirm",
    cancelText: "No, Cancel",
    variant: "default",
    isLoading: false,
  });

  const openConfirmation = useCallback(
    (
      title: string,
      description: string,
      options?: {
        confirmText?: string;
        cancelText?: string;
        variant?: "default" | "destructive" | "warning";
      }
    ) => {
      setState(prev => ({
        ...prev,
        isOpen: true,
        title,
        description,
        confirmText: options?.confirmText || "Yes, Confirm",
        cancelText: options?.cancelText || "No, Cancel",
        variant: options?.variant || "default",
      }));
    },
    []
  );

  const closeConfirmation = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  }, []);

  return {
    ...state,
    openConfirmation,
    closeConfirmation,
    setLoading,
  };
}
