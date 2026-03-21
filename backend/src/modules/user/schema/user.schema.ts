import { Schema, model } from "mongoose";
import { IUser } from "../interface/user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at" } },
);

export const User = model<IUser>("User", userSchema);
