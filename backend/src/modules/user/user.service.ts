import { User } from "./schema/user.schema";
import { SecurityService } from "@/utils/security";
import { StatusCodes } from "http-status-codes";
import { HttpError } from "@/utils/HttpError";
import { UpdateUserDTO } from "./dto/user.dto";

const securityService = new SecurityService();

// Obtener todos los usuarios
export const getAllUsers = async () => {
  return await User.find().select("-password");
};

// Obtener usuario por id
export const getUserById = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new HttpError("Usuario no encontrado", StatusCodes.NOT_FOUND);
  }
  return user;
};

// Actualizar usuario
export const updateUser = async (userId: string, data: UpdateUserDTO) => {
  const updateData = { ...data };

  if (updateData.password) {
    updateData.password = await securityService.hash(updateData.password);
  }

  return await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true },
  ).select("-password");
};

// Eliminar usuario
export const deleteUser = async (userId: string) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new HttpError("Usuario no encontrado", StatusCodes.NOT_FOUND);
  }
  return user;
};
