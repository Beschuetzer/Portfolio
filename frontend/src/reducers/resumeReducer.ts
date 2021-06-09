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
      return {...state, sectionsToSkipAnimation: action.payload};
    case ADD_REPO:
      if (action.payload?.length === 0) return {...state, reposToDisplay: []};
      const reposToDisplayNew = [...state.reposToDisplay, action.payload];
      return {...state, reposToDisplay: reposToDisplayNew};
    case CLICK_SKILL:
        return {...state, clickedSkill: action.payload};
    default:
      return state;
  }
}

export default resumeReducer;