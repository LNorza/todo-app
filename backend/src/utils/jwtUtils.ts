import {
  JwtPayload,
  SignOptions,
  sign,
  verify,
  decode,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";
import { HttpError } from "./HttpError";
import { StatusCodes } from "http-status-codes";

const secretKey = process.env.JWT_SECRET || "";

// Crear un JWT
export const createToken = (
  userId: string,
  username: string,
  expiresIn: SignOptions["expiresIn"] = "8h",
): string => {
  const payload = { userId, username };

  return sign(payload, secretKey, { expiresIn });
};

// Verificar el JWT
export const verifyTokenJWT = (token: string): JwtPayload => {
  try {
    return verify(token, secretKey) as JwtPayload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new HttpError("Token expired", StatusCodes.UNAUTHORIZED);
    }

    if (error instanceof JsonWebTokenError) {
      throw new HttpError("Invalid token", StatusCodes.UNAUTHORIZED);
    }

    throw new HttpError("Token verification failed", StatusCodes.UNAUTHORIZED);
  }
};

// Decodificar JWT sin verificar
export const decodeToken = (token: string): JwtPayload | null => {
  return decode(token) as JwtPayload | null;
};
