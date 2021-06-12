import { CLICK_SKILL, ADD_REPO, SET_SECTIONS_TO_SKIP_ANIMATION } from '../actions/types';
import { Action } from '../models';

const INITIAL_STATE = {
  clickedSkill: null,
  reposToDisplay: [],
  sectionsToSkipAnimation: [],
}

const resumeReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case SET_SECTIONS_TO_SKIP_ANIMATION:
      if (action.payload.length !== state.sectionsToSkipAnimation.length) return {...state, sectionsToSkipAnimation: action.payload};
      return state;
    case ADD_REPO:
      if (action.payload?.length === 0) return state;
      const reposToDisplayNew = [...state.reposToDisplay, action.payload];
      if (state.reposToDisplay.length !== reposToDisplayNew.length ) return {...state, reposToDisplay: reposToDisplayNew};
      return state;
    case CLICK_SKILL:
      if (action.payload !== state.clickedSkill) return {...state, clickedSkill: action.payload};
      return state;
    default:
      return state;
  }
}

export default resumeReducer;