import type { ITodo } from "./todos.interface";

export interface ITodoResponse {
  todos: ITodo[];
}
export interface ITodoResponseSingle {
  todo: ITodo;
}
