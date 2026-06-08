import type { RequestHandler } from "express";

type AppError = Error & { status?: number };

export const adminMiddleware: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/auth/login");
    return;
  }

  if (!req.user?.isAdmin) {
    const err: AppError = new Error("Acesso restrito a administradores");
    err.status = 403;
    next(err);
    return;
  }

  next();
};

