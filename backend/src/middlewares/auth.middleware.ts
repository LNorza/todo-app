import { Request, Response, NextFunction } from "express";
import { verifyTokenJWT } from "../utils/jwtUtils";
import { HttpError } from "@/utils/HttpError";
import { StatusCodes } from "http-status-codes";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : undefined;
  const token = req.cookies["token"] || bearerToken;

  if (!token) {
    throw new HttpError("Token no proporcionado", StatusCodes.UNAUTHORIZED);
  }

  try {
    const decoded = verifyTokenJWT(token);
    res.locals.user = decoded;
    return next();
  } catch (error) {
    throw new HttpError("Token inválido o expirado", StatusCodes.UNAUTHORIZED);
  }
};
