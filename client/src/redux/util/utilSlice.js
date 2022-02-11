import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
};

export const utilSlice = createSlice({
  name: 'util',
  initialState,
  reducers: {
    setIsModalOpen: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const { setIsModalOpen } = utilSlice.actions;
export const utilSelector = (state) => state.util;
