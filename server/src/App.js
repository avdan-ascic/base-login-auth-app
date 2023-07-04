import express from "express";
import compress from "compression";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";

import userRoutes from "./routes/user.routes";
import "./passport";
import config from "./config/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compress());
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(
  session({
    secret: config.sessionSecret,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 10 * 60 * 1000,
    },
  })
);
app.use(passport.session());

app.use("/", userRoutes);

export default app;
