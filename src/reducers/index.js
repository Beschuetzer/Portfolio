
import {combineReducers} from "redux";
import repositoriesReducer from './repositoriesReducer';
import clickSkillReducer from './clickSkillReducer';
import reposToDisplayReducer from './reposToDisplayReducer';
import isAnimatingReducer from './isAnimatingReducer';
import isMobileReducer from './isMobileReducer';
import sectionsToSkipAnimationReducer from './sectionsToSkipAnimationReducer';

export default combineReducers({
    repos: repositoriesReducer,
    clickedSkill: clickSkillReducer,
    reposToDisplay: reposToDisplayReducer,
    isAnimating: isAnimatingReducer,
    isMobile: isMobileReducer,
    sectionsToSkipAnimation: sectionsToSkipAnimationReducer,
})



    
