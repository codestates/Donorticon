import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  createdAt: '',
  status: '',
  img: '',
  report: '',
  textStyle: '',
};

export const gifticonSlice = createSlice({
  name: 'gifticon',
  initialState,
  reducers: {
    setInfo: (_, action) => {
      return action.payload;
    },
  },
});

export const { setInfo } = gifticonSlice.actions;

export default gifticonSlice;
