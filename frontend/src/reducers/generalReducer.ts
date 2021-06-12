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
      if (state.isMobile !== action.payload) return {...state, isMobile: action.payload.isMobile, viewPortWidth: action.payload.viewPortWidth}; 
      return state;
    case SET_VIEW_PORT_WIDTH:
      if (state.viewPortWidth !== action.payload) return {...state, viewPortWidth: action.payload}
      return state;
    case SET_IS_ANIMATING:
      if (state.isAnimating !== action.payload) return {...state, isAnimating: action.payload};  
      return state;
    case GET_REPOSITORIES:
      if (state.repos !== action.payload) return {...state, repos: action.payload};  
      return state;
    case SET_PREVIOUS_URL:
      if (state.previousUrl !== action.payload) return {...state, previousUrl: action.payload};  
      return state;
    case SET_SCROLL_PERCENT:
      if (state.scrollPercent !== action.payload) return {...state, scrollPercent: action.payload}; 
      return state;
    case SET_HEADER_HEIGHT:
      if (state.headerHeight !== action.payload) return {...state, headerHeight: action.payload};
      return state;
    default:
      return state;
  }
}

export default generalReducer;