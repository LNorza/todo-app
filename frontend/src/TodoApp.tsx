import { RouterProvider } from "react-router";
import { AppRouter } from "./app.router";
import { ThemeProvider } from "./theme/ThemeProvider";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { Loading } from "./components/custom/Loading";
import { useAuthStore } from "./auth/store/auth.store";

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { verifyAuth } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: verifyAuth,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
  });

  if (isLoading) return <Loading />;

  return children;
};

export const TodoApp = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <CheckAuthProvider>
          <RouterProvider router={AppRouter} />
        </CheckAuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
