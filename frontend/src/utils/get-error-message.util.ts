import { AxiosError } from "axios";

export const getErrorMessage = (
  error: unknown,
  fallback = "Algo salió mal, inténtalo de nuevo.",
): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};
