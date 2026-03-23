export type FilterMode = "all" | "pending" | "done";

export interface ITodo {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
}
