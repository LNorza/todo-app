import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
import { GeneralLayout } from "./components/custom/GeneralLayout";
import { TodosPage } from "./todo/pages/todos/TodosPage";
import {
  AuthenticatedRoutes,
  UnauthenticatedRoutes,
} from "./components/routes/ProtectedRoutes";
import { UserDetail } from "./user/pages/userDetail";

const AuthLayout = lazy(() => import("./auth/layouts/AuthLayout"));

export const AppRouter = createBrowserRouter([
  // Main Routes
  {
    path: "/",
    element: (
      <AuthenticatedRoutes>
        <GeneralLayout />
      </AuthenticatedRoutes>
    ),
    children: [
      {
        index: true,
        element: <TodosPage />,
      },
      {
        path: "user",
        element: <UserDetail />,
      },
    ],
  },

  // Auth Routes
  {
    path: "/auth",
    element: (
      <UnauthenticatedRoutes>
        <AuthLayout />
      </UnauthenticatedRoutes>
    ),
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
