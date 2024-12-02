import express, { type Express } from "express";
import { ErrorHandleFunction, NextHandleFunction } from "connect";
import { ZodError } from "zod";
import createHttpError from "http-errors";

const requestLogging: NextHandleFunction = (req, res, next) => {
  res.on("finish", () => {
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  });
  next();
};

const zodErrors: ErrorHandleFunction = (err, req, res, next) => {
  if (err instanceof ZodError) {
    next(createHttpError.BadRequest());
  } else {
    next(err);
  }
};

export function beforeMiddleware(app: Express) {
  const middlewareFunctions = [express.json(), requestLogging];

  middlewareFunctions.forEach((middleware) => app.use(middleware));
}

export function afterMiddleware(app: Express) {
  const middlewareFunctions = [zodErrors];

  middlewareFunctions.forEach((middleware) => app.use(middleware));
}
