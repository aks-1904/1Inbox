import { google } from "googleapis";
import { IUser } from "../models/user.model";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

export const getGmailClient = (
  accessToken: string,
  refreshToken: string,
  email: string,
  user: IUser
) => {
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  oauth2Client.on("tokens", (tokens) => {
    const account = user.google?.find((data) => data.email === email);

    if (!account) return;

    let updated = false;

    if (tokens.refresh_token && tokens.refresh_token !== account.refreshToken) {
      account.refreshToken = tokens.refresh_token;
      updated = true;
    }

    if (tokens.access_token && tokens.access_token !== account.accessToken) {
      account.accessToken = tokens.access_token;
      updated = true;
    }

    if (updated) {
      user
        .save()
        .catch((err) => console.error("Failed to update tokens in DB:", err));
    }
  });

  return google.gmail({ version: "v1", auth: oauth2Client });
};

export async function getEmails(
  accessToken: string,
  refreshToken: string,
  maxResults = 10,
  user: IUser,
  email: string,
  pageToken?: string
): Promise<{
  emails: {
    id: string;
    subject: string;
    from: string;
    snippet: string;
    date: number;
  }[];
  nextPageToken?: string;
}> {
  const gmail = getGmailClient(accessToken, refreshToken, email, user);

  const res = await gmail.users.messages.list({
    userId: "me",
    maxResults,
    q: "", // You can filter if needed
    pageToken,
  });

  const messages = res.data.messages ?? [];
  const nextPageToken = res.data.nextPageToken!;

  const emailData = await Promise.all(
    messages.map(async (msg) => {
      const detail = await gmail.users.messages.get({
        userId: "me",
        id: msg.id!,
        format: "metadata",
        metadataHeaders: ["Subject", "From", "Date"],
      });

      const headers = detail.data.payload?.headers ?? [];
      const subject = headers.find((h) => h.name === "Subject")?.value ?? "";
      const from = headers.find((h) => h.name === "From")?.value ?? "";
      const dateStr = headers.find((h) => h.name === "Date")?.value ?? "";
      const snippet = detail.data.snippet ?? "";

      const date = new Date(dateStr).getTime(); // Convert to timestamp

      return {
        id: msg.id!,
        subject,
        from,
        snippet,
        date,
      };
    })
  );

  return { emails: emailData, nextPageToken };
}
