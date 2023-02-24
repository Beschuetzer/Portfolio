import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type ResumeSliceState = {
  clickedSkill: string,
  reposToDisplay: any[],
  sectionsToSkipAnimation: string[],
}

export const resumeSliceInitialState: ResumeSliceState = {
  clickedSkill: '',
  reposToDisplay: [],
  sectionsToSkipAnimation: [],
};

//#region Payloads and other Types
type SkillsToReplaceMap = {
  [key: string]: string,
}
//#endregion

//#region Thunks
//#endregion

export const resumeSlice = createSlice({
  name: 'resume',
  initialState: resumeSliceInitialState,
  reducers: {
    addRepoToReposToDisplay: (state, action: PayloadAction<HTMLHtmlElement[]>) => {
      if (action.payload?.length === 0) {
        state.reposToDisplay = [];
        return;
      }
      state.reposToDisplay = [...state.reposToDisplay, action.payload];
    },
    clickSkill: (state, action: PayloadAction<string>) => {
      const skillsToReplace: SkillsToReplaceMap = {
        'c#': 'csharp',
        'socket.io': 'socketio',
        'dsa': 'data-structures-and-algorithms',
      };
      
      let skill = action.payload?.replace(':', '').toLowerCase();
      if (skillsToReplace?.[skill]) skill = skillsToReplace[skill];
      state.clickedSkill = skill;
    },
    setSectionsToSkipAnimation: (state, action: PayloadAction<string[]>) => {
      state.sectionsToSkipAnimation = action.payload;
    },
  },
});

//#region Selectors
export const clickedSkillSelector = (state: RootState) => state[resumeSlice.name].clickedSkill;
export const reposToDisplaySelector = (state: RootState) => state[resumeSlice.name].reposToDisplay;
export const sectionsToSkipAnimationSelector = (state: RootState) => state[resumeSlice.name].sectionsToSkipAnimation;
//#endregion

export const { 
  addRepoToReposToDisplay,
  clickSkill,
  setSectionsToSkipAnimation,
 } = resumeSlice.actions;