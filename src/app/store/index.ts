import { configureStore } from '@reduxjs/toolkit';
import { alertReducer } from './slices/alert/alertSlice';

export const store = configureStore({
  reducer: {
    alert: alertReducer
  }
});
