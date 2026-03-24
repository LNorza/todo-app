import { api } from "@/api/todoApi";
import type { IAuthResponse } from "../types/auth.Response";
import { getErrorMessage } from "@/utils/get-error-message.util";
import type { ApiResponse } from "@/api/types/api.interface";

export const loginAction = async (
  username: string,
  password: string,
): Promise<IAuthResponse> => {
  try {
    const { data } = await api.post<ApiResponse<IAuthResponse>>("/login", {
      username,
      password,
    });

    return data.data;
  } catch (error) {
    throw Error(getErrorMessage(error));
  }
};
