import { api } from "@/api/todoApi";
import type { IUser } from "@/user/types/user.interface";
import { getErrorMessage } from "@/utils/get-error-message.util";

type CheckAuthResponse = {
  valid: boolean;
  user: IUser;
};

export const checkAuthAction = async () => {
  try {
    const { data } = await api.get<CheckAuthResponse>("/verify");
    return data.user;
  } catch (error) {
    console.error(error);

    throw Error(getErrorMessage(error));
  }
};
