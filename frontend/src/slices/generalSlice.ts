import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type GeneralSliceState = {
  selectedSkill: string;
}

export const generalSliceInitialState: GeneralSliceState = {
  selectedSkill: "",
};

export const generalSlice = createSlice({
  name: 'general',
  initialState: generalSliceInitialState,
  reducers: {
    setSelectedSkill: (state, action) => {
      state.selectedSkill = action.payload
    }
  },
 });

//#region Selectors
//#endregion

export const {
  setSelectedSkill
} = generalSlice.actions;

export const selectedSkillSelector = (state: RootState) => state[generalSlice.name].selectedSkill;