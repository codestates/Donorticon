import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  nextPage: null,
  isSignUpError: [true, true, true, true, false],
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
    setIsSignUpError: (state, actions) => {
      state.isSignUpError[actions.payload.idx] = actions.payload.check;
    },
    initializeIsSignUpError: (state) => {
      state.isSignUpError = initialState.isSignUpError;
    },
  },
});

export const {
  setIsModalOpen,
  setNextPage,
  setIsSignUpError,
  initializeIsSignUpError,
} = utilSlice.actions;
export const utilSelector = (state) => state.util;
