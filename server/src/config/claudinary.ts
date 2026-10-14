import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import type { Request } from "express";

const uploadDir = path.resolve(process.cwd(), "uploads", "avatars");

fs.mkdirSync(uploadDir, { recursive: true });

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export const uploadAvatar = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, uploadDir);
    },

    filename: (_req, file, callback) => {
      const extension = path.extname(file.originalname).toLowerCase();
      const filename = `${crypto.randomUUID()}${extension}`;

      callback(null, filename);
    },
  }),

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },

  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback,
  ) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return callback(
        new Error("Only JPEG, PNG, WEBP, and GIF images are allowed"),
      );
    }

    callback(null, true);
  },
});
