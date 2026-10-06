import type { Request, Response } from "express";
import { registerUser } from "../services/register.service.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, lastname, email, username, password } = req.body;

    const user = await registerUser({
      name,
      lastname,
      email,
      username,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};
