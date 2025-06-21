import express from "express";
import { CreateUser } from "../controller/userscontroller/index.js";
import { UserLogin } from "#auth/login/index.js";

//Initialize express router
const router = express.Router();

router.post("/newuser", CreateUser);
router.post("/login", UserLogin);

export default router;

