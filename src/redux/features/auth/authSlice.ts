import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@supabase/supabase-js";

export type AuthState = {
  user: User | null;
  isLoading: boolean;
};

const initialState: AuthState = {
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLoading = false;
    },

    logOut: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
