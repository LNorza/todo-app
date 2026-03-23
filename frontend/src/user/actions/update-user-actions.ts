import { api } from "@/api/todoApi";
import type { ApiResponse } from "@/api/types/api.interface";
import type { IUser } from "../types/user.interface";

type Props = {
  id: string;
  username: string;
  password: string;
};

export const updateUserAction = async ({ id, username, password }: Props) => {
  await api.patch<ApiResponse<IUser>>(`/users/${id}`, {
    username,
    password,
  });
};
