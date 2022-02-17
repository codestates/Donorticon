import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
};

export const gifticonSlice = createSlice({
  name: 'gifticon',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setId } = gifticonSlice.actions;

export default gifticonSlice;
