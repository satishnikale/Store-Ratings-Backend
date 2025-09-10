import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import { JWT_SECRET } from "../config/config.js";

export function isAdmin(req, res, next) {
  const token = req.headers.token;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role === "ADMIN") {
      req.email = decoded.email;
      req.role = decoded.role;
      next();
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        message: "Unauthorized ADMIN",
      });
    }
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      message: "Unauthorized ADMIN",
    });
  }
}
