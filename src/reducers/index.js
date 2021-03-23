
import {combineReducers} from "redux";
import repositoriesReducer from './repositoriesReducer';
import clickSkillReducer from './clickSkillReducer';
import reposToDisplayReducer from './reposToDisplayReducer';

export default combineReducers({
    repos: repositoriesReducer,
    clickedSkill: clickSkillReducer,
    reposToDisplay: reposToDisplayReducer,
})



    
