import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      return state;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      return state;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const userSelector = (state) => state.user;
