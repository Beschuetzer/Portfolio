import { SET_SECTIONS_TO_SKIP_ANIMATION } from '../actions/types';

const sectionsToSkipAnimationReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SECTIONS_TO_SKIP_ANIMATION:
      return action.payload;
    default:
      return state;
  }
}

export default sectionsToSkipAnimationReducer;