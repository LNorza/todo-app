import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const apiResponseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.success = (data, message, status = StatusCodes.OK) => {
    res.status(status).json({ success: true, message, data });
  };
  next();
};
