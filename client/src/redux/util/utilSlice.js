import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  nextPage: null,
};

export const utilSlice = createSlice({
  name: 'util',
  initialState,
  reducers: {
    setIsModalOpen: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    setNextPage: (state, actions) => {
      state.nextPage = actions.payload;
    },
  },
});

export const { setIsModalOpen, setNextPage } = utilSlice.actions;
export const utilSelector = (state) => state.util;
