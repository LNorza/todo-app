import { Outlet } from "react-router";
import { CustomHeader } from "./Header";
import { Card, CardContent } from "@/components/ui/card";

export const GeneralLayout = () => {
  return (
    <section className="min-h-screen bg-background text-foreground transition-colors">
      <CustomHeader />

      <div className="mx-auto w-full max-w-6xl px-4 pb-8">
        <Card className="border-border/80 bg-card shadow-[0_18px_50px_-24px_rgba(15,23,42,0.28)]">
          <CardContent className="p-4 sm:p-6 pt-4">
            <Outlet />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
