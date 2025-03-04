import { createSlice } from '@reduxjs/toolkit';

export type GeneralSliceState = {}

export const generalSliceInitialState: GeneralSliceState = {};

//#region Payloads and other Types
export type SetIsMobilePayload = {
  isMobile: boolean;
  viewPortWidth: number;
}
//#endregion

export const generalSlice = createSlice({
  name: 'general',
  initialState: generalSliceInitialState,
  reducers: {},
 });

//#region Selectors
//#endregion

export const {} = generalSlice.actions;