import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: '',
  password: '',
  who: 'Guest',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => initialState,
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setWho: (state, action) => {
      state.who = action.payload;
    },
  },
});

export const { login, logout, setEmail, setPassword, setWho } =
  userSlice.actions;

export const userSelector = (state) => state.user;
