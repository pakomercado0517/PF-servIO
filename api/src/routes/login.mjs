import loginFunctions from "../controllers/login.mjs";
import { Router } from "express";

const router = Router();

router.post("/login", loginFunctions.login);

export default router;
