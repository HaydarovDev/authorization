import express from "express";

import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { me } from "../controllers/user.controller.js";
import { updateAvatar } from "../controllers/avatar.controller.js";
import { uploadAvatar } from "../middlewares/upload.middlewares.js";

const router = express.Router();

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get current user profile
 *     description: Returns the authenticated user's profile.
 *     security:
 *       - BearerAuth: []
 *       - AccessTokenCookie: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/User"
 *       401:
 *         description: Authentication required or token invalid
 *       404:
 *         description: User not found
 */
router.get("/me", authMiddleware, me);

/**
 * @swagger
 * /api/users/avatar:
 *   patch:
 *     tags:
 *       - Avatar
 *     summary: Upload or update user avatar
 *     description: Uploads an image and saves its filename to the user's profile.
 *     security:
 *       - BearerAuth: []
 *       - AccessTokenCookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Image file (JPEG, PNG, WEBP, or GIF; max 5 MB)
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *       400:
 *         description: Avatar image is missing or invalid
 *       401:
 *         description: Authentication required or token invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to upload avatar
 */
router.patch(
  "/avatar",
  authMiddleware,
  uploadAvatar.single("avatar"),
  updateAvatar,
);

export default router;
