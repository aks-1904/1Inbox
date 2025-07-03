import mongoose, { Document, Schema } from "mongoose";
import { EmailAccountSchema, IEmailAccount } from "./email.model";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string; // Hashed password by bcrypt
  google?: IEmailAccount[];
  microsoft?: IEmailAccount[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    google: [EmailAccountSchema],
    microsoft: [EmailAccountSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
