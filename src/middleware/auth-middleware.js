import { prismaClient } from "../app/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({
        errors: "Unauthorized",
      })
      .end();
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_TOKEN_KEY);
    const user = await prismaClient.user.findUnique({
      where: {
        username: decoded.username,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({
          errors: "Unauthorized",
        })
        .end();
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        errors: "Invalid token",
      })
      .end();
  }
};
