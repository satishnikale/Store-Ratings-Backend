import httpStatus from "http-status";
import { db } from "../config/prismaClient.js";

export const addStore = async (req, res) => {
  const { name, address, email } = req.body;

  try {
    if (!name || !email || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Simulate adding store to database
    const newStore = await db.store.create({
      data: { name, address, email },
    });
    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Store added successfully",
      storeId: newStore.id,
    });
  } catch (e) {
    res.json({
      success: false,
      message: `Something went wrong ${e.message}`,
    });
  }
};

export const editStore = async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;

  try {
    if (!name || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Simulate updating store in database
    const updatedStore = await db.store.update({
      where: { id: parseInt(id) },
      data: { name, address },
    });
    res.status(httpStatus.OK).json({
      success: true,
      message: "Store updated successfully",
      store: updatedStore,
    });
  } catch (e) {
    res.json({
      success: false,
      message: `Something went wrong ${e.message}`,
    });
  }
};
