import { useAuthStore } from "@/auth/store/auth.store";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

export const AuthenticatedRoutes = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();

  if (authStatus === "not-authenticated") {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export const UnauthenticatedRoutes = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();

  if (authStatus === "authenticated") {
    return <Navigate to="/" />;
  }

  return children;
};
