const { Router } = require("express");
const router = Router();
const userFunctions = require("../controllers/index.js");
const passport = require("passport");

// router.post("/", userFunctions.newUser);
router.post(
  "/",
  passport.authenticate("local-signup", {
    failureRedirect: "/user/register",
    failureFlash: true,
  }),
  (req, res, next) => {
    // res.redirect(`/user/${req.user.id}`);
    res.status(200).json({ "message": "Register completed!" , "result": req.user?.id});
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
    res.send({ message: "Logged", cookies: req.session, userType: req.user.professional? 'Professional': 'Normal User' });
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

module.exports = router;
