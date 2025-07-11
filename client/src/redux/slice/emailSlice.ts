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
        emails: Email[];
        nextPageToken?: string;
      }>
    ) {
      const { provider, account, emails, nextPageToken } = action.payload;
      state.emails[provider][account] = {
        emails,
        nextPageToken,
      };
    },

    addEmail(
      state,
      action: PayloadAction<{
        provider: Provider;
        account: string;
        email: Email;
      }>
    ) {
      const { provider, account, email } = action.payload;

      if (!state.emails[provider][account]) {
        state.emails[provider][account] = {
          emails: [],
        };
      }

      state.emails[provider][account].emails.push(email);
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
  setNextPageToken,
  setLoading,
  resetEmails,
} = emailSlice.actions;

export default emailSlice.reducer;
