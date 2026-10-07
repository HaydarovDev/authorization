import express from "express";
import { register } from "../controllers/register.controller.js";
import { login } from "../controllers/login.controller.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

export default router;
