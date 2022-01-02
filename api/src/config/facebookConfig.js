const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const { FACEBOOK_CLIENT_ID, FACEBBOK_CLIENT_SECRET } = process.env;
const { User } = require("../db");

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBBOK_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/user/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log("faceboook picture:", profile._json.picture.data.url);
      const profile_name = profile._json.name.split(" ");
      const user = await User.findOne({
        where: { email: profile._json.email },
      });
      if (user) {
        console.log("usuario ya existe en la base de datos");
        cb(null, profile);
      } else {
        await User.create({
          first_name: profile_name[0],
          last_anme: profile_name[1],
          email: profile._json.email,
          photo: profile._json.picture.data.url,
          professional: false,
        });
        console.log("Usuario creado con exito...");
        cb(null, profile);
      }
    }
  )
);
