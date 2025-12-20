import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export interface ConfirmationAlertProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive" | "warning";
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationAlert({
  isOpen,
  title,
  description,
  confirmText = "Yes, Confirm",
  cancelText = "No, Cancel",
  variant = "default",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmationAlertProps) {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case "destructive":
        return {
          container: "bg-red-50 border-red-200",
          icon: "text-red-600",
          title: "text-red-800",
          description: "text-red-700",
          confirmButton: "bg-red-600 hover:bg-red-700",
          borderColor: "border-red-300",
        };
      case "warning":
        return {
          container: "bg-orange-50 border-orange-200",
          icon: "text-orange-600",
          title: "text-orange-800",
          description: "text-orange-700",
          confirmButton: "bg-orange-600 hover:bg-orange-700",
          borderColor: "border-orange-300",
        };
      default:
        return {
          container: "bg-blue-50 border-blue-200",
          icon: "text-blue-600",
          title: "text-blue-800",
          description: "text-blue-700",
          confirmButton: "bg-blue-600 hover:bg-blue-700",
          borderColor: "border-blue-300",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Alert className={styles.container}>
      <AlertCircle className={`h-4 w-4 ${styles.icon}`} />
      <AlertTitle className={styles.title}>{title}</AlertTitle>
      <AlertDescription className={`${styles.description} space-y-3`}>
        <p>{description}</p>
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            onClick={onConfirm}
            disabled={isLoading}
            className={`${styles.confirmButton} text-white`}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className={`border-${variant === "destructive" ? "red" : variant === "warning" ? "orange" : "blue"}-300`}
          >
            {cancelText}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
