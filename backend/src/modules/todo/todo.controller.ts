import * as todoService from "./todo.service";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UpdateTodoDTO } from "./dto/todo.dto";
import { HttpError } from "@/utils/HttpError";

const getAuthenticatedUserId = (res: Response) => {
  const userId = res.locals.user?.userId;

  if (!userId) {
    throw new HttpError("Usuario no autenticado", StatusCodes.UNAUTHORIZED);
  }

  return userId as string;
};

export const getAllTodos = async (req: Request, res: Response) => {
  const userId = getAuthenticatedUserId(res);
  const todos = await todoService.getAllTodos(userId);
  res.success({ todos }, "Todos obtenidos", StatusCodes.OK);
};

export const getTodoById = async (
  req: Request<UpdateTodoDTO>,
  res: Response,
) => {
  const { id } = req.params;
  const userId = getAuthenticatedUserId(res);
  const todo = await todoService.getTodoById(id, userId);
  res.success({ todo }, "Todo obtenido correctamente", StatusCodes.OK);
};

export const createTodo = async (req: Request, res: Response) => {
  const userId = getAuthenticatedUserId(res);
  const newTodo = await todoService.createTodo(req.body, userId);
  res.status(StatusCodes.CREATED).json(newTodo);
  res.success(
    { todo: newTodo },
    "Todo creado correctamente",
    StatusCodes.CREATED,
  );
};

export const updateTodo = async (
  req: Request<UpdateTodoDTO>,
  res: Response,
) => {
  const { id } = req.params;
  const userId = getAuthenticatedUserId(res);
  const updatedTodo = await todoService.updateTodo(id, req.body, userId);
  res.success(
    { todo: updatedTodo },
    "Todo actualizado correctamente",
    StatusCodes.OK,
  );
};

export const deleteTodo = async (
  req: Request<UpdateTodoDTO>,
  res: Response,
) => {
  const { id } = req.params;
  const userId = getAuthenticatedUserId(res);
  await todoService.deleteTodo(id, userId);
  res.success(undefined, "Todo eliminado", StatusCodes.NO_CONTENT);
};
