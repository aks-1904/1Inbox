import axios from "axios";
import { IUser } from "../models/user.model"; // Adjust the path as needed

// Helper function to get a new access token using the refresh token
const getNewAccessToken = async (
  refreshToken: string
): Promise<{ accessToken: string; newRefreshToken?: string }> => {
  const tokenEndpoint = `https://login.microsoftonline.com/common/oauth2/v2.0/token`;

  const params = new URLSearchParams();
  params.append("client_id", process.env.MICROSOFT_CLIENT_ID!);
  params.append("scope", process.env.MICROSOFT_SCOPES!);
  params.append("refresh_token", refreshToken);
  params.append("redirect_uri", process.env.MICROSOFT_REDIRECT_URI!);
  params.append("grant_type", "refresh_token");
  params.append("client_secret", process.env.MICROSOFT_CLIENT_SECRET!);

  try {
    const response = await axios.post(tokenEndpoint, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token, refresh_token } = response.data;
    return { accessToken: access_token, newRefreshToken: refresh_token };
  } catch (error) {
    console.error("Error refreshing Microsoft token:", error);
    throw new Error("Failed to refresh token.");
  }
};

// Main function to get emails from Microsoft Graph
export async function getOutlookEmails(
  accessToken: string,
  refreshToken: string,
  maxResults = 10,
  user: IUser,
  email: string,
  nextPageCursor?: string
): Promise<{
  emails: {
    id: string;
    subject: string;
    from: string;
    snippet: string;
    date: number;
  }[];
  nextPageCursor?: string | null;
}> {
  let currentAccessToken = accessToken;
  let requestUrl = nextPageCursor;

  if (!requestUrl) {
    const baseUrl = `https://graph.microsoft.com/v1.0/me/messages`;
    const queryParams = new URLSearchParams({
      $top: maxResults.toString(),
      $select: "id,subject,from,bodyPreview,receivedDateTime",
      $orderby: "receivedDateTime desc",
    });
    requestUrl = `${baseUrl}?${queryParams.toString()}`;
  }

  try {
    const response = await axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${currentAccessToken}`,
      },
    });

    const messages = response.data.value ?? [];
    const nextLink = response.data["@odata.nextLink"] ?? null;

    const emailData = messages.map((msg: any) => ({
      id: msg.id,
      subject: msg.subject ?? "",
      from: msg.from?.emailAddress?.address ?? "",
      snippet: msg.bodyPreview ?? "",
      date: new Date(msg.receivedDateTime).getTime(),
    }));

    return {
      emails: emailData,
      nextPageCursor: nextLink, // pass full URL directly
    };
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.warn("🔒 Token expired, refreshing...");
      try {
        const { accessToken: newAccessToken, newRefreshToken } =
          await getNewAccessToken(refreshToken);

        const account = user.microsoft?.find((acc) => acc.email === email);
        if (account) {
          account.accessToken = newAccessToken;
          if (newRefreshToken && newRefreshToken !== account.refreshToken) {
            account.refreshToken = newRefreshToken;
          }
          await user.save();
        }

        return await getOutlookEmails(
          newAccessToken,
          newRefreshToken || refreshToken,
          maxResults,
          user,
          email,
          nextPageCursor // reattempt with same page
        );
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
        throw new Error("Could not refresh token.");
      }
    }

    console.error("Graph API error:", error.response?.data || error.message);
    throw error;
  }
}
