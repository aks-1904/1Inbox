import { Schema } from "mongoose";

export interface IEmailAccount {
  provider: "google" | "microsoft";
  email: string;
  accessToken: string;
  refreshToken: string;
  connected: boolean;
}

export const EmailAccountSchema = new Schema<IEmailAccount>(
  {
    provider: {
      type: String,
      enum: ["google", "microsoft"],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    connected: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false, timestamps: true }
);
