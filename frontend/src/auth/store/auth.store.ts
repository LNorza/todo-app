import { create } from "zustand";
import { toast } from "sonner";

import { loginAction } from "../actions/login.action";
import { getErrorMessage } from "@/utils/get-error-message.util";
import { logoutAction } from "../actions/logout.action";
import { checkAuthAction } from "../actions/check-auth-actions";
import { registerAction } from "../actions/register.action";
import type { IUser } from "@/user/types/user.interface";

type AuthStatus = "authenticated" | "not-authenticated";

type AuthState = {
  // Properties
  user: IUser | null;
  token: string | null;
  authStatus: AuthStatus;

  // Actions
  verifyAuth: () => Promise<boolean>;
  login: (username: string, password: string) => Promise<Boolean>;
  register: (
    name: string,
    email: string,
    username: string,
    password: string,
  ) => Promise<Boolean>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  // Properties
  user: null,
  token: null,
  authStatus: "not-authenticated",

  // Actions
  verifyAuth: async () => {
    try {
      const data = await checkAuthAction();

      set({
        user: data,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },

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

  register: async (
    name: string,
    email: string,
    username: string,
    password: string,
  ): Promise<Boolean> => {
    try {
      const data = await registerAction({ name, email, username, password });

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
