import { createSlice } from "@reduxjs/toolkit";

interface AuthModalState {
  isOpen: boolean;
  view: "login" | "signup" | "resetPassword" | undefined;
}

const initialState: AuthModalState = {
  isOpen: false,
  view: undefined,
};

export const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    onLogin: (state) => {
      state.isOpen = true;
      state.view = "login";
    },
    onSignup: (state) => {
      state.isOpen = true;
      state.view = "signup";
    },
    onResetPassword: (state) => {
      state.isOpen = true;
      state.view = "resetPassword";
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose, onLogin, onResetPassword, onSignup } =
  authModalSlice.actions;

export default authModalSlice.reducer;
