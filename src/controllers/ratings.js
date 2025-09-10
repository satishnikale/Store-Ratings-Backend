import { db } from "../config/prismaClient.js";

export const createRating = async (req, res) => {
  try {
    const { rate, userId, storeId } = req.body;

    if (!rate || !userId || !storeId) {
      return res.status(400).json({
        success: false,
        message: "Please provide rate, userId and storeId",
      });
    }

    // Validate range
    if (rate < 1 || rate > 5) {
      return res.status(400).json({
        success: false,
        message: "Rate must be between 1 and 5",
      });
    }

    const rating = await db.rating.create({
      data: {
        value: rate,
        user: { connect: { id: userId } },
        store: { connect: { id: storeId } },
      },
    });

    return res.status(201).json({
      success: true,
      data: rating,
    });
  } catch (error) {
    if (error.code === "P2002") {
      // Prisma unique constraint violation (userId + storeId)
      return res.status(400).json({
        success: false,
        message: "You have already rated this store",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error creating rating",
      error: error.message,
    });
  }
};


export const getStoreRatings = async (req, res) => {
  try {
    const { storeId } = req.body;

    if (!storeId) {
      return res.status(400).json({
        success: false,
        message: "Please provide storeId",
      });
    }

    const ratings = await db.rating.findMany({
      where: { storeId },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    const averageRating =
      ratings.reduce((acc, curr) => acc + curr.value, 0) / ratings.length || 0;

    return res.status(200).json({
      success: true,
      data: {
        averageRating,
        totalRatings: ratings.length,
        ratings,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching ratings",
      error: error.message,
    });
  }
};

