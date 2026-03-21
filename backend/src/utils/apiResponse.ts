export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: Record<string, unknown>;
}

import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const sendResponse = <T>(
  res: Response,
  data: T,
  message?: string,
  status = StatusCodes.OK,
) => {
  const body: ApiResponse<T> = { success: true, message, data };
  res.status(status).json(body);
};

export const sendError = (
  res: Response,
  message: string,
  status = StatusCodes.INTERNAL_SERVER_ERROR,
) => {
  const body: ApiResponse = { success: false, message };
  res.status(status).json(body);
};
