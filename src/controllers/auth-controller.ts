import type { NextFunction, Request, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, matchedData, validationResult } from "express-validator";
import passport from "passport";
import { genPassword } from "../lib/password.js";
import { User } from "../models/index.js";

type SignupData = {
  username: string;
  email: string;
  password: string;
};

const signupValidator = [
  body("username")
    .custom(async (username: string) => {
      const userCheck = await User.findOne({ where: { username } });

      if (userCheck !== null) {
        return Promise.reject();
      }

      return true;
    })
    .withMessage("Nome de usuário já existe")
    .isLength({ min: 8 })
    .withMessage("Nome de usuário muito curto"),
  body("email")
    .custom(async (email: string) => {
      const emailCheck = await User.findOne({ where: { email } });

      if (emailCheck !== null) {
        return Promise.reject();
      }

      return true;
    })
    .withMessage("Já existe um usuário cadastrado com este e-mail")
    .isEmail()
    .withMessage("Formato de e-mail inválido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Senha deve ter pelo menos 8 caracteres"),
];

const signupGet: RequestHandler = (_req, res) => {
  res.render("auth/signup", { title: "Sign up" });
};

const signupPost: RequestHandler[] = [
  ...signupValidator,
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).render("auth/signup", {
        title: "Login",
        errors: errors.array(),
      });
      return;
    }

    const data = matchedData(req) as SignupData;
    const hashedPassword = await genPassword(data.password);

    await User.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      isAdmin: false,
    });

    res.redirect("/auth/login");
  }),
];

const loginGet: RequestHandler = (req, res) => {
  const authError = req.session.messages?.at(-1);
  delete req.session.messages;

  res.render("auth/login", {
    title: "Login",
    authError,
  });
};

const loginPost = [
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
];

const logoutGet = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      next(err);
      return;
    }

    res.redirect("/auth/login");
  });
};

export const AuthController = {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  logoutGet,
};

