import { 
  SET_IS_ANIMATING,
  GET_REPOSITORIES,
  SET_IS_MOBILE,
  SET_PREVIOUS_URL,
  SET_SCROLL_PERCENT,
  SET_VIEW_PORT_WIDTH,
  SET_HEADER_HEIGHT,
} from '../actions/types';
import { Action } from '../models';

const INITIAL_STATE = {
  isMobile: null,
  viewPortWidth: null,
  isAnimating: false,
  repos: [],
  previousUrl: null,
  scrollPercent: "0%",
  headerHeight: null,
}

const generalReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case SET_IS_MOBILE:
      return {...state, isMobile: action.payload.isMobile, viewPortWidth: action.payload.viewPortWidth};  
    case SET_VIEW_PORT_WIDTH:
      return {...state, viewPortWidth: action.payload}
    case SET_IS_ANIMATING:
      return {...state, isAnimating: action.payload};  
    case GET_REPOSITORIES:
      return {...state, repos: action.payload};  
    case SET_PREVIOUS_URL:
      return {...state, previousUrl: action.payload};  
    case SET_SCROLL_PERCENT:
      return {...state, scrollPercent: action.payload}; 
    case SET_HEADER_HEIGHT:
      return {...state, headerHeight: action.payload};
    default:
      return state;
  }
}

export default generalReducer;