import type { Request, Response } from "express";
import { loginUser } from "../services/auth.service.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await loginUser({
      email,
      password,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user,
        accessToken,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};
