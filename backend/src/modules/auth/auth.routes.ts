import { authMiddleware } from "./../../middlewares/auth.middleware";
import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken,
  updatePassword,
} from "./auth.controller";

const authRouter = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Iniciar sesion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login correcto, cookie `token` creada y token visible en la respuesta
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: Cookie httpOnly con el JWT
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Credenciales invalidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
authRouter.post("/login", login);

/**
 * @swagger
 * /logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Cerrar sesion
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Sesion finalizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
authRouter.post("/logout", authMiddleware, logout);

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       409:
 *         description: Email o username ya registrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
authRouter.post("/register", register);

/**
 * @swagger
 * /verify:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Verificar si la cookie JWT es valida
 *     description: Valida el token y retorna el usuario completo asociado junto al JWT. Si usas Swagger UI, primero puedes hacer login y copiar el campo `token` de la respuesta para pegarlo en `Authorize`.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Token valido y usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VerifyTokenResponse'
 *       401:
 *         description: Token ausente o invalido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario asociado al token no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
authRouter.get("/verify", verifyToken);

/**
 * @swagger
 * /update-password/{id}:
 *   patch:
 *     tags:
 *       - Auth
 *     summary: Actualizar la contraseña de un usuario
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
 *             $ref: '#/components/schemas/UpdatePasswordRequest'
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       401:
 *         description: Password actual invalido o token faltante
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
authRouter.patch("/update-password/:id", authMiddleware, updatePassword);

export default authRouter;
