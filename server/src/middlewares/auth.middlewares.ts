import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { AccessTokenPayload } from "../types/accessTokenPayload.js";
import "dotenv/config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    if (!accessTokenSecret) {
      return res.status(500).json({
        success: false,
        message: "Access token secret is not configured",
      });
    }

    const decoded = jwt.verify(
      accessToken,
      accessTokenSecret,
    ) as AccessTokenPayload;

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};
