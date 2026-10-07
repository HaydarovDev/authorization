import type { Request, Response } from "express";
import { getMe } from "../services/user.service.js";

export const me = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const user = await getMe(req.userId);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "User not found",
    });
  }
};
