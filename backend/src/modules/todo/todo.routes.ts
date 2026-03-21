import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "./todo.controller";

const todoRouter = Router();

/**
 * @swagger
 * /todos:
 *   get:
 *     tags:
 *       - Todos
 *     summary: Obtener todos los todos del usuario autenticado
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
todoRouter.get("/todos", authMiddleware, getAllTodos);

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     tags:
 *       - Todos
 *     summary: Obtener un todo del usuario autenticado por ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del todo
 *     responses:
 *       200:
 *         description: Todo obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Todo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
todoRouter.get("/todos/:id", authMiddleware, getTodoById);

/**
 * @swagger
 * /todos:
 *   post:
 *     tags:
 *       - Todos
 *     summary: Crear un todo para el usuario autenticado
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTodoRequest'
 *     responses:
 *       201:
 *         description: Todo creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Datos invalidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
todoRouter.post("/todos", authMiddleware, createTodo);

/**
 * @swagger
 * /todos/{id}:
 *   patch:
 *     tags:
 *       - Todos
 *     summary: Actualizar un todo del usuario autenticado
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTodoRequest'
 *     responses:
 *       200:
 *         description: Todo actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Todo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
todoRouter.patch("/todos/:id", authMiddleware, updateTodo);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     tags:
 *       - Todos
 *     summary: Eliminar un todo del usuario autenticado
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del todo
 *     responses:
 *       204:
 *         description: Todo eliminado correctamente
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Todo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
todoRouter.delete("/todos/:id", authMiddleware, deleteTodo);

export default todoRouter;
