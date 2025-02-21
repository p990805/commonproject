// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  token: null,
  userId: null,         // 추가: userId
  userName: '',
  userProfile: '',
  role: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId; // userId 저장
      state.userName = action.payload.userName;
      state.userProfile = action.payload.userProfile;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
      state.userName = '';
      state.userProfile = '';
      state.role = '';
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
