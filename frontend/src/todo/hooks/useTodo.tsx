import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getTodosActions } from "../actions/get-all-todos.actions";
import { deleteTodoAction } from "../actions/remove-todos-actions";
import { getErrorMessage } from "@/utils/get-error-message.util";
import type { FilterMode, ITodo } from "../types/todos.interface";
import { createTodoAction } from "../actions/create-todos-action";
import { updateTodoAction } from "../actions/update-todos-actions";

export const useTodos = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filter, setFilter] = useState<FilterMode>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const visibleTodos = useMemo(() => {
    if (filter === "pending") return todos.filter((todo) => !todo.completed);
    if (filter === "done") return todos.filter((todo) => todo.completed);

    return todos;
  }, [filter, todos]);

  // Cargar los todos desde la API
  const loadTodos = useCallback(async () => {
    try {
      const nextTodos = await getTodosActions();
      setTodos(nextTodos);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Agragar un nuevo todo
  const addTodo = useCallback(
    async ({ title, description }: { title: string; description: string }) => {
      const trimmedTitle = title.trim();
      const trimmedDescription = description.trim();

      if (!trimmedTitle || !trimmedDescription) return false;

      try {
        setIsSaving(true);

        const todo = await createTodoAction({
          title: trimmedTitle,
          description: trimmedDescription,
        });

        setTodos((currentTodos) => [todo, ...currentTodos]);
        return true;
      } catch (error) {
        toast.error(getErrorMessage(error));
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [],
  );

  // Cambiar el estado de completado de un todo
  const toggleTodo = useCallback(async (todo: ITodo) => {
    try {
      setIsSaving(true);

      const updatedTodo = await updateTodoAction({
        id: todo.id,
        completed: !todo.completed,
      });

      setTodos((currentTodos) =>
        currentTodos.map((currentTodo) =>
          currentTodo.id === updatedTodo.id ? updatedTodo : currentTodo,
        ),
      );
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Eliminar un todo
  const removeTodo = useCallback(async (id: string) => {
    try {
      setIsSaving(true);

      await deleteTodoAction(id);
      setTodos((currentTodos) =>
        currentTodos.filter((currentTodo) => currentTodo.id !== id),
      );
      toast.success("Todo eliminado correctamente");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const clearCompleted = useCallback(async () => {
    const completedTodos = todos.filter((todo) => todo.completed);

    if (completedTodos.length === 0) return;

    try {
      setIsSaving(true);

      await Promise.all(
        completedTodos.map((todo) => deleteTodoAction(todo.id)),
      );
      setTodos((currentTodos) =>
        currentTodos.filter((currentTodo) => !currentTodo.completed),
      );
      toast.success("Todos completados eliminados correctamente");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  }, [todos]);

  return {
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
  };
};
