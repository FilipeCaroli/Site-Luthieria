import { Router } from "express";
import { IndexController } from "../controllers/index-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

export const IndexRouter = Router();

IndexRouter.get("/", authMiddleware, IndexController.indexGet);
IndexRouter.get("/contato", authMiddleware, IndexController.contactGet);
IndexRouter.post("/contato", authMiddleware, IndexController.contactPost);
