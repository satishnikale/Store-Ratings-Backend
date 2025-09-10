import { Router } from "express";
import { createRating, getStoreRatings } from "../controllers/ratings.js";
import { userMiddleware } from "../middleware/userAuth.js";

const ratingRoutes = Router();

ratingRoutes.route("/add-rating").post(userMiddleware, createRating);
ratingRoutes.route("/get-ratings").get(userMiddleware, getStoreRatings);

export default ratingRoutes;
