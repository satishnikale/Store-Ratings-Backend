import { Router } from "express";
import { addStore } from "../controllers/store.js";
import { isAdmin } from "../middleware/adminAuth.js";

const adminRoutes = Router();

adminRoutes.route("/add-store").post(isAdmin, addStore);

export default adminRoutes;
