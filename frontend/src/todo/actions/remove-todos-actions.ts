import { api } from "@/api/todoApi";

export const deleteTodoAction = async (id: string): Promise<void> => {
  await api.delete(`/todos/${id}`);
};
