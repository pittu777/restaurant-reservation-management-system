import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { useEffect } from "react";

export type NotificationType = "success" | "error" | "info";

export interface NotificationProps {
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}

export function Notification({
  type,
  title,
  message,
  duration = 3000,
  onClose,
}: NotificationProps) {
  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getStyles = () => {
    switch (type) {
      case "success":
        return {
          container: "bg-green-50 border-green-200",
          icon: "text-green-600",
          title: "text-green-800",
          description: "text-green-700",
          Icon: CheckCircle,
        };
      case "error":
        return {
          container: "bg-red-50 border-red-200",
          icon: "text-red-600",
          title: "text-red-800",
          description: "text-red-700",
          Icon: AlertCircle,
        };
      case "info":
      default:
        return {
          container: "bg-blue-50 border-blue-200",
          icon: "text-blue-600",
          title: "text-blue-800",
          description: "text-blue-700",
          Icon: Info,
        };
    }
  };

  const styles = getStyles();
  const Icon = styles.Icon;

  return (
    <Alert className={styles.container}>
      <Icon className={`h-4 w-4 ${styles.icon}`} />
      <AlertTitle className={styles.title}>{title}</AlertTitle>
      <AlertDescription className={styles.description}>{message}</AlertDescription>
    </Alert>
  );
}
