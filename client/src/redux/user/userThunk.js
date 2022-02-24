import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setToken } from '../utils/auth';

export const signInGiver = createAsyncThunk(
  '/signin/giver',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post('/signin/giver', payload);
      const data = response.data;
      if (response.status === 200) {
        setToken(data.accessToken);
        return data.info;
      } else {
        return rejectWithValue(data);
      }
    } catch (e) {
      console.log(e.response.data);
    }
  },
);

export const signInHelper = createAsyncThunk(
  '/signin/helper',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post('/signin/helper', payload);
      const data = response.data;
      if (response.status === 200) {
        setToken(data.accessToken);
        return data.info;
      } else {
        return rejectWithValue(data);
      }
    } catch (e) {
      console.log(e.response.data);
    }
  },
);