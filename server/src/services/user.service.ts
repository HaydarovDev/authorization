import { User } from "../models/user.model.js";
import type { UpdateUserData } from "../types/updateUserData.js";
import { toUserDto } from "../utils/userDto.js";

export const getMe = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return toUserDto(user);
};

export const updateMe = async (userId: string, data: UpdateUserData) => {
  const allowedFields: UpdateUserData = {};

  if (data.name !== undefined) {
    allowedFields.name = data.name.trim();
  }

  if (data.lastname !== undefined) {
    allowedFields.lastname = data.lastname.trim();
  }

  if (data.username !== undefined) {
    allowedFields.username = data.username.trim();
  }

  if (Object.keys(allowedFields).length === 0) {
    throw new Error("No valid fields provided for update");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: allowedFields },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!user) {
    throw new Error("User not found");
  }

  return toUserDto(user);
};
