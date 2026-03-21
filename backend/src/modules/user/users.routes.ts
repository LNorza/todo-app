import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "./users.controller";

const userRouter = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener todos los usuarios
 *     description: Devuelve la lista completa de usuarios sin incluir el password.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.get("/users", authMiddleware, getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener un usuario por ID
 *     description: Devuelve la informacion de un usuario sin incluir el password.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.get("/users/:id", authMiddleware, getUser);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Actualizar un usuario
 *     description: Actualiza los datos de un usuario. Si se envia `password`, el servicio la procesa antes de guardar.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 67d9f3d24d7f9fd0b3771234
 *               name:
 *                 type: string
 *                 example: Luis Perez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: luis@example.com
 *               username:
 *                 type: string
 *                 example: luisp
 *               password:
 *                 type: string
 *                 format: password
 *                 example: NewSecret456*
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 updatedUser:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.patch("/users/:id", authMiddleware, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Eliminar un usuario
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *                 deletedUser:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.delete("/users/:id", authMiddleware, deleteUser);

export default userRouter;
