import { GET_REPOSITORIES } from '../actions/types'

const repositoriesReducer = (repositoriesObj = [], action) => {
  console.log('repositoriesObj =', repositoriesObj);
  console.log('action =', action);
  switch(action.type) {
    //must return a new object/array (reference must be different)
    case GET_REPOSITORIES:
      return [...action.payload];
    default:
      return repositoriesObj;
  }
}
export default repositoriesReducer;