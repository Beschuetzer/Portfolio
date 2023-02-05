import {
  SET_LAST_SECOND_ROW_CARD_NUMBER,
  SET_CLICKED_BRIDGE_INFO_BUTTON_COUNT,
  SET_CURRENT_BRIDGE_SECTION,
  SET_BRIDGE_SECTIONS,
  SET_BRIDGE_CARDS,
  SET_HAS_CLICKED_A_LINK,
  SET_IS_CARD_VIDEO_OPEN,
  SET_CARD_TO_CLOSE,
  SET_BRIDGE_FEATURE_SECTION_TITLE,
} from '../actions/types';
import { Action } from '../models';

const INITIAL_STATE = {
  bridgeCards: null,
  bridgeSections: null,
  cardToClose: null,
  clickedBridgeInfoButtonCount: 0,
  currentBridgeSection: 0,
  featureSectionTitle: 'Pick a card any card...',
  hasClickedALink: null,
  isCardVideoOpen: false,
  lastSecondRowCardNumber: 5,
}

const resumeReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case SET_LAST_SECOND_ROW_CARD_NUMBER:
      return {...state, lastSecondRowCardNumber: action.payload};
    case SET_CLICKED_BRIDGE_INFO_BUTTON_COUNT:
      return {...state, clickedBridgeInfoButtonCount: action.payload};
    case SET_CURRENT_BRIDGE_SECTION:
      return {...state, currentBridgeSection: action.payload};
    case SET_BRIDGE_SECTIONS:
      return {...state, bridgeSections: action.payload};
    case SET_BRIDGE_FEATURE_SECTION_TITLE:
      return {...state, featureSectionTitle: action.payload};
    case SET_BRIDGE_CARDS:
      return {...state, bridgeCards: action.payload};
    case SET_HAS_CLICKED_A_LINK:
      return {...state, hasClickedALink: action.payload};
    case SET_IS_CARD_VIDEO_OPEN:
      return {...state, isCardVideoOpen: action.payload};
    case SET_CARD_TO_CLOSE:
      return {...state, cardToClose: action.payload};
    default:
      return state;
  }
}

export default resumeReducer;