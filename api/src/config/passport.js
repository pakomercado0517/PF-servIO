const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User, Professional, Profession } = require("../db");
const { Op } = require("sequelize");
const crypto = require("crypto");


module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    // console.log("userrrrr...", user.id);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = User.findAll({ where: { id: id } });
    if (!id) return done(null, false);
    return done(null, user);
  });

  //signup
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        usernamePassword: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const {
          // userName,
          firstName,
          lastName,
          // email,
          phone,
          city,
          state,
          photo,
          dni,
          // password,
          verified,
          professional,
          // certification_name,
          // certification_img,
          // status,
          profession,
        } = req.body;
        try {
          const user = await User.findOne({
            where: { email },
            include: [{ model: Professional }],
          });
          if (user) {
            return done(null, false, console.log("Usuario ya existe..."));
          }

          if (user) {
            return done(null, false, console.log("Usuario ya existe..."));
          }

          let pass = await bcrypt.hash(password, 10);
          let newUser = await User.create({
            email: email,
            password: pass,
            first_name: firstName,
            last_name: lastName, 
            phone,
            city,
            state,
            photo,
            verified: false,
            professional,
            token:crypto.randomBytes(20).toString("hex"),
            expiracion : Date.now() + 3600000
            // certificacion_name,
            // certification_img,
            // status,
          });

          let newProfessional = await Professional.create({
            certification_name: "",
            certification_img: "",
            status: "normal",
          });
          let professions = profession.toLowerCase();
          console.log("profession: ", profession);
          if (typeof profession === "string") {
            professions = professions.split(",");
          }
          
          

          let allProfessions = await Profession.findAll({
            where: {
              name: {
                [Op.in]: Array.isArray(professions)
                  ? professions
                  : [professions],
              },
            },
          });
          await newProfessional.setProfessions(allProfessions);
          await newUser.setProfessional(newProfessional);

          done(null, newUser);
          // return newUser;
        } catch (error) {
          done(null, error);
        }
      }
    )
  );

  //login
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ where: { email: email } });
          if (!user) return done(null, false);
          let pass = await bcrypt.compare(password, user.password);
          console.log("pass:", pass);
          if (!pass) return done(null, false);
          done(null, user);
        } catch (error) {
          done(null, error);
        }
      }
    )
  );
};
