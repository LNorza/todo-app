import { api } from "@/api/todoApi";
import { useAuthStore } from "../store/auth.store";
import { getErrorMessage } from "@/utils/get-error-message.util";

export const checkAuthAction = async () => {
  const { token } = useAuthStore();

  if (!token) throw Error("No se encontró token de autenticación");

  try {
    await api.post("/verify");
  } catch (error) {
    throw Error(getErrorMessage(error));
  }
};
