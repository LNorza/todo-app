import type { IUser } from "@/user/types/user.interface";

export interface IAuthResponse {
  user: IUser;
  token: string;
}
