// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  token: null,
  userName: '',
  userProfile: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userName = action.payload.userName;
      state.userProfile = action.payload.userProfile;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.userName = '';
      state.userProfile = '';
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
