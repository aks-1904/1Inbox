import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string; // Hashed password by bcrypt
  google?: {
    conected: boolean;
    accessToken?: string; // Token for Gmail API
    refreshToken?: string; // to refresh expired token
  };
  microsoft?: {
    connected: boolean;
    accessToken?: string; // Token for Gmail API
    refreshToken?: string; // to refresh expired token
  };
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
    google: {
      connected: {
        type: Boolean,
        default: false,
      },
      accessToken: String,
      refreshToken: String,
    },
    microsoft: {
      connected: {
        type: Boolean,
        default: false,
      },
      accessToken: String,
      refreshToken: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
