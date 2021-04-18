import * as Sentry from "@sentry/node";
import { LogLevel } from "@sentry/types";
import dotenv from "dotenv";
import { JsonWebTokenError } from "jsonwebtoken";
import "reflect-metadata";
import { Action, BadRequestError, createKoaServer } from "routing-controllers";
import { connectToDb } from "./database/connection";
import UserController from "./domains/identity-access/user-controller";
import User from "./domains/identity-access/user";
import { ErrorLoggingMiddleware } from "./utils/error-logging-middleware";
import { verify } from "./utils/jwt";
import LoginController from "./domains/identity-access/login-controller";
import ShiftEntryController from "./domains/shift-entry/shift-entry-controller";
import ShiftModelController from "./domains/shift-model/shift-model-controller";
import SpecController from "./domains/specs/spec-controller";

dotenv.config();

const port = process.env.PORT;

Sentry.init({
  dsn:
    "https://56ce9013692f44d684241992a0d63e01@o573511.ingest.sentry.io/5724040",
  logLevel: LogLevel.Error,
});

const app = createKoaServer({
  cors: true,
  middlewares: [ErrorLoggingMiddleware],
  defaultErrorHandler: false,
  controllers: [
    UserController,
    LoginController,
    ShiftModelController,
    ShiftEntryController,
    SpecController,
  ],
  authorizationChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization;
    if (header && header.startsWith("Bearer ")) {
      const [, token] = header.split(" ");

      // todo better Auth check (is decoded ID a user)
      try {
        const userId = verify(token).data;
        return !!(await User.findOne(userId));
      } catch (e) {
        if (e instanceof JsonWebTokenError) {
          throw new BadRequestError("JWT expired");
        }
      }
    }
    return false;
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization;
    if (header && header.startsWith("Bearer ")) {
      const [, token] = header.split(" ");

      return await User.findOne(verify(token).data);
    }
    return;
  },
});

connectToDb();

app.listen(port, () => console.log(`Listening on port ${port}`));
