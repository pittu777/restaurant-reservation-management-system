import { Routes, Route, Navigate } from "react-router-dom";



import AppLayout from "./../components/layout/AppLayout";
import { ProtectedRoute } from "./../components/layout/ProtectedRoute";
import AdminDashboard from "./../pages/AdminDashboard";
import Home from "@/pages/Home";
import CreateReservation from "@/pages/CreateReservation";
import MyReservations from "@/pages/MyReservations";
import UserProfile from "@/pages/UserProfile";
import AuthLayout from "@/features/auth/components/AuthLayout";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

export default function AppRoutes() {
  return (
    <Routes>
        <Route
        path="/login"
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
      />

      <Route
        path="/register"
        element={
          <AuthLayout>
            <RegisterPage />
          </AuthLayout>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Home/>
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/create"
        element={
          <ProtectedRoute role="user">
            <AppLayout>
              <CreateReservation />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-reservations"
        element={
          <ProtectedRoute role="user">
            <AppLayout>
              <MyReservations />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AppLayout>
              <AdminDashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
  path="/profile"
  element={
    <ProtectedRoute role="user">
      <AppLayout>
        <UserProfile />
      </AppLayout>
    </ProtectedRoute>
  }
/>


      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
