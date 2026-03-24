import { api } from "@/api/todoApi";
import type { ApiResponse } from "@/api/types/api.interface";
import type { ITodoResponse } from "../types/todos.response";

export const getTodosActions = async () => {
  const {
    data: { data },
  } = await api.get<ApiResponse<ITodoResponse>>("/todos");

  return data.todos;
};
