import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  userId: '',
  createdAt: '',
  status: '',
  img: '',
  report: '',
  textStyle: '',
  point: 0,
};

export const gifticonSlice = createSlice({
  name: 'gifticon',
  initialState,
  reducers: {
    setInfo: (_, action) => {
      return action.payload;
    },
    setPoint: (state, action) => {
      state.point = action.payload;
    },
  },
});

export const { setInfo, setPoint } = gifticonSlice.actions;

export default gifticonSlice;
