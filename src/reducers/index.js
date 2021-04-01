
import {combineReducers} from "redux";
import repositoriesReducer from './repositoriesReducer';
import isAnimatingReducer from './isAnimatingReducer';
import isMobileReducer from './isMobileReducer';
import resumeReducer from './resumeReducer';

export default combineReducers({
    repos: repositoriesReducer,
    isAnimating: isAnimatingReducer,
    isMobile: isMobileReducer,
    resume: resumeReducer,    
})



    
