import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Email {
  id: string;
  subject: string;
  body: string;
  from: string;
  to: string;
  accountEmail: string;
  date: string;
}

export interface IEmailAccount {
  email: string;
  accessToken: string | null;
  refreshToken: string | null;
  connected: boolean;
}

interface EmailState {
  emails: Email[];
  loading: boolean;
}

const initialState: EmailState = {
  emails: [],
  loading: false,
};

const emailSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    setEmails(state, action: PayloadAction<Email[]>) {
      state.emails = action.payload;
    },
    addEmail(state, action: PayloadAction<Email>) {
      state.emails.push(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setEmails, addEmail, setLoading } = emailSlice.actions;
export default emailSlice.reducer;
