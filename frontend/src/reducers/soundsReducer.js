import {
  SET_SOUNDS,
} from '../actions/types';

const soundsReducer = (state = {}, action) => {
  switch(action.type) {
    case SET_SOUNDS:
      return action.payload;
    default:
      return state;
  }
}

export default soundsReducer;