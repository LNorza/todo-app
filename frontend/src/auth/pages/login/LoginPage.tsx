import { ArrowRight, LockKeyhole, LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuthStore } from "@/auth/store/auth.store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/theme/ThemeToggle";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [isPosting, setIsPosting] = useState(false);

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPosting(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const isLoginSuccess = await login(username, password);

    if (isLoginSuccess) {
      navigate("/");
      return;
    }

    setIsPosting(false);
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-4 bg-background">
      <Card className="w-full max-w-md overflow-hidden rounded-3xl border-border/80 shadow-xl p-0">
        {/* Header decorativo */}
        <CardHeader className="border-b border-border/60 bg-gradient-to-br from-slate-500/10 to-emerald-500/10 gap-4 px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <LockKeyhole className="size-5" />
            </div>
            <ThemeToggle />
          </div>

          <div className="space-y-1">
            <CardTitle className="text-3xl font-semibold tracking-tight">
              Bienvenido
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              Inicia sesión para continuar con tus tareas y mantener tu espacio
              organizado.
            </CardDescription>
          </div>
        </CardHeader>

        {/* Form */}
        <CardContent className="p-0">
          <form className="space-y-3 p-5 pt-0" onSubmit={handleLogin}>
            <div className="space-y-1">
              <label
                htmlFor="username"
                className="text-sm font-medium text-foreground"
              >
                Usuario
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Ingresa tu usuario"
                required
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Contraseña
                </label>
                {/* TODO: Agregar funcionalidad de recuperación de contraseña
                    al mandar correos para verficar identidad y permitir cambiar contraseña
                */}
                {/* <button
                  type="button"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Olvidé mi contraseña
                </button> */}
              </div>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isPosting}
            >
              <LogIn className="size-4" />
              Iniciar sesión
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              ¿Aún no tienes cuenta?{" "}
              <Link
                to="/auth/register"
                className="inline-flex items-center gap-1 text-foreground transition-colors hover:text-primary"
              >
                Regístrate
                <ArrowRight className="size-4" />
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
