import { ADD_REPO } from '../actions/types';

const reposToDisplayReducer = (state = [], action) => {
  switch (action.type) {
      case ADD_REPO:
          if (action.payload?.length === 0) return [];
          return [...state, action.payload];
      default:
          return state;
  }
}

export default reposToDisplayReducer;