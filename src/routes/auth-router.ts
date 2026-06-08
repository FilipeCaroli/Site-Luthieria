import { Router } from "express";
import { AuthController } from "../controllers/auth-controller.js";

export const AuthRouter = Router();

AuthRouter.get("/signup", AuthController.signupGet);
AuthRouter.post("/signup", AuthController.signupPost);
AuthRouter.get("/login", AuthController.loginGet);
AuthRouter.post("/login", AuthController.loginPost);
AuthRouter.get("/log-out", AuthController.logoutGet);
