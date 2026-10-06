import type { UserDto } from "../types/userDto.js";
import type { IUser } from "../types/userModel.js";

export const toUserDto = (
  user: IUser & { _id: { toString(): string } },
): UserDto => {
  return {
    id: user._id.toString(),
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    username: user.username,
  };
};
