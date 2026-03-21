import swaggerJSDoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend API",
      version: "1.0.0",
      description: "Documentacion de la API de autenticacion, usuarios y todos",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Servidor local",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
          description:
            "JWT enviado en la cookie httpOnly `token`. En Swagger UI tambien puedes pegar manualmente el valor del token en Authorize.",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "67d9f3d24d7f9fd0b3771234" },
            name: { type: "string", example: "Luis Perez" },
            username: { type: "string", example: "luisp" },
            email: {
              type: "string",
              format: "email",
              example: "luis@example.com",
            },
            created_at: {
              type: "string",
              format: "date-time",
              example: "2026-03-19T12:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-03-19T12:00:00.000Z",
            },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "username", "password"],
          properties: {
            name: { type: "string", example: "Luis Perez" },
            email: {
              type: "string",
              format: "email",
              example: "luis@example.com",
            },
            username: { type: "string", example: "luisp" },
            password: {
              type: "string",
              format: "password",
              example: "Secret123*",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["username", "password"],
          properties: {
            username: { type: "string", example: "luisp" },
            password: {
              type: "string",
              format: "password",
              example: "Secret123*",
            },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Login successful",
            },
            token: {
              type: "string",
              example:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Q5ZjNkMjRkN2Y5ZmQwYjM3NzEyMzQiLCJ1c2VybmFtZSI6Imx1aXNwIiwiaWF0IjoxNzEwMDAwMDAwLCJleHAiOjE3MTAwMjg4MDB9.signature",
            },
          },
        },
        UpdatePasswordRequest: {
          type: "object",
          required: ["oldPassword", "newPassword"],
          properties: {
            oldPassword: {
              type: "string",
              format: "password",
              example: "Secret123*",
            },
            newPassword: {
              type: "string",
              format: "password",
              example: "NewSecret456*",
            },
          },
        },
        MessageResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Operation completed successfully",
            },
          },
        },
        VerifyTokenResponse: {
          type: "object",
          properties: {
            valid: { type: "boolean", example: true },
            user: {
              type: "object",
              properties: {
                userId: { type: "string", example: "67d9f3d24d7f9fd0b3771234" },
                username: { type: "string", example: "luisp" },
                iat: { type: "number", example: 1710000000 },
                exp: { type: "number", example: 1710028800 },
              },
            },
          },
        },
        Todo: {
          type: "object",
          properties: {
            _id: { type: "string", example: "67d9f3d24d7f9fd0b3779999" },
            userId: { type: "string", example: "67d9f3d24d7f9fd0b3771234" },
            title: { type: "string", example: "Comprar leche" },
            description: { type: "string", example: "Ir al supermercado" },
            completed: { type: "boolean", example: false },
            created_at: {
              type: "string",
              format: "date-time",
              example: "2026-03-19T12:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-03-19T12:00:00.000Z",
            },
          },
        },
        CreateTodoRequest: {
          type: "object",
          required: ["title", "description"],
          properties: {
            title: { type: "string", example: "Comprar leche" },
            description: { type: "string", example: "Ir al supermercado" },
            completed: { type: "boolean", example: false },
          },
        },
        UpdateTodoRequest: {
          type: "object",
          properties: {
            title: { type: "string", example: "Comprar pan" },
            description: { type: "string", example: "Pasar a la panaderia" },
            completed: { type: "boolean", example: true },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "An error occurred",
            },
          },
        },
      },
    },
  },
  apis: ["./src/modules/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
