export type FilterMode = "all" | "pending" | "done";

export interface TagConfig {
  label: string;
  className: string;
}

export interface ITodo {
  userId: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}
