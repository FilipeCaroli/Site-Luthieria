import type { RequestHandler } from "express";
import { objectMap } from "../lib/object.js";
import { isNumeric } from "../lib/string.js";

export const parametersToIntMiddleware: RequestHandler = (req, _res, next) => {
  req.params = objectMap(req.params, (value) => {
    if (isNumeric(value)) {
      return Number.parseInt(value, 10);
    }

    return value;
  }) as unknown as typeof req.params;

  next();
};
