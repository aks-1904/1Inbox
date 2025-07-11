import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IEmailAccount } from "./emailSlice";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  google?: IEmailAccount[];
  microsoft?: IEmailAccount[];
  createdAt: string; // or Date if parsing it to Date
  updatedAt: string; // or Date
}

interface UserState {
  user: User | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.loading = false;
    },
    setUserLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setUser, clearUser, setUserLoading } = userSlice.actions;
export default userSlice.reducer;
