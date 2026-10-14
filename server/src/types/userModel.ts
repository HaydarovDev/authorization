export interface IUser extends Document {
  name: string;
  lastname: string;
  email: string;
  username: string;
  password: string;

  avatar: string | null;

  isEmailVerified: boolean;
  verificationToken: string | null;
  verificationTokenExpires: Date | null;
}
