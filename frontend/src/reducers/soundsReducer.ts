import {
  SET_SOUNDS,
} from '../actions/types';
import { Action } from '../models';

const soundsReducer = (state = {}, action: Action) => {
  switch(action.type) {
    case SET_SOUNDS:
      return action.payload;
    default:
      return state;
  }
}

export default soundsReducer;