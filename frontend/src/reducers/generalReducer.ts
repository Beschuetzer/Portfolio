import { 
  GET_REPOSITORIES,
  SET_IS_MOBILE,
  SET_PREVIOUS_URL,
  SET_SCROLL_PERCENT,
  SET_VIEW_PORT_WIDTH,
  SET_HEADER_HEIGHT,
  SET_CURRENTLY_VIEWING_CAROUSEL_IMAGE,
  SET_IS_SITE_NAV_MINIMIZED,
} from '../actions/types';
import { Action } from '../models';

const INITIAL_STATE = {
  currentlyViewingImage: '',
  isMobile: null,
  isSiteNavMinimized: false,
  viewPortWidth: null,
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
    case GET_REPOSITORIES:
      return {...state, repos: action.payload};  
    case SET_IS_SITE_NAV_MINIMIZED:
      return {...state, isSiteNavMinimized: action.payload};  
    case SET_PREVIOUS_URL:
      return {...state, previousUrl: action.payload};  
    case SET_SCROLL_PERCENT:
      return {...state, scrollPercent: action.payload}; 
    case SET_HEADER_HEIGHT:
      return {...state, headerHeight: action.payload};
    case SET_CURRENTLY_VIEWING_CAROUSEL_IMAGE:
      return {...state, currentlyViewingImage: action.payload};
    default:
      return state;
  }
}

export default generalReducer;