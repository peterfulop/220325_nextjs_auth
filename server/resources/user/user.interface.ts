import { Document } from "mongodb";

export interface UserCreateOptions extends Document {
  _id?: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface UserUpdateOptions extends Document {
  username?: string;
  email?: string;
}

export interface UserOptions extends Document {
  _id?: string;
  role?: string;
  username?: string;
  email?: string;
}
