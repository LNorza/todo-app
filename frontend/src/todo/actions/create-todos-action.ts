import { api } from "@/api/todoApi";
import type { ITodo } from "../types/todos.interface";

type Props = {
  title: string;
  description: string;
};

export const createTodoAction = async ({
  title,
  description,
}: Props): Promise<ITodo> => {
  const { data } = await api.post<ITodo>("/todos", {
    title,
    description,
    completed: false,
  });

  return data;
};
