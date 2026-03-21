import { HttpError } from "@/utils/HttpError";
import { Todo } from "./schema/todo.schema";
import { StatusCodes } from "http-status-codes";
import { CreateTodoDTO, UpdateTodoDTO } from "./dto/todo.dto";
import { Types } from "mongoose";

const ensureTodoIdIsValid = (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new HttpError("Todo no existe", StatusCodes.NOT_FOUND);
  }
};

// Obtener todos los todos
export const getAllTodos = async (userId: string) => {
  return await Todo.find({ userId });
};

// Obtener un todo por ID
export const getTodoById = async (id: string, userId: string) => {
  ensureTodoIdIsValid(id);
  const todo = await Todo.findOne({ _id: id, userId });

  if (!todo) {
    throw new HttpError("Todo no existe", StatusCodes.NOT_FOUND);
  }

  return todo;
};

// Crear un nuevo todo
export const createTodo = async (data: CreateTodoDTO, userId: string) => {
  const newTodo = new Todo({ ...data, userId });
  return await newTodo.save();
};

// Actualizar un todo por ID
export const updateTodo = async (
  id: string,
  data: UpdateTodoDTO,
  userId: string,
) => {
  ensureTodoIdIsValid(id);
  const todo = await Todo.findOneAndUpdate({ _id: id, userId }, data, {
    new: true,
  });

  if (!todo) {
    throw new HttpError("Todo no existe", StatusCodes.NOT_FOUND);
  }

  return todo;
};

// Eliminar un todo por ID
export const deleteTodo = async (id: string, userId: string) => {
  ensureTodoIdIsValid(id);
  const todo = await Todo.findOne({ _id: id, userId });

  if (!todo) {
    throw new HttpError("Todo no existe", StatusCodes.NOT_FOUND);
  }

  return await Todo.findOneAndDelete({ _id: id, userId });
};
