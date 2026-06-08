import type { RequestHandler } from "express";
import { ContactRequest } from "../models/index.js";

const requestsGet: RequestHandler = async (_req, res) => {
  const requests = await ContactRequest.findAll({
    order: [["createdAt", "DESC"]],
  });

  res.render("admin/requests", {
    title: "Pedidos",
    requests,
  });
};

export const AdminController = {
  requestsGet,
};

