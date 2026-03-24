import { ArrowRight, LockKeyhole, UserPlus } from "lucide-react";
import { useState, type FormEvent } from "react";
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

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();

  const [isPosting, setIsPosting] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }

    setIsPosting(true);

    const isRegisterSuccess = await register(name, email, username, password);

    if (isRegisterSuccess) {
      navigate("/");
      return;
    }

    setIsPosting(false);
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-4 bg-background">
      <Card className="w-full max-w-md overflow-hidden rounded-3xl border-border/80 shadow-xl p-0">
        <CardHeader className="border-b border-border/60 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 gap-4 px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <UserPlus className="size-5" />
            </div>
            <ThemeToggle />
          </div>

          <div className="space-y-1">
            <CardTitle className="text-3xl font-semibold tracking-tight">
              Crea tu cuenta
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              Regístrate para guardar tus tareas, organizar tu trabajo y entrar
              directo a tu espacio.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <form className="space-y-3 p-5 pt-0" onSubmit={handleRegister}>
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Nombre
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Correo
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                required
              />
            </div>

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
                placeholder="Elige un nombre de usuario"
                required
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Contraseña
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Crea una contraseña"
                required
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-foreground"
              >
                Confirmar contraseña
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Repite tu contraseña"
                required
              />
              {passwordError && (
                <p className="text-xs text-destructive">{passwordError}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isPosting}
            >
              <LockKeyhole className="size-4" />
              Crear cuenta
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-1 text-foreground transition-colors hover:text-primary"
              >
                Inicia sesión
                <ArrowRight className="size-4" />
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
