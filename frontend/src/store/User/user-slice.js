import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
    success: false,
    isAuthenticating: false,
  },
  reducers: {
    getSignupRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSignupDetails: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.isAuthenticating = true;
    },
    getLoginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getLoginDetails: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.isAuthenticating = true;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCurrentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUpdateUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getcurrentUser(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.isAuthenticating = true;
    },
    getLogoutRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getLogout(state) {
      state.user = null;
      state.loading = false;
      state.isAuthenticating = false;
    },
    getpasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getpasswordSuccess(state, action) {
      state.loading = false;
      state.success = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
