import { Mail, ShieldCheck, UserRound } from "lucide-react";

import { useAuthStore } from "@/auth/store/auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { updateUserAction } from "../actions/update-user-actions";
import { toast } from "sonner";
import { getInitials } from "@/utils/Helpers/getInitials";

export const UserDetail = () => {
  const { user } = useAuthStore();
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");

  const handleUpdateUser = async () => {
    try {
      await updateUserAction({ id: user!.id, username, password });
      toast.success("Nombre de usuario o contraseña actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar el usuario");
    }
  };

  if (!user) {
    return (
      <section className="py-8">
        <Card className="border-border/70">
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            No hay información de usuario disponible en este momento.
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-6 py-2">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Perfil actual
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Detalle del usuario
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Aqui puedes ver la informacion principal de tu cuenta autenticada.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-emerald-500/10 via-background to-cyan-500/10 shadow-[0_18px_45px_-30px_rgba(16,185,129,0.45)]">
          <CardContent className="flex min-h-[320px] flex-col items-center justify-center gap-5 p-8 text-center">
            <div className="flex size-36 items-center justify-center rounded-[2rem] bg-primary text-5xl font-bold tracking-tight text-primary-foreground shadow-lg">
              {getInitials(user.name)}
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-foreground">
                {user.name}
              </h2>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-border/80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <UserRound className="size-4 text-primary" />
                Nombre completo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium text-foreground">{user.name}</p>
            </CardContent>
          </Card>

          <Card className="border-border/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="size-4 text-primary" />
                Usuario
              </CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              {/* <p className="text-lg font-medium text-foreground">
                - {user.username}
              </p> */}

              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Nombre de usuario
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ingresa tu nombre"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Constraseña
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="text-right">
                <Button
                  type="button"
                  className="mt-2 px-5"
                  onClick={handleUpdateUser}
                >
                  Agregar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/80 sm:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Mail className="size-4 text-primary" />
                Correo electronico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium text-foreground">
                {user.email}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
