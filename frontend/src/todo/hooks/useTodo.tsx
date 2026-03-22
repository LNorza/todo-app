import { useQuery } from "@tanstack/react-query";
import { getAllTodosActions } from "../actions/get-all-todos.actions";

export const useTodo = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodosActions,
  });
};
