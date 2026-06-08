import { Router } from "express";
import { AdminController } from "../controllers/admin-controller.js";
import { adminMiddleware } from "../middleware/admin-middleware.js";

export const AdminRouter = Router();

AdminRouter.get("/", adminMiddleware, (_req, res) => {
  res.redirect("/admin/pedidos");
});
AdminRouter.get("/pedidos", adminMiddleware, AdminController.requestsGet);
