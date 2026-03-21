import * as userService from "./user.service";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UpdateUserDTO } from "./dto/user.dto";
import { HttpError } from "@/utils/HttpError";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.success({ users }, "Usuarios obtenidos", StatusCodes.OK);
};

export const getUser = async (req: Request<UpdateUserDTO>, res: Response) => {
  const userId = req.params.id;
  const user = await userService.getUserById(userId);
  res.success({ user }, "Usuario obtenido correctamente", StatusCodes.OK);
};

export const updateUser = async (
  req: Request<UpdateUserDTO>,
  res: Response,
) => {
  const userId = req.params.id;
  const user = req.body;
  const updatedUser = await userService.updateUser(userId, user);

  if (updatedUser) {
    res.success(
      { user: updatedUser },
      "Usuario actualizado correctamente",
      StatusCodes.OK,
    );
  } else {
    throw new HttpError("Usuario no encontrado", StatusCodes.NOT_FOUND);
  }
};

export const deleteUser = async (
  req: Request<UpdateUserDTO>,
  res: Response,
) => {
  const deletedUser = await userService.deleteUser(req.params.id);
  if (deletedUser) {
    res.success(
      { user: deletedUser },
      "Usuario eliminado correctamente",
      StatusCodes.OK,
    );
  } else {
    throw new HttpError("Usuario no encontrado", StatusCodes.NOT_FOUND);
  }
};
