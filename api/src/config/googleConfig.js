const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../db");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

// registro de usuario

passport.use(
  "sign-in-google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/user/auth/google/signUp",
      // callbackURL: "http://localhost:3000/login",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.findOne({
        where: { email: profile._json.email },
      });
      if (user) {
        cb(null, false);
      } else {
        await User.create({
          first_name: profile._json.given_name,
          last_name: profile._json.family_name,
          photo: profile._json.picture,
          email: profile._json.email,
          verified: profile._json.email_verified,
          professional: false,
        });
        cb(null, profile);
      }
    }
  )
);

// login

passport.use(
  "sign-up-google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/user/auth/google/login",
      // callbackURL: "http://localhost:3000/login",
    },
    async function (accessToken, refreshToken, profile, cb) {
      // console.log("accesToken:", accessToken);
      const user = await User.findOne({
        where: { email: profile._json.email },
      });
      if (!user) {
        cb(null, false);
      }
      cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));
