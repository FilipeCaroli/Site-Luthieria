import type { User } from "../models/user-model.js";

declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
      email: string;
      password: string | null;
      isAdmin: boolean;
    }
  }
}

declare module "http-errors" {
  interface HttpError {
    status?: number;
  }
}

declare module "express-session" {
  interface SessionData {
    messages?: string[];
  }
}

export type AuthUser = User;
