import morgan from "morgan";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

import { errorMiddleware } from "./middlewares/error.middleware";

import userRouter from "./modules/user/users.routes";
import authRouter from "./modules/auth/auth.routes";
import todoRouter from "./modules/todo/todo.routes";
import { apiResponseMiddleware } from "./middlewares/apiResponse.middleware";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(apiResponseMiddleware);

// Swagger Docs
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      withCredentials: true,
    },
  }),
);

// Routes
app.use("/", userRouter);
app.use("/", authRouter);
app.use("/", todoRouter);

// 404
app.use(errorMiddleware);
app.use((_req, res) =>
  res.status(404).json({ success: false, message: "Route not found" }),
);

export default app;
