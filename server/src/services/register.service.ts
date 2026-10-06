import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import type { RegisterData } from "../types/registerData.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { toUserDto } from "../utils/userDto.js";

export const registerUser = async (data: RegisterData) => {
  const existingUser = await User.findOne({
    $or: [{ email: data.email }, { username: data.username }],
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  const userDto = toUserDto(user);

  return {
    user: userDto,
    accessToken,
    refreshToken,
  };
};
