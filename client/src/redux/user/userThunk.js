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
      console.log(e.response);
    }
  },
);

export const signInGiverGuest = createAsyncThunk(
  'signin/guest/giver',
  async () => {
    try {
      const response = await axios.post('/signin/guest/giver');
      const data = response.data;
      if (response.status === 200) {
        setToken(data.accessToken);
        return data;
      }
    } catch (e) {
      console.log(e.response);
    }
  },
);

export const signInHelperGuest = createAsyncThunk(
  'signin/guest/helper',
  async () => {
    try {
      const response = await axios.post('/signin/guest/helper');
      const data = response.data;
      if (response.status === 200) {
        setToken(data.accessToken);
        return data;
      }
    } catch (e) {
      console.log(e.response);
    }
  },
);

export const signUpGiver = createAsyncThunk(
  '/signup/giver',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post('/signup/giver', payload);
      if (response.status === 201) {
        return response.data.id;
      }
    } catch (e) {
      return rejectWithValue(e.response);
    }
  },
);

export const signUpHelper = createAsyncThunk(
  '/signup/helper',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post('/signup/helper', payload);
      console.log(response.data.id);
      if (response.status === 201) {
        return response.data.id;
      }
    } catch (e) {
      return rejectWithValue(e.response);
    }
  },
);

export const verifyUser = createAsyncThunk(
  '/verification',
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await axios.get('/verification', {
        headers: { ...payload },
      });
      if (response.status === 200) {
        return payload;
      }
    } catch (e) {
      console.log(e.response);
    }
  },
);

export const updateVerification = createAsyncThunk(
  '/verification',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.put('/verification', {
        headers: { ...payload },
      });
      if (response.status === 200) {
        return response.data.verification;
      }
    } catch (e) {
      console.log(e.response);
    }
  },
);
