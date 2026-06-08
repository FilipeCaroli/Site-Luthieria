import "dotenv/config";
import express, { type ErrorRequestHandler, type RequestHandler } from "express";
import expressSession from "express-session";
import moment from "moment";
import path from "node:path";
import connectSessionSequelize from "connect-session-sequelize";
import passport from "passport";
import { fileURLToPath } from "node:url";
import { sequelize } from "./db/sequelize.js";
import "./models/index.js";
import "./config/passport.js";
import { AdminRouter } from "./routes/admin-router.js";
import { AuthRouter } from "./routes/auth-router.js";
import { IndexRouter } from "./routes/index-router.js";

type AppError = Error & { status?: number };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, "..");

const PORT = process.env.PORT || 3000;
const COOKIE_SECRET = process.env.COOKIE_SECRET ?? "development-secret";
const SequelizeStore = connectSessionSequelize(expressSession.Store);

const app = express();
const assetsPath = path.join(rootPath, "src/public");
const sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: "SessionStore",
});

void sessionStore.sync();

app.set("views", path.join(rootPath, "src/views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.use(
  expressSession({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2,
    },
  }),
);

app.use(passport.session());

const templateLocals: RequestHandler = (req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.moment = moment;
  next();
};

app.use(templateLocals);

// Routes
app.use("/", IndexRouter);
app.use("/auth", AuthRouter);
app.use("/admin", AdminRouter);

// Missing routes forwarder
app.use("*", (_req, _res, next) => {
  const err: AppError = new Error("Página não encontrada");
  err.status = 404;
  next(err);
});

const errorHandler: ErrorRequestHandler = (err: AppError, _req, res, _next) => {
  console.error(err.stack);
  const status = err.status ?? 500;

  res.status(status).render("error", { title: `Error ${status}`, error: err });
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
