import dotenv from "dotenv";
import { Request, Response } from "express";
import { google } from "googleapis";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

dotenv.config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

export const connectGoogle = async (
  req: Request,
  res: Response
): Promise<any> => {
  const token = req.query.token as string;

  if (!token) {
    return res.status(400).send("Missing token");
  }

  const scopes = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
    state: token, // your signed JWT from frontend
  });

  return res.redirect(url);
};

export const googleOAuthCallback = async (
  req: Request,
  res: Response
): Promise<any> => {
  const code = req.query.code as string;
  const token = req.query.state as string;

  if (!code || !token) {
    return res.redirect(`${process.env.FRONTEND_URL}/inbox?error=missing_data`);
  }

  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as { id: string };
    const userId = decoded.id;

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get Gmail profile
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const profile = await gmail.users.getProfile({ userId: "me" });

    const googleEmail = profile.data.emailAddress;
    if (!googleEmail || !tokens.access_token || !tokens.refresh_token) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/inbox?error=incomplete_google_data`
      );
    }

    // Get user from DB
    const user = await User.findById(userId);
    if (!user) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/inbox?error=user_not_found`
      );
    }

    // Check if account already linked
    const existingAccount = user!.google!.find(
      (acc) => acc.email === googleEmail
    );

    if (existingAccount) {
      // Update existing token values
      existingAccount.accessToken = tokens.access_token;
      existingAccount.refreshToken = tokens.refresh_token;
      existingAccount.connected = true;
    } else {
      // Push new account object
      user!.google!.push({
        provider: "google",
        email: googleEmail,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        connected: true,
      });
    }

    await user.save();

    return res.redirect(`${process.env.FRONTEND_URL}/inbox`);
  } catch (error) {
    console.error("OAuth callback error:", error);
    return res.redirect(`${process.env.FRONTEND_URL}/inbox?error=oauth_failed`);
  }
};
