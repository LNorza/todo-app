import type { FilterMode, ITodo } from "@/todo/types/todos.interface";
import { Trash2 } from "lucide-react";

interface Props {
  todos: ITodo[];
  filter: FilterMode;
  onRemove?: (id: string) => void;
  onToggle?: (todo: ITodo) => void;
}

export const TodoList = ({ todos, filter, onRemove, onToggle }: Props) => {
  return (
    <div className="space-y-2">
      {todos.length === 0 ? (
        <div className="py-12 text-center text-sm text-muted-foreground">
          {filter === "done"
            ? "Aún no has completado tareas"
            : filter === "pending"
              ? "No hay tareas pendientes 🎉"
              : "Agrega tu primera tarea arriba"}
        </div>
      ) : (
        todos.map((todo) => (
          <div
            key={todo.id}
            className={`flex items-center gap-3 rounded-xl border bg-card px-4 py-3 transition-all hover:shadow-sm ${
              todo.completed ? "border-border/50 opacity-80" : "border-border"
            }`}
          >
            <button
              type="button"
              onClick={() => onToggle?.(todo)}
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                todo.completed
                  ? "border-primary bg-primary"
                  : "border-muted-foreground/40 hover:border-primary"
              }`}
            >
              {todo.completed && (
                <svg
                  width="9"
                  height="7"
                  viewBox="0 0 9 7"
                  fill="none"
                  className="text-primary-foreground" // ← color que responde al tema
                >
                  <path
                    d="M1 3.5L3.5 6L8 1"
                    stroke="currentColor" // ← usa el color del padre
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            <div className="flex-1">
              <p
                className={`text-sm font-medium ${
                  todo.completed
                    ? "line-through text-muted-foreground"
                    : "text-foreground"
                }`}
              >
                {todo.title}
              </p>
              <p
                className={`text-xs ${
                  todo.completed
                    ? "text-muted-foreground/80"
                    : "text-muted-foreground"
                }`}
              >
                {todo.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onRemove?.(todo.id)}
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
