import { HttpError } from "@/utils/HttpError";
import { User } from "../user/schema/user.schema";
import { SecurityService } from "@/utils/security";
import { createToken, verifyTokenJWT } from "../../utils/jwtUtils";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../user/interface/user.interface";

const securityService = new SecurityService();

export const register = async (data: IUser) => {
  const { name, email, username, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new HttpError("Email already in use", StatusCodes.CONFLICT);
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new HttpError("Nombre de usuario ya en uso", StatusCodes.CONFLICT);
  }

  const hashedPassword = await securityService.hash(password);

  const newUser = new User({
    name,
    email,
    username,
    password: hashedPassword,
  });

  const token = createToken(newUser.id.toString(), newUser.username);

  const savedUser = await newUser.save();

  return { token: token, newUser: savedUser };
};

export const login = async (username: string, password: string) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new HttpError(
      "nombre de usuario o contraseña inválidos",
      StatusCodes.UNAUTHORIZED,
    );
  }

  const isMatch = await securityService.compare(password, user.password);

  if (!isMatch) {
    throw new HttpError(
      "nombre de usuario o contraseña inválidos",
      StatusCodes.UNAUTHORIZED,
    );
  }

  const token = createToken(user.id.toString(), user.username);

  return { token, user };
};

export const verifyTokenService = async (token?: string) => {
  if (!token) {
    throw new HttpError("Token no proporcionado", StatusCodes.UNAUTHORIZED);
  }

  const decodedToken = verifyTokenJWT(token);
  const user = await User.findById(decodedToken.userId).select("-password");

  if (!user) {
    throw new HttpError("Usuario no encontrado", StatusCodes.NOT_FOUND);
  }

  return { user };
};

export const updatePasswordService = async (
  id: string,
  oldPassword: string,
  newPassword: string,
) => {
  const user = await User.findById(id).select("+password");

  if (!user) {
    throw new HttpError("Usuario no encontrado", StatusCodes.NOT_FOUND);
  }

  const isMatch = await securityService.compare(oldPassword, user.password);

  if (!isMatch) {
    throw new HttpError("Contraseña inválida", StatusCodes.UNAUTHORIZED);
  }

  user.password = await securityService.hash(newPassword);
  await user.save();
};
