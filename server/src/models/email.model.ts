import mongoose, { Schema } from "mongoose";

export interface IEmailAccount {
  email: string;
  accessToken: string;
  refreshToken: string;
  connected: boolean;
}

export const EmailAccountSchema = new Schema<IEmailAccount>(
  {
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
  { _id: false }
);
