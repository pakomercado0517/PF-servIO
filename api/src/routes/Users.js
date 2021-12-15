const { Router } = require("express");
const router = Router();
const userFunctions = require("../controllers/index.js");

router.post("/", userFunctions.newUser);
router.post("/login", userFunctions.login);
router.post("/logout", userFunctions.logOut);
router.post("/updateUser/:id", userFunctions.updateProfile);
router.get("/logged", userFunctions.loginTest);
// router.get('/home', userFunctions.redirectLogin, userFunctions.redirectHome)
router.get("/perfil", userFunctions.getUser);
router.get("/all", userFunctions.getAllUsers);
router.get("/common", userFunctions.getAllCommonUsers);
router.get("/professionals", userFunctions.getAllProfessionals);
router.get("/:id", userFunctions.getByUserId);

module.exports = router;