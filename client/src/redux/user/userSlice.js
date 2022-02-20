import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoggedIn: false,
  user: {
    email: '',
    name: '',
    id: '',
    who: 0,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    socialSignIn: (state, action) => {
      state.isLoggedIn = true;
    },
    setSocialUser: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state, action) => {
      state.isLoggedIn = false;
      state.user = initialState.user;
    },
    setWho: (state, action) => {
      state.user.who = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(signupGiver.fulfilled, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(signupGiver.rejected, (state, action) => {
        state.isLoggedIn = false;
      }),
});

axios.defaults.baseURL = 'http://localhost:4000';
// axios.defaults.withCredentials = true; // front, back 간 쿠키 공유

// 회원가입
export const signupGiver = createAsyncThunk(
  '/signup/giver',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/signup/giver', data);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const { socialSignIn, setSocialUser, signOut, setWho } =
  userSlice.actions;

export default userSlice;
