import { User } from "../models/user.model.js";
import { toUserDto } from "../utils/userDto.js";

export const getMe = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return toUserDto(user);
};
