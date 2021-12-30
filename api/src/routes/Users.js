const { Router } = require("express");
const router = Router();
const userFunctions = require("../controllers/index.js");
const passport = require("passport");
const { User } = require("../db");

require("../config/googleConfig");

let cacheUser = [];

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send("Inicia sesion");
  }
}

// router.post("/", userFunctions.newUser);
router.post(
  "/",
  passport.authenticate("local-signup", {
    // failureRedirect: "/user/register",
    failureFlash: true,
  }),
  (req, res, next) => {
    // res.redirect(`/user/${req.user.id}`);
    res
      .status(200)
      .json({ message: "Register completed!", result: req.user?.id });
    next();
    (req, res) => {
      res.redirect(`/user/${req.user.id}`);
    };
  }
);
router.post(
  "/login",
  passport.authenticate("local-login", {
    // failureRedirect: "/user/login",
    failureFlash: true,
  }),
  (req, res, next) => {
    res.send({
      message: "Logged",
      cookies: req.session,
      userType: req.user.professional ? "Professional" : "Normal User",
      data: req.user,
    });
  }
);

router.get("/getGoogleUser", async (req, res, next) => {
  // res.send(cacheUser);
  if (req.isAuthenticated()) {
    const userResult = await User.findOne({
      where: { email: req.user._json.email },
    });
    res.send({
      message: "Logged",
      cookies: req.session,
      data: userResult,
    });
  } else {
    res.send("Inicia Sesión");
  }
});

router.get(
  "/auth/google/signUp",
  passport.authenticate("sign-in-google", {
    scope: ["email", "profile"],
  }),
  (req, res) => {
    if (req.user) {
      res.cookie(req.session);
      res.redirect("http://localhost:3000/login");
    }
  }
);

router.get(
  "/auth/google/login",
  passport.authenticate("sign-up-google", {
    scope: ["email", "profile"],
  }),
  async (req, res) => {
    cacheUser.pop();
    // console.log("req.user", req.user._json);
    const userResult = await User.findOne({
      where: { email: req.user._json.email },
    });
    if (userResult) {
      cacheUser.push({
        message: "Logged",
        cookies: req.session,
        data: userResult,
      });
      res.redirect("http://localhost:3000/login");
      // await res.json({
      //   message: "Logged",
      //   cookies: req.session,
      //   data: req.user,
      // });
    }
  }
);

router.post("/logout", userFunctions.logOut);

// router.post("/", userFunctions.newUser);
// router.post("/login", userFunctions.login);
// router.post("/logout", userFunctions.logOut);
router.put("/updateUser/:id", userFunctions.updateProfile);
// router.get("/logged", userFunctions.loginTest);
router.get("/logged", userFunctions.loginTestPassport);
// router.get('/home', userFunctions.redirectLogin, userFunctions.redirectHome)
router.get("/perfil", userFunctions.getUser);
router.get("/all", userFunctions.getAllUsers);
router.get("/common", userFunctions.getAllCommonUsers);
router.get("/professionals", userFunctions.getAllProfessionals);
router.get("/:id", userFunctions.getByUserId);
router.delete("/:id", userFunctions.deleteByUserId);
router.post("/reestablecer", userFunctions.enviarToken);
router.get("/reestablecer/:token", userFunctions.validarToken);
router.put("/reestablecer/:token", userFunctions.actualizarPassword);
module.exports = router;
