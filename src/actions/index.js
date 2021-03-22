import github from '../apis/github';
import {
  GET_REPOSITORIES,
} from './types';
//Example Action Creator
//export const selectSong = (song) => {
//    return {
//        type: "SONG_SELECTED",
//        payload: song,
//    }
//}
    
export const getRepositories = () => async (dispatch, getStore) => {
  const response = await github.get('');

  dispatch({
    type: GET_REPOSITORIES,
    payload: response.data,
  });

  //TODO: figure out how to sort repos by skills used (create a skills obj then reference those skill in a repos obj)
  //created_at, description, name, updated_at
}