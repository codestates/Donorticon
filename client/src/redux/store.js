import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { userSlice } from './user/userSlice';
import { utilSlice } from './util/utilSlice';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { giverSlice } from './user/giverSlice';

const reducers = combineReducers({
  user: userSlice.reducer,
  util: utilSlice.reducer,
  giver: giverSlice.reducer,
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
