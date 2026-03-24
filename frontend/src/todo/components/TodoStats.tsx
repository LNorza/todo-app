import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { ITodo } from "@/todo/types/todos.interface";
import { CheckCheck, CircleDashed, ListTodo } from "lucide-react";

interface Props {
  todos: ITodo[];
}

export const TodoStats = ({ todos }: Props) => {
  const pendingCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - pendingCount;

  const stats = [
    {
      label: "Total",
      value: todos.length,
      icon: ListTodo,
      accent:
        "from-slate-500/12 via-slate-500/6 to-transparent text-slate-700 dark:text-slate-200",
      badge:
        "bg-slate-500/12 text-slate-700 dark:bg-slate-400/12 dark:text-slate-200",
    },
    {
      label: "Pendientes",
      value: pendingCount,
      icon: CircleDashed,
      accent:
        "from-amber-500/15 via-amber-500/6 to-transparent text-amber-700 dark:text-amber-300",
      badge:
        "bg-amber-500/12 text-amber-700 dark:bg-amber-400/12 dark:text-amber-300",
    },
    {
      label: "Completadas",
      value: completedCount,
      icon: CheckCheck,
      accent:
        "from-emerald-500/15 via-emerald-500/6 to-transparent text-emerald-700 dark:text-emerald-300",
      badge:
        "bg-emerald-500/12 text-emerald-700 dark:bg-emerald-400/12 dark:text-emerald-300",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.label}
            className={`relative overflow-hidden bg-gradient-to-br shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${stat.accent}`}
          >
            <div className="relative flex items-start justify-between gap-3 p-2 px-3 py-0.5">
              <div className="flex items-start gap-1">
                <div>
                  <CardDescription className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/90">
                    {stat.label}
                  </CardDescription>
                  <CardTitle className="mt-1 text-2xl font-semibold tracking-tight">
                    {stat.value}
                  </CardTitle>
                </div>
              </div>

              <div
                className={`flex size-10 items-center justify-center rounded-2xl mt-1 ${stat.badge}`}
              >
                <Icon className="size-5" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
