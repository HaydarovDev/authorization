import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/token.js";

interface RefreshTokenPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

export const refresh = (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token is missing. Please login again.",
    });
  }

  try {
    const secret = process.env.REFRESH_TOKEN_SECRET;

    if (!secret) {
      throw new Error("REFRESH_TOKEN_SECRET is not configured");
    }

    const decoded = jwt.verify(refreshToken, secret) as RefreshTokenPayload;

    if (typeof decoded.userId !== "string" || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token payload",
      });
    }

    const newAccessToken = generateAccessToken(decoded.userId);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token. Please login again.",
      });
    }

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Refresh token expired. Please login again.",
      });
    }

    console.error("Refresh token error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to refresh access token",
    });
  }
};
