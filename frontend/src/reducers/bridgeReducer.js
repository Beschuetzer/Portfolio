import {
  SET_LAST_SECOND_ROW_CARD_NUMBER,
  SET_CLICKED_BRIDGE_INFO_BUTTON_COUNT,
  SET_CURRENT_BRIDGE_SECTION,
  SET_BRIDGE_SECTIONS,
  SET_BRIDGE_CARDS,
  SET_HAS_CLICKED_A_LINK,
} from '../actions/types';

const INITIAL_STATE = {
  lastSecondRowCardNumber: 5,
  clickedBridgeInfoButtonCount: 0,
  currentBridgeSection: 0,
  bridgeSections: null,
  bridgeCards: null,
  hasClickedALink: null,
}

const resumeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LAST_SECOND_ROW_CARD_NUMBER:
      return {...state, lastSecondRowCardNumber: action.payload};
    case SET_CLICKED_BRIDGE_INFO_BUTTON_COUNT:
      return {...state, clickedBridgeInfoButtonCount: action.payload};
    case SET_CURRENT_BRIDGE_SECTION:
      return {...state, currentBridgeSection: action.payload};
    case SET_BRIDGE_SECTIONS:
      return {...state, bridgeSections: action.payload};
    case SET_BRIDGE_CARDS:
      return {...state, bridgeCards: action.payload};
    case SET_HAS_CLICKED_A_LINK:
      console.log('has clicked------------------------------------------------');
      return {...state, hasClickedALink: action.payload};
    default:
      return state;
  }
}

export default resumeReducer;