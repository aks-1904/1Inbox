import dotenv from "dotenv";
import { Request, Response } from "express";
import { google } from "googleapis";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { getEmails } from "../services/gmailService";

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
    state: token,
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

export const getEmailsOfSingleAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.id;
  const { pageToken, email } = req.query;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Please specify an email",
    });
  }

  const user = await User.findById(userId);
  const account = user?.google?.find((data) => data.email === email);

  if (!account || !account.connected) {
    return res.status(404).json({
      success: false,
      message: "Email not found or not connected.",
    });
  }

  const maxResult = 10;

  try {
    const { emails, nextPageToken } = await getEmails(
      account.accessToken,
      account.refreshToken,
      maxResult,
      user!,
      email as string,
      pageToken as string | undefined
    );

    return res.status(200).json({
      success: true,
      emails,
      nextPageToken,
    });
  } catch (error: any) {
    if (error.response?.data?.error === "invalid_grant") {
      console.log(
        `Invalid grant for user ${email}. Marking for re-authentication.`
      );

      account.connected = false;
      await user?.save();

      return res.status(401).json({
        success: false,
        message:
          "Token has expired or been revoked. Please reconnect your account.",
        reconnectRequired: true,
      });
    }

    console.log("Error fetching emails:", error);
    return res.status(500).json({
      success: false,
      message: "Cannot get emails at this time.",
    });
  }
};
