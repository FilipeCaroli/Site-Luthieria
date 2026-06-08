import type { RequestHandler } from "express";

export const authMiddleware: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.redirect("/auth/login");
};

