import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user_type: 1,
  name: '',
  email: '',
  password: '',
  name: '',
  mobile: '',
  image: null,
  verification: false,
  verify_hash: '',
  back_point: 0,
  grade_id: 0,
};

export const giverSlice = createSlice({
  name: 'giver',
  initialState,
  reducers: {
    setGiverInfo: (state, action) => {
      // state.email = action.payload;
      return { ...state, ...action.payload };
    },
    setStateInitialize: (state) => {
      return initialState;
    },
  },
});

export const { setGiverInfo, setStateInitialize } = giverSlice.actions;

export const giverSelector = (state) => state.giver;
