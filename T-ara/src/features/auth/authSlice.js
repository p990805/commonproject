// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  token: null,
  userName: '',
  userProfile: '',
  role: '', // role 필드를 추가합니다.
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
      state.role = action.payload.role; // role을 저장합니다.
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.userName = '';
      state.userProfile = '';
      state.role = ''; // 로그아웃 시 role도 초기화합니다.
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
