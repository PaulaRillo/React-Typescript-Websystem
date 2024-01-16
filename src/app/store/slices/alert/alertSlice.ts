import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlert } from 'shared/types/alert';

type InitialState = {
  alert: IAlert | undefined;
};

const initialState: InitialState = {
  alert: undefined
};

const alertSlice = createSlice({
  name: '@alert',
  initialState,
  reducers: {
    newAlert: (state, action: PayloadAction<IAlert>) => {
      state.alert = undefined;
      state.alert = action.payload;
    },
    resetAlert: (state) => {
      state.alert = undefined;
    }
  }
});

export const { newAlert, resetAlert } = alertSlice.actions;
export const alertReducer = alertSlice.reducer;
