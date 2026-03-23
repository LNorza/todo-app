import { TodoFilter } from "@/todo/components/TodoFilter";
import { TodoForm } from "@/todo/components/TodoForm";
import { TodoList } from "@/todo/components/TodoList";
import { TodoStats } from "@/todo/components/TodoStats";
import { useTodos } from "@/todo/hooks/useTodo";
import { Loading } from "@/components/custom/Loading";

export const TodosPage = () => {
  const {
    todos,
    visibleTodos,
    filter,
    setFilter,
    isLoading,
    isSaving,
    addTodo,
    toggleTodo,
    removeTodo,
    clearCompleted,
  } = useTodos();

  if (isLoading) return <Loading />;

  return (
    <div className="rounded-2xl bg-transparent text-foreground transition-colors">
      <main className="max-w-2xl mx-auto space-y-5">
        {/* Card de estadísticas */}
        <TodoStats todos={todos} />

        {/* Formulario para agregar un nuevo todo */}
        <TodoForm onAdd={addTodo} />

        {/* Filtros */}
        <TodoFilter filter={filter} setFilter={setFilter} />

        {/* Lista de todos */}
        <TodoList
          todos={visibleTodos}
          filter={filter}
          onToggle={toggleTodo}
          onRemove={removeTodo}
        />

        {/* Limpiar completadas */}
        {todos.some((todo) => todo.completed) && (
          <div className="text-center">
            <button
              type="button"
              onClick={() => void clearCompleted()}
              disabled={isSaving}
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
