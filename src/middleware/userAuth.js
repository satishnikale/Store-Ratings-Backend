import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export function userMiddleware(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, JWT_SECRET);

  if (decoded) {
    req.email = decoded.email;
    req.role = decoded.role;

    next();
  } else {
    res.status(httpStatus.UNAUTHORIZED).json({
      message: "Unauthorized user",
    });
  }
}
