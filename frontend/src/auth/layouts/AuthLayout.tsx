import { Outlet } from "react-router";
import { ThemeToggle } from "@/theme/ThemeToggle";

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-background text-foreground transition-colors">
      <div className="mx-auto w-full max-w-6xl px-4 pb-8">
        <Outlet />
      </div>
    </section>
  );
};

export default AuthLayout;
