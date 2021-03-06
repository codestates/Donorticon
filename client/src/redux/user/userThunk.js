import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setToken } from '../utils/auth';

export const signInGiver = createAsyncThunk(
  '/signin/giver',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post('/signin/giver', payload, {});
      const data = response.data;
      if (response.status === 200) {
        setToken(data.accessToken);
        return data.info;
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const signInHelper = createAsyncThunk(
  '/signin/helper',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post('/signin/helper', payload, {});
      const data = response.data;
      if (response.status === 200) {
        setToken(data.accessToken);
        return data.info;
      } else {
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const signInGiverGuest = createAsyncThunk(
  'signin/guest/giver',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('/signin/guest/giver', null, {});
      const data = response.data;
      if (response.status === 200) {
        setToken(data.accessToken);
        return data;
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const signInHelperGuest = createAsyncThunk(
  'signin/guest/helper',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('/signin/guest/helper', null, {});
      const data = response.data;
      if (response.status === 200) {
        setToken(data.accessToken);
        return data;
      }
    } catch (e) {
      return rejectWithValue(e);
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
      return rejectWithValue(e);
    }
  },
);

export const signUpHelper = createAsyncThunk(
  '/signup/helper',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post('/signup/helper', payload);
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
    try {
      const response = await axios.get('/verification', {
        headers: { ...payload },
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return rejectWithValue(e);
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
      return rejectWithValue(e);
    }
  },
);
