import { TodoFilter } from "@/todo/components/TodoFilter";
import { TodoForm } from "@/todo/components/TodoForm";
import { TodoList } from "@/todo/components/TodoList";
import { TodoStats } from "@/todo/components/TodoStats";
import { useTodo } from "@/todo/hooks/useTodo";
import type { FilterMode, Todo } from "@/todo/types/todos.interface";
import { useState } from "react";

export const TodosPage = () => {
  const { data } = useTodo();

  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Comprar leche", done: false },
    { id: 2, text: "Enviar reporte", done: true },
    { id: 3, text: "Llamar a Juan", done: false },
    { id: 4, text: "Pagar facturas", done: true },
  ]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<FilterMode>("all");

  // Función para actualizar el estado de los todos
  const save = (next: Todo[]) => {
    setTodos(next);
  };

  const toggle = (id: number) =>
    save(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id: number) => save(todos.filter((t) => t.id !== id));

  const clearDone = () => save(todos.filter((t) => !t.done));

  const visible = todos.filter((t) =>
    filter === "pending" ? !t.done : filter === "done" ? t.done : true,
  );

  return (
    <div className="rounded-2xl bg-transparent text-foreground transition-colors">
      <main className="max-w-2xl mx-auto space-y-5">
        {/* Stats */}
        <TodoStats todos={todos} />

        {/* Add todo */}
        <TodoForm />

        {/* Filters */}
        <TodoFilter />

        {/* Todo list */}
        <TodoList
          visible={visible}
          filter={filter}
          onRemove={remove}
          onToggle={toggle}
        />

        {/* Clear done */}
        {todos.some((t) => t.done) && (
          <div className="text-center">
            <button
              type="button"
              onClick={clearDone}
              className="text-xs text-zinc-400 hover:text-zinc-600 underline underline-offset-2 transition-colors"
            >
              Limpiar completadas
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
