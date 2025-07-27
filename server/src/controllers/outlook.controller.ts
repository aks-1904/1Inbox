import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import User from "../models/user.model.js"; // Adjust the path as needed
import { getOutlookEmails } from "../services/outlookService";

// Redirects user to Microsoft's consent page
export const connectOutlook = async (
  req: Request,
  res: Response
): Promise<any> => {
  const token = req.query.token as string;

  if (!token) {
    return res.status(400).send("Missing token");
  }

  const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`;
  const params = new URLSearchParams({
    client_id: process.env.MICROSOFT_CLIENT_ID!,
    response_type: "code",
    redirect_uri: process.env.MICROSOFT_REDIRECT_URI!,
    response_mode: "query",
    scope: process.env.MICROSOFT_SCOPES!,
    state: token, // Pass our JWT in the state parameter
  });

  const url = `${authUrl}?${params.toString()}`;
  return res.redirect(url);
};

// Handles the callback from Microsoft after user consent
export const outlookOAuthCallback = async (
  req: Request,
  res: Response
): Promise<any> => {
  const code = req.query.code as string;
  const token = req.query.state as string; // Our JWT from the state parameter

  if (!code || !token) {
    return res.redirect(`${process.env.FRONTEND_URL}/inbox?error=missing_data`);
  }

  try {
    // Verify the JWT to get the user ID
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as { id: string };
    const userId = decoded.id;

    // Exchange authorization code for tokens
    const tokenEndpoint = `https://login.microsoftonline.com/common/oauth2/v2.0/token`;
    const tokenParams = new URLSearchParams();
    tokenParams.append("client_id", process.env.MICROSOFT_CLIENT_ID!);
    tokenParams.append("scope", process.env.MICROSOFT_SCOPES!);
    tokenParams.append("code", code);
    tokenParams.append("redirect_uri", process.env.MICROSOFT_REDIRECT_URI!);
    tokenParams.append("grant_type", "authorization_code");
    tokenParams.append("client_secret", process.env.MICROSOFT_CLIENT_SECRET!);

    const tokenResponse = await axios.post(tokenEndpoint, tokenParams, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const { access_token, refresh_token } = tokenResponse.data;

    if (!access_token || !refresh_token) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/inbox?error=incomplete_microsoft_data`
      );
    }

    // Use the access token to get the user's profile info (email)
    const graphResponse = await axios.get(
      "https://graph.microsoft.com/v1.0/me",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const outlookEmail =
      graphResponse.data.mail || graphResponse.data.userPrincipalName;
    if (!outlookEmail) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/inbox?error=no_email_found`
      );
    }

    // Get user from DB
    const user = await User.findById(userId);
    if (!user) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/inbox?error=user_not_found`
      );
    }

    // Initialize outlook array if it doesn't exist
    if (!user.microsoft) {
      user.microsoft = [];
    }

    // Check if account already linked
    const existingAccount = user.microsoft.find(
      (acc) => acc.email === outlookEmail
    );
    if (existingAccount) {
      existingAccount.accessToken = access_token;
      existingAccount.refreshToken = refresh_token;
      existingAccount.connected = true;
    } else {
      user.microsoft.push({
        email: outlookEmail,
        accessToken: access_token,
        refreshToken: refresh_token,
        connected: true,
      });
    }

    await user.save();

    return res.redirect(`${process.env.FRONTEND_URL}/inbox`);
  } catch (error: any) {
    console.error(
      "Outlook OAuth callback error:",
      error.response?.data || error.message
    );
    return res.redirect(`${process.env.FRONTEND_URL}/inbox?error=oauth_failed`);
  }
};

// Gets emails for a specific connected Outlook account
export const getEmailsOfSingleAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.id; // From your auth middleware
  const { nextPageCursor, email } = req.query;

  const decodednextPageCursor = nextPageCursor
    ? decodeURIComponent(nextPageCursor as string)
    : undefined;

  if (!email) {
    console.warn("⚠️ No email provided in query");
    return res.status(400).json({
      success: false,
      message: "Please specify an email address",
    });
  }

  try {
    const user = await User.findById(userId);

    const account = user?.microsoft?.find((data) => data.email === email);

    if (!account || !account.connected) {
      return res.status(404).json({
        success: false,
        message: "Outlook account not found or not connected",
      });
    }

    const maxResult = 10;

    const { emails, nextPageCursor } = await getOutlookEmails(
      account.accessToken,
      account.refreshToken,
      maxResult,
      user!,
      email as string,
      decodednextPageCursor as string | undefined
    );

    return res.status(200).json({
      success: true,
      emails,
      nextPageCursor,
    });
  } catch (error) {
    console.error("🔥 Error in getEmailsOfSingleAccount:", error);
    return res.status(500).json({
      success: false,
      message: "Cannot get emails at this time.",
    });
  }
};

export const getOutlookEmailBody = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, messageId } = req.query;

  const userId = req.id;
  const user = await User.findById(userId);

  const accessToken = user?.microsoft!.find(
    (data) => data.email === email
  )?.accessToken;

  if (!accessToken || !messageId) {
    return res.status(400).json({
      success: false,
      message: "Missing accessToken or messageId in query",
    });
  }

  try {
    const response = await axios.get(
      `https://graph.microsoft.com/v1.0/me/messages/${messageId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const message = response.data;
    const subject = message.subject || "No Subject";
    const bodyContent = message.body?.content || "";

    return res.status(200).json({
      success: true,
      subject,
      body: bodyContent,
      contentType: message.body?.contentType, // 'html' or 'text'
    });
  } catch (error: any) {
    console.error(
      "Error fetching Outlook message:",
      error.response?.data || error.message
    );
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Outlook message body",
    });
  }
};
