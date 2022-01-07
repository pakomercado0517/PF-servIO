const passport = require("passport");
const { User, Professional, Profession } = require("../db");
const GitHubStrategy = require("passport-github").Strategy;
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
const { Op } = require("sequelize");

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/user/auth/github/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      let userNam = profile._json.name.split(" ");
      console.log("profile name:", userNam[1]);
      const user = await User.findOne({
        where: { user_name: profile._json.login },
      });
      if (user) {
        cb(null, profile);
      } else {
        const user = await User.create({
          user_name: profile._json.login,
          // email: profile._json.login,
          photo: profile._json.avatar_url,
          first_name: userNam[0],
          last_name: userNam[1],
          professional: false,
          professions: [],
        });

        let newProfessional = await Professional.create({
          certification_name: "",
          certification_img: "",
          status: "normal",
        });
        // let professions = profession.toLowerCase();
        // if (typeof profession === "string") {
        //   professions = professions.split(",");
        // }

        // let allProfessions = await Profession.findAll({
        //   where: {
        //     name: {
        //       [Op.in]: Array.isArray(professions) ? professions : [professions],
        //     },
        //   },
        // });
        // await newProfessional.setProfessions(allProfessions);
        await user.setProfessional(newProfessional);

        console.log("usuario creado:", user);
        cb(null, profile);
      }
    }
  )
);

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));
