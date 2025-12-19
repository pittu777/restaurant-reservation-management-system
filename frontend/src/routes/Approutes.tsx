import { Routes, Route, Navigate } from "react-router-dom";



import AppLayout from "./../components/layout/AppLayout";
import { ProtectedRoute } from "./../components/layout/ProtectedRoute";
import UserDashboard from "./../pages/UserDashboard";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import AdminDashboard from "./../pages/AdminDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <UserDashboard />
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

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
