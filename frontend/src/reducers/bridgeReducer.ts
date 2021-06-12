import {
  SET_LAST_SECOND_ROW_CARD_NUMBER,
  SET_CLICKED_BRIDGE_INFO_BUTTON_COUNT,
  SET_CURRENT_BRIDGE_SECTION,
  SET_BRIDGE_SECTIONS,
  SET_BRIDGE_CARDS,
  SET_HAS_CLICKED_A_LINK,
  SET_IS_CARD_VIDEO_OPEN,
  SET_CARD_TO_CLOSE,
} from '../actions/types';
import { Action } from '../models';

const INITIAL_STATE = {
  lastSecondRowCardNumber: 5,
  clickedBridgeInfoButtonCount: 0,
  currentBridgeSection: 0,
  bridgeSections: null,
  bridgeCards: null,
  hasClickedALink: null,
  isCardVideoOpen: false,
  cardToClose: null,
}

const bridgeReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case SET_LAST_SECOND_ROW_CARD_NUMBER:
      if (state.lastSecondRowCardNumber !== action.payload)
        return {...state, lastSecondRowCardNumber: action.payload};
      return state;
    case SET_CLICKED_BRIDGE_INFO_BUTTON_COUNT:
      if (state.clickedBridgeInfoButtonCount !== action.payload)
        return {...state, clickedBridgeInfoButtonCount: action.payload};
      return state;
    case SET_CURRENT_BRIDGE_SECTION:
      if (state.currentBridgeSection !== action.payload)
        return {...state, currentBridgeSection: action.payload};
      return state;
    case SET_BRIDGE_SECTIONS:
      if (state.bridgeSections !== action.payload)
        return {...state, bridgeSections: action.payload};
      return state;
    case SET_BRIDGE_CARDS:
      if (state.bridgeCards !== action.payload)
        return {...state, bridgeCards: action.payload};
      return state;
    case SET_HAS_CLICKED_A_LINK:
      if (state.hasClickedALink !== action.payload)
        return {...state, hasClickedALink: action.payload};
      return state;
    case SET_IS_CARD_VIDEO_OPEN:
      if (state.isCardVideoOpen !== action.payload)
        return {...state, isCardVideoOpen: action.payload};
      return state;
    case SET_CARD_TO_CLOSE:
      if (state.cardToClose !== action.payload)
        return {...state, cardToClose: action.payload};
      return state;
    default:
      return state;
  }
}

export default bridgeReducer;