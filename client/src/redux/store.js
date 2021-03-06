import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { userSlice } from './user/userSlice';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { pageSlice } from './page/pageSlice';
import gifticonSlice from './gifticon/gifticonSlice';

const reducers = combineReducers({
  user: userSlice.reducer,
  page: pageSlice.reducer,
  gifticon: gifticonSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;
