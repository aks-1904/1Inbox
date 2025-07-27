import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IEmailAccount {
  email: string;
  connected: boolean;
}

export interface Email {
  id: string;
  subject: string;
  snippet: string;
  from: string;
  to: string;
  date: number;
  body: string | null;
}

type Provider = "google" | "microsoft";

interface AccountEmailData {
  emails: Email[];
  nextPageToken?: string;
}

interface EmailState {
  emails: {
    google: Record<string, AccountEmailData>;
    microsoft: Record<string, AccountEmailData>;
  };
  loading: boolean;
}

const initialState: EmailState = {
  emails: {
    google: {},
    microsoft: {},
  },
  loading: false,
};

const emailSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    setEmails(
      state,
      action: PayloadAction<{
        provider: Provider;
        account: string;
        emails: Omit<Email, "body">[];
        nextPageToken?: string;
      }>
    ) {
      const { provider, account, emails, nextPageToken } = action.payload;

      const existingData = state.emails[provider][account];

      const mergedEmails = existingData
        ? [...existingData.emails, ...emails.map((e) => ({ ...e, body: null }))]
        : [...emails.map((e) => ({ ...e, body: null }))];

      const uniqueEmails = Array.from(
        new Map(mergedEmails.map((email) => [email.id, email])).values()
      );

      state.emails[provider][account] = {
        emails: uniqueEmails,
        ...(nextPageToken ? { nextPageToken } : {}),
      };
    },

    addEmail(
      state,
      action: PayloadAction<{
        provider: Provider;
        account: string;
        email: Omit<Email, "body">;
      }>
    ) {
      const { provider, account, email } = action.payload;

      if (!state.emails[provider][account]) {
        state.emails[provider][account] = {
          emails: [],
        };
      }

      state.emails[provider][account].emails.push({
        ...email,
        body: null,
      });
    },

    setEmailBody(
      state,
      action: PayloadAction<{
        provider: Provider;
        account: string;
        emailId: string;
        body: string;
      }>
    ) {
      const { provider, account, emailId, body } = action.payload;

      const emailData = state.emails[provider][account];
      if (emailData) {
        const email = emailData.emails.find((e) => e.id === emailId);
        if (email) {
          email.body = body;
        }
      }
    },

    setNextPageToken(
      state,
      action: PayloadAction<{
        provider: Provider;
        account: string;
        nextPageToken: string;
      }>
    ) {
      const { provider, account, nextPageToken } = action.payload;

      if (!state.emails[provider][account]) {
        state.emails[provider][account] = {
          emails: [],
        };
      }

      state.emails[provider][account].nextPageToken = nextPageToken;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    resetEmails() {
      return initialState;
    },
  },
});

export const {
  setEmails,
  addEmail,
  setEmailBody,
  setNextPageToken,
  setLoading,
  resetEmails,
} = emailSlice.actions;

export default emailSlice.reducer;
