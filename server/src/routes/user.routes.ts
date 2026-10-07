import express from "express";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { me } from "../controllers/user.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Current user information
 *       401:
 *         description: Authentication required
 */
router.get("/me", authMiddleware, me);

export default router;
