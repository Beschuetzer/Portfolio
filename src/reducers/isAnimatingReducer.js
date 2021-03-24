import { SET_IS_ANIMATING } from '../actions/types';

const isAnimatingReducer = (state = false, action) => {
  switch (action.type) {
    case SET_IS_ANIMATING:
      return  action.payload;  
    default:
      return state
  }
}

export default isAnimatingReducer;