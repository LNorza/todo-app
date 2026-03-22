import { create } from "zustand";
import { toast } from "sonner";

import type { IUser } from "../types/auth.interface";
import { loginAction } from "../actions/login.action";
import { getErrorMessage } from "@/utils/get-error-message.util";
import { logoutAction } from "../actions/logout.action";

type AuthStatus = "authenticated" | "not-authenticated";

type AuthState = {
  // Properties
  user: IUser | null;
  token: string | null;
  authStatus: AuthStatus;

  // Actions
  login: (username: string, password: string) => Promise<Boolean>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  // Properties
  user: null,
  token: null,
  authStatus: "not-authenticated",

  // Actions
  login: async (username: string, password: string): Promise<Boolean> => {
    try {
      const data = await loginAction(username, password);

      set({
        user: data.user,
        token: data.token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      set({ user: null, token: null, authStatus: "not-authenticated" });
      toast.error(getErrorMessage(error));
      return false;
    }
  },

  logout: async () => {
    await logoutAction();
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },
}));
