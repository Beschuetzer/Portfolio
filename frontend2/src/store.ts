import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { bridgeSlice } from './slices/bridgeSlice';
import { generalSlice } from './slices/generalSlice';
import { resumeSlice } from './slices/resumeSlice';
import { soundsSlice } from './slices/soundsSlice';

export const store = configureStore({
  reducer: {
    [generalSlice.name]: generalSlice.reducer,
    [bridgeSlice.name]: bridgeSlice.reducer,
    [resumeSlice.name]: resumeSlice.reducer,
    [soundsSlice.name]: soundsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
