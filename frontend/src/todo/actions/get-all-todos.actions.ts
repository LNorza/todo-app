import { api } from "@/api/todoApi";
import type { ApiResponse } from "@/utils/api.interface";
import type { ITodoResponse } from "../types/todos.response";

export const getTodosActions = async () => {
  const {
    data: { data },
  } = await api.get<ApiResponse<ITodoResponse>>("/todos");

  return data.todos;
};
