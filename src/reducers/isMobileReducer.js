import { SET_IS_MOBILE } from '../actions/types';

const isMobileReducer = (state = null, action) => {
  switch (action.type) {
    case SET_IS_MOBILE:
      return action.payload;      
    default:
      return state;
  }
}

export default isMobileReducer;