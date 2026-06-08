import passport from "passport";
import { User } from "../models/index.js";
import { localStrategy } from "./local-strategy.js";

passport.use("local", localStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userID: number, done) => {
  try {
    const user = await User.findByPk(userID);

    done(null, user ? user.get({ plain: true }) : false);
  } catch (err) {
    done(err);
  }
});

