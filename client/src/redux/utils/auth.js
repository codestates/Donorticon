import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTokenThunk = createAsyncThunk(
  '/get/auth',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const {
        data: { rest },
      } = await axios.get('/auth', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return rest;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const refreshTokenThunk = createAsyncThunk(
  'put/auth',
  async (_, { rejectWithValue }) => {
    try {
      const expiredToken = localStorage.getItem('token');
      const {
        data: { accessToken: token },
      } = await axios.put('/auth', null, {
        headers: { Authorization: `Bearer ${expiredToken}` },
      });
      setToken(token);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const removeToken = () => {
  localStorage.removeItem('token');
};
export const setToken = (token) => {
  localStorage.setItem('token', token);
};
