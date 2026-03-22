import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
import { TodoLayout } from "./todo/layouts/TodoLayout";
import { TodosPage } from "./todo/pages/todos/TodosPage";

const AuthLayout = lazy(() => import("./auth/layouts/AuthLayout"));

export const AppRouter = createBrowserRouter([
  // Main Routes
  {
    path: "/",
    element: <TodoLayout />,
    children: [
      {
        index: true,
        element: <TodosPage />,
      },
    ],
  },

  // Auth Routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },

  // Navigate all unknown routes to home
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
