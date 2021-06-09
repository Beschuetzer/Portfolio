
import {combineReducers} from "redux";
import resumeReducer from './resumeReducer';
import bridgeReducer from './bridgeReducer';
import soundsReducer from "./soundsReducer";
import generalReducer from "./generalReducer";

export default combineReducers({
    general: generalReducer,
    resume: resumeReducer,    
    sounds: soundsReducer,
    bridge: bridgeReducer,
})



    
