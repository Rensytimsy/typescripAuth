import express from "express";
import { CreateUser, deleteUser, getAllUsers, UpdateUser } from "../controller/userscontroller/index.js";
import { UserLogin } from "#auth/login/index.js";

//Initialize express router
const router = express.Router();

router.post("/newuser", CreateUser);
router.post("/login", UserLogin);
router.delete("/delete/:id", deleteUser);
router.get("/", getAllUsers);
router.put("/update", UpdateUser);
export default router;

