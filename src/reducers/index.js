
import {combineReducers} from "redux";

//Reducers accept an "Action Creator Function" as last arg
//const selectedSongReducer = (selectedSong = null, action) => {
//    if (action.type === "SONG_SELECTED") return action.payload;
//    else return selectedSong;
//}

export default combineReducers({
    deleteMe: () => 5,
})

    
