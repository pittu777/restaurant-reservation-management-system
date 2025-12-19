import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: "admin" | "user";
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const user = useAppSelector(state => state.auth.user);

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
