import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './features/home/homeSlice';

const store = configureStore({
  reducer: {
    home: homeSlice,
  },
});

export default store;
