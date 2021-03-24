
import {combineReducers} from "redux";
import repositoriesReducer from './repositoriesReducer';
import clickSkillReducer from './clickSkillReducer';
import reposToDisplayReducer from './reposToDisplayReducer';
import isAnimatingReducer from './isAnimatingReducer';

export default combineReducers({
    repos: repositoriesReducer,
    clickedSkill: clickSkillReducer,
    reposToDisplay: reposToDisplayReducer,
    isAnimating: isAnimatingReducer,
})



    
