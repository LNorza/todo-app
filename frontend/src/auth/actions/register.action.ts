import { api } from "@/api/todoApi";
import { getErrorMessage } from "@/utils/get-error-message.util";
import type { ApiResponse } from "@/api/types/api.interface";
import type { IAuthResponse } from "../types/auth.Response";

type RegisterPayload = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export const registerAction = async ({
  name,
  email,
  username,
  password,
}: RegisterPayload): Promise<IAuthResponse> => {
  try {
    const { data } = await api.post<ApiResponse<IAuthResponse>>("/register", {
      name,
      email,
      username,
      password,
    });

    return data.data;
  } catch (error) {
    throw Error(getErrorMessage(error));
  }
};
