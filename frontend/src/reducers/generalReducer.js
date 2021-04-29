import { 
  SET_IS_ANIMATING,
  GET_REPOSITORIES,
  SET_IS_MOBILE,
  SET_PREVIOUS_URL,
  SET_SCROLL_PERCENT,
  SET_VIEW_PORT_WIDTH,
  SET_HAS_CLICKED_BRIDGE_INFO_BUTTON,
  SET_CURRENT_BRIDGE_SECTION,
  SET_BRIDGE_SECTIONS,
} from '../actions/types';

const INITIAL_STATE = {
  isMobile: null,
  viewPortWidth: null,
  isAnimating: false,
  repos: [],
  previousUrl: null,
  scrollPercent: "0%",
  hasClickedBridgeInfoButton: false,
  currentBridgeSection: 0,
  bridgeSections: null,
}

const generalReducer = (state = INITIAL_STATE, action) => {
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
    case SET_HAS_CLICKED_BRIDGE_INFO_BUTTON:
      return {...state, hasClickedBridgeInfoButton: action.payload};
    case SET_CURRENT_BRIDGE_SECTION:
      return {...state, currentBridgeSection: action.payload};
    case SET_BRIDGE_SECTIONS:
      return {...state, bridgeSections: action.payload};
    default:
      return state;
  }
}

export default generalReducer;