import { Strategy as LocalStrategy } from "passport-local";
import { validPassword } from "../lib/password.js";
import { User } from "../models/index.js";

export const localStrategy = new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        done(null, false, { message: "Invalid username" });
        return;
      }

      const userPassword = user.password;
      const isValid =
        userPassword !== null && (await validPassword(password, userPassword));

      if (isValid) {
        done(null, user.get({ plain: true }));
        return;
      }

      done(null, false, { message: "Invalid password" });
    } catch (err) {
      done(err);
    }
  },
);

