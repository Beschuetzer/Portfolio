import {
  SET_SOUNDS,
} from '../actions/types';
import { Action } from '../models';

const DEFAULTS = {
  sounds: [],
}

const soundsReducer = (state = DEFAULTS, action: Action) => {
  switch(action.type) {
    case SET_SOUNDS:
      if (state.sounds.length > 0) return state;
      return action.payload;
    default:
      return state;
  }
}

export default soundsReducer;