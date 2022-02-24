import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { signInGiver, signInHelper, signUpGiver } from './userThunk';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  user: {
    id: '',
    email: '',
    name: '',
    who: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, _) => {
      state.isLoggedIn = true;
    },
    signOut: (state, _) => {
      state.isLoggedIn = false;
      state.user = initialState.user;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setWho: (state, action) => {
      state.user.who = action.payload;
    },
  },
  extraReducers: {
    [signInGiver.pending]: (state, _) => {
      state.isLoading = true;
    },
    [signInGiver.fulfilled]: (state, { payload }) => {
      state.user.id = payload.id;
      state.user.email = payload.email;
      state.user.name = payload.name;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    [signInGiver.rejected]: (state, _) => {
      state.isLoading = true;
    },
    [signInHelper.pending]: (state, _) => {
      state.isLoading = true;
    },
    [signInHelper.fulfilled]: (state, { payload }) => {
      state.user.id = payload.id;
      state.user.email = payload.email;
      state.user.name = payload.name;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [signInHelper.rejected]: (state, _) => {
      state.isLoading = true;
    },
    [signUpGiver.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.user.id = payload;
    },
  },
});

axios.defaults.baseURL = 'http://localhost:4000';
// axios.defaults.withCredentials = true; // front, back 간 쿠키 공유

// 회원가입

export const { signIn, signOut, setUser, setWho } = userSlice.actions;

export default userSlice;
