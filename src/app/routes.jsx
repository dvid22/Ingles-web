import { createBrowserRouter, Navigate } from "react-router-dom";
import Landing from "../pages/Landing";

import AuthLayout from "../layouts/AuthLayout";
import LoginView from "../views/auth/LoginView";
import RegisterView from "../views/auth/RegisterView";
import ForgotPasswordView from "../views/auth/ForgotPasswordView";

import ProtectedRoute from "../components/ProtectedRoute";
import AppLayout from "../layouts/AppLayout";
import HomeView from "../views/HomeView";

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginView /> },
      { path: "register", element: <RegisterView /> },
      { path: "reset", element: <ForgotPasswordView /> },
      { index: true, element: <Navigate to="/auth/login" replace /> },
    ],
  },

  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      // Home (por ahora solo esto)
      { index: true, element: <HomeView /> },
    ],
  },

  { path: "*", element: <Navigate to="/auth/login" replace /> },
]);