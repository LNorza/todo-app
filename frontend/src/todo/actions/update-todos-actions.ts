import { api } from "@/api/todoApi";
import type { ApiResponse } from "@/api/types/api.interface";
import type { ITodo } from "../types/todos.interface";
import type { ITodoResponseSingle } from "../types/todos.response";

type Props = {
  id: string;
  completed: boolean;
};

export const updateTodoAction = async ({
  id,
  completed,
}: Props): Promise<ITodo> => {
  const {
    data: {
      data: { todo },
    },
  } = await api.patch<ApiResponse<ITodoResponseSingle>>(`/todos/${id}`, {
    completed,
  });

  return todo;
};
