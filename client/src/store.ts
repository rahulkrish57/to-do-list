import { configureStore } from '@reduxjs/toolkit';
import listReducer from './slices/listSlice';
import loaderReducer from './slices/loaderSlice';

const store = configureStore({
  reducer: {
    list: listReducer,
    loader: loaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
