import { 
  SET_IS_ANIMATING,
  GET_REPOSITORIES,
  SET_IS_MOBILE,
  SET_SECTIONS_TO_ADD_TO_PAGE_NAV,
} from '../actions/types';

const INITIAL_STATE = {
  isMobile: null,
  isAnimating: false,
  repos: [],
  sectionsToAddToPageNav: [],
}

const generalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_IS_MOBILE:
      return {...state, isMobile: action.payload};  
    case SET_IS_ANIMATING:
      return {...state, isAnimating: action.payload};  
    case GET_REPOSITORIES:
      return {...state, repos: action.payload};  
    case SET_SECTIONS_TO_ADD_TO_PAGE_NAV:
      return {...state, sectionsToAddToPageNav: action.payload};  
    default:
      return state;
  }
}

export default generalReducer;