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
    res.redirect(`/user//${req.user.id}`);
  }
);
router.post(
  "/login",
  passport.authenticate("local-login", {
    failureRedirect: "/user/professionals",
    failureFlash: true,
  }),
  (req, res, next) => {
    res.send(`Has ingreado correctamente!!!`);
  }
);
router.post("/logout", userFunctions.logOut);
router.get("/logged", userFunctions.loginTest);
// router.get('/home', userFunctions.redirectLogin, userFunctions.redirectHome)
router.get("/perfil", userFunctions.getUser);
router.get("/all", userFunctions.getAllUsers);
router.get("/common", userFunctions.getAllCommonUsers);
router.get("/professionals", userFunctions.getAllProfessionals);
router.get("/:id", userFunctions.getByUserId);

module.exports = router;
