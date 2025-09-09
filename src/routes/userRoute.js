import { Router } from "express";
import { register, login } from "../controllers/auth.js";
import { userMiddleware } from "../middleware/userAuth.js";
import { changePassword } from "../controllers/auth.js";
const userRoutes = Router();

userRoutes.route("/signup").post(register);
userRoutes.route("/signin").post(login);
userRoutes.route("/change-password").patch(userMiddleware, changePassword);

export default userRoutes;
