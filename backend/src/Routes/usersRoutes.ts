import express from "express";
import { CreateUser, deleteUser, getAllUsers, UpdateUser } from "../controller/userscontroller/index.js";
import { UserLogin, VerifyToken, VerifyUser, VerifyAdmin } from "#auth/login/index.js";

//Initialize express router
const router = express.Router();

router.post("/newuser", CreateUser);
router.post("/login", UserLogin);
router.delete("/delete/:id", VerifyUser, deleteUser);
router.get("/", VerifyAdmin, getAllUsers);
router.put("/update", UpdateUser);

//test auth endpoints
router.get("/verified", VerifyAdmin)
export default router;

