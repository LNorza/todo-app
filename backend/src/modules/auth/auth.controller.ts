import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as authService from "./auth.service";

export const register = async (req: Request, res: Response) => {
  const { token, newUser } = await authService.register(req.body);
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 8,
  });

  res.success(
    { user: newUser, token: token },
    "Usuario registrado correctamente",
    StatusCodes.CREATED,
  );
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const { token, user } = await authService.login(username, password);
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 8,
  });

  res.success(
    { user: user, token: token },
    "Inicio de sesión exitoso",
    StatusCodes.OK,
  );
};

export const logout = async (req: Request, res: Response) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  res.success(undefined, "Sesión finalizada", StatusCodes.OK);
};

export const verifyToken = async (req: Request, res: Response) => {
  const token = req.cookies["token"];

  const payload = authService.verifyTokenService(token);

  res.status(200).json({
    valid: true,
    user: payload,
  });
};

export const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  await authService.updatePasswordService(id, oldPassword, newPassword);

  return res.success(
    undefined,
    "Contraseña actualizada correctamente",
    StatusCodes.OK,
  );
};
