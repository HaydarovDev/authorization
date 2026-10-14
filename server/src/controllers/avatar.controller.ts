import type { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "node:path";

import { User } from "../models/user.model.js";
import { toUserDto } from "../utils/userDto.js";

export const updateAvatar = async (req: Request, res: Response) => {
  let filename: string | undefined;

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Avatar image is required",
      });
    }

    filename = req.file.filename;

    const existingUser = await User.findById(req.userId);

    if (!existingUser) {
      const filePath = path.resolve(
        process.cwd(),
        "uploads",
        "avatars",
        filename,
      );

      await fs.unlink(filePath).catch(() => {});

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const oldAvatar = existingUser.avatar;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          avatar: filename,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!user) {
      const filePath = path.resolve(
        process.cwd(),
        "uploads",
        "avatars",
        filename,
      );

      await fs.unlink(filePath).catch(() => {});

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (oldAvatar && oldAvatar !== filename) {
      const oldFilePath = path.resolve(
        process.cwd(),
        "uploads",
        "avatars",
        path.basename(oldAvatar),
      );

      await fs.unlink(oldFilePath).catch((error: NodeJS.ErrnoException) => {
        if (error.code !== "ENOENT") {
          console.error("Old avatar deletion error:", error);
        }
      });
    }

    return res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      data: toUserDto(user),
    });
  } catch (error) {
    console.error("Avatar upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload avatar",
    });
  }
};
