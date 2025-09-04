import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@supabase/supabase-js";

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean | null;
};

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAdmin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setIsAdmin: (state, action: PayloadAction<boolean | null>) => {
      state.isAdmin = action.payload;
    },

    logOut: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isAdmin = null;
    },
  },
});

export const { setUser, logOut, setIsAdmin } = authSlice.actions;
export default authSlice.reducer;
