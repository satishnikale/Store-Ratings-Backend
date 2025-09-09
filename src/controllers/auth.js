import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { db } from "../config/prismaClient.js";
import { JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password, name, address, role } = req.body;

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: { email, password: hashedPassword, name, address, role },
    });
    return res
      .status(httpStatus.CREATED)
      .json({ message: "User created successfully", userId: newUser.id });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match || user.role !== role) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(httpStatus.OK).json({
      message: "Login successful",
      email: user.email,
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }
    // 2. Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Old password is incorrect" });
    }
    // 4. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 5. Update DB
    await db.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return res
      .status(httpStatus.OK)
      .json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
