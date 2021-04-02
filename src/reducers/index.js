
import {combineReducers} from "redux";
import resumeReducer from './resumeReducer';
import generalReducer from "./generalReducer";

export default combineReducers({
    general: generalReducer,
    resume: resumeReducer,    
})



    
