import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  limit: 1,
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const { setPage, setLimit } =
  pageSlice.actions;

export const pageSelector = (state) => state.page;
