
import {combineReducers} from "redux";
import resumeReducer from './resumeReducer';
import bridgeReducer from './bridgeReducer';
import soundsReducer from "./soundsReducer";
import generalReducer from "./generalReducer";

export type RootState = ReturnType<typeof rootReducer>;
const rootReducer =  combineReducers({
    general: generalReducer,
    resume: resumeReducer,    
    sounds: soundsReducer,
    bridge: bridgeReducer,
});

export default rootReducer;


    
