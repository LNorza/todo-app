import { api } from "@/api/todoApi";
import { getErrorMessage } from "@/utils/get-error-message.util";
import type { IUser } from "../types/auth.interface";

type CheckAuthResponse = {
  valid: boolean;
  user: IUser;
};

export const checkAuthAction = async () => {
  try {
    const { data } = await api.get<CheckAuthResponse>("/verify");
    return data.user;
  } catch (error) {
    throw Error(getErrorMessage(error));
  }
};
