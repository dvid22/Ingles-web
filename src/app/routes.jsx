import { createBrowserRouter, Navigate } from "react-router-dom";

import Landing from "../pages/Landing";

import AuthLayout from "../layouts/AuthLayout";
import LoginView from "../views/auth/LoginView";
import RegisterView from "../views/auth/RegisterView";
import ForgotPasswordView from "../views/auth/ForgotPasswordView";

import ProtectedRoute from "../components/ProtectedRoute";
import AppLayout from "../layouts/AppLayout";

import HomeView from "../views/HomeView";
import LessonsPage from "../views/LessonsPage";
import ProgressPage from "../views/ProgressPage";
import AchievementsPage from "../views/AchievementsPage";
import SettingsPage from "../views/SettingsPage";

export const router = createBrowserRouter([
  // Landing pública
  { path: "/", element: <Landing /> },

  // Auth
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

  // App protegida
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      // Home
      { index: true, element: <HomeView /> },

      // Sidebar pages
      { path: "lessons", element: <LessonsPage /> },
      { path: "progress", element: <ProgressPage /> },
      { path: "achievements", element: <AchievementsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },

  // Catch all
  { path: "*", element: <Navigate to="/auth/login" replace /> },
]);