import type { Request, Response } from "express";
import { getMe, updateMe } from "../services/user.service.js";

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

export const updateMeController = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const { name, lastname, username } = req.body;

    const user = await updateMe(req.userId, {
      name,
      lastname,
      username,
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Update failed";

    if (message === "User not found") {
      return res.status(404).json({
        success: false,
        message,
      });
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    return res.status(400).json({
      success: false,
      message,
    });
  }
};
