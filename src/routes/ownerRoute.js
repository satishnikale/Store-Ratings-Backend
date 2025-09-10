import { Router } from "express";
import { addStore } from "../controllers/store.js";
import { isOwner } from "../middleware/ownerAuth.js";

const ownerRoutes = Router();

ownerRoutes.route("/add-store").post(isOwner, addStore);

export default ownerRoutes;
