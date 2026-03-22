import type { FilterMode, Todo } from "@/todo/types/todos.interface";
import { Trash2 } from "lucide-react";

interface Props {
  visible: Todo[];
  filter: FilterMode;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
}

export const TodoList = ({ visible, filter, onRemove, onToggle }: Props) => {
  return (
    <div className="space-y-2">
      {visible.length === 0 ? (
        <div className="py-12 text-center text-sm text-muted-foreground">
          {filter === "done"
            ? "Aún no has completado tareas"
            : filter === "pending"
              ? "No hay tareas pendientes 🎉"
              : "Agrega tu primera tarea arriba"}
        </div>
      ) : (
        visible.map((todo) => (
          <div
            key={todo.id}
            className={`flex items-center gap-3 rounded-xl border bg-card px-4 py-3 transition-all hover:shadow-sm ${
              todo.done ? "border-border/50 opacity-80" : "border-border"
            }`}
          >
            {/* Checkbox */}
            <button
              type="button"
              onClick={() => onToggle(todo.id)}
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                todo.done
                  ? "border-primary bg-primary"
                  : "border-muted-foreground/40 hover:border-primary"
              }`}
            >
              {todo.done && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path
                    d="M1 3.5L3.5 6L8 1"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            {/* Text */}
            <span
              className={`flex-1 text-sm ${
                todo.done
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              }`}
            >
              {todo.text}
            </span>

            {/* Delete */}
            <button
              type="button"
              onClick={() => onRemove(todo.id)}
              className="ml-1 flex-shrink-0 text-muted-foreground/40 transition-colors hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))
      )}
    </div>
  );
};
