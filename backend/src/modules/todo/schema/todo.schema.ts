import { Schema, model } from "mongoose";
import { ITodo } from "../interface/todo.interface";

const userSchema = new Schema<ITodo>(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
      index: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "created_at" } },
);

export const Todo = model<ITodo>("Todo", userSchema);
