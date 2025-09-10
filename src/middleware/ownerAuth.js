import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export function isOwner(req, res, next) {
  const token = req.headers.token;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role === "STORE_OWNER") {
      req.email = decoded.email;
      req.role = decoded.role;

      next();
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        message: "Unauthorized STORE_OWNER",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: `Something went wrong ${error.message}`,
    });
  }
}
