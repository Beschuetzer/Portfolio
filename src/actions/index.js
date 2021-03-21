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
    
export const getRespositories = async (dispatch, getStore) => {
  const response = await github.get('/repositories');
  debugger;

  dispatch({
    type: GET_REPOSITORIES,
    payload: response.data,
  })
}