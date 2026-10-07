import express from "express";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { me } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, me);

export default router;
