import { api } from "@/api/todoApi";

export const getAllTodosActions = async () => {
  const response = await api.get("/todos");

  return response.data;
};
