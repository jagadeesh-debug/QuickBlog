import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name?: string;
  email?: string;
  mobile?: string;
}

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Updated to accept token and user data
    loginSuccess(state, action: PayloadAction<{ token: string, user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    updateUser(state, action: PayloadAction<User>) {
      state.user = { ...state.user, ...action.payload };
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;