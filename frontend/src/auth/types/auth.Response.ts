import type { IUser } from "./auth.interface";

export interface IAuthResponse {
  user: IUser;
  token: string;
}
