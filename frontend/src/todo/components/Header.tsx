import { ThemeToggle } from "@/theme/ThemeToggle";
import { Profile } from "@/components/Profile";

type AuthMode = "login" | "register";

export const CustomHeader = () => {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-end px-4 py-4 gap-3">
      <Profile />

      <ThemeToggle />
    </header>
  );
};
