const passport = require("passport");
const { User } = require("../db");
const GitHubStrategy = require("passport-github").Strategy;
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/user/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log("profileeee", profile);
      let userNam = profile._json.name.split(" ");
      console.log("profile name:", userNam[1]);
      const user = await User.findOne({
        where: { email: profile._json.login },
      });
      if (user) {
        cb(null, profile);
      } else {
        await User.create({
          email: profile._json.login,
          photo: profile._json.avatar_url,
          first_name: userNam[0],
          last_name: userNam[1],
          professional: false,
        });
        cb(null, profile);
      }
    }
  )
);

// passport.serializeUser((user, cb) => cb(null, user));
// passport.deserializeUser((user, cb) => cb(null, user));
