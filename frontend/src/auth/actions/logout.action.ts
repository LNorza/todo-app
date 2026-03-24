import { api } from "@/api/todoApi";
import { getErrorMessage } from "@/utils/get-error-message.util";

export const logoutAction = async (): Promise<void> => {
  try {
    await api.post("/logout");
  } catch (error) {
    throw Error(getErrorMessage(error));
  }
};
