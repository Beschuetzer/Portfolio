import { CLICK_SKILL } from '../actions/types';

const clickSkillReducer = (currentSkill = null, action) => {
  switch(action.type) {
    case CLICK_SKILL:
      return action.payload;
    default:
      return currentSkill;
  }
}

export default clickSkillReducer;