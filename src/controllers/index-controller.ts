import type { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { body, matchedData, validationResult } from "express-validator";
import { ContactRequest } from "../models/index.js";

const instruments = {
  caat: "Caatinga",
  "mst-c": "Master (Cedro)",
  "mst-p": "Master (Pinho)",
  "esp-c": "Série Especial (Cedro)",
  "esp-p": "Série Especial (Pinho)",
} as const;

type InstrumentKey = keyof typeof instruments;

type ContactData = {
  name: string;
  email: string;
  cpf: string;
  phone?: string;
  instrument: InstrumentKey;
  message: string;
};

const contactValidator = [
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Informe seu nome completo"),
  body("email").trim().isEmail().withMessage("Informe um e-mail válido"),
  body("cpf")
    .trim()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .withMessage("Informe um CPF no formato 000.000.000-00"),
  body("instrument")
    .isIn(Object.keys(instruments))
    .withMessage("Selecione o instrumento de interesse"),
  body("phone").optional({ values: "falsy" }).trim(),
  body("message")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Escreva uma mensagem mais detalhada"),
];

const indexGet: RequestHandler = (_req, res) => {
  res.render("index", {
    title: "Início",
  });
};

const contactGet: RequestHandler = (req, res) => {
  res.render("contact", {
    title: "Contato",
    sent: req.query.sent === "1",
    errors: [],
    formData: {},
  });
};

const contactPost: RequestHandler[] = [
  ...contactValidator,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).render("contact", {
        title: "Contato",
        sent: false,
        errors: errors.array(),
        formData: req.body,
      });
      return;
    }

    const data = matchedData(req) as ContactData;

    await ContactRequest.create({
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      phone: data.phone || null,
      instrument: instruments[data.instrument],
      message: data.message,
    });

    res.redirect("/contato?sent=1");
  }),
];

export const IndexController = {
  indexGet,
  contactGet,
  contactPost,
};

