import { Button } from "@/components/ui/button";
import type { FilterMode } from "@/todo/types/todos.interface";
import { useState } from "react";

export const TodoFilter = () => {
  const [filter, setFilter] = useState<FilterMode>("all");

  return (
    <div className="flex gap-2">
      {(
        [
          ["all", "Todas"],
          ["pending", "Pendientes"],
          ["done", "Completadas"],
        ] as [FilterMode, string][]
      ).map(([f, label]) => (
        <Button
          key={f}
          variant={filter === f ? "default" : "outline"}
          size="sm"
          className={`h-8 text-xs ${filter === f ? "" : "text-zinc-500"}`}
          onClick={() => setFilter(f)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};
