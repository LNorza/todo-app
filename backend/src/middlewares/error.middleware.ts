import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/HttpError";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("ERROR:", err);

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON body",
    });
  }

  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "Malformed request body",
    });
  }

  if (err?.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}`,
    });
  }

  if (err?.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: Object.values(err.errors).map((validationError: any) => ({
        field: validationError.path,
        message: validationError.message,
      })),
    });
  }

  if (err?.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate value",
      fields: Object.keys(err.keyPattern || {}),
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
