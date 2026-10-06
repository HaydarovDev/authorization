import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  const user = await User.findOne({
    email: data.email,
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken(user._id.toString());

  const refreshToken = generateRefreshToken(user._id.toString());

  const { password: _password, ...userResponse } = user.toObject();

  return {
    user: userResponse,
    accessToken,
    refreshToken,
  };
};
