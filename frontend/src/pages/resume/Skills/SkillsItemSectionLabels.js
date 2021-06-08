import React from 'react';
import { SKILLS_CLASSNAME } from './utils';

class SkillsItemSectionLabels extends React.Component {
  render() {
    const { labels } = this.props;
    return (
      <React.Fragment>
        <div></div>
        <div className={`${SKILLS_CLASSNAME}__labels`}>
          <span className={`${SKILLS_CLASSNAME}__label ${SKILLS_CLASSNAME}__label-left`}>{labels?.left}</span>
          <span className={`${SKILLS_CLASSNAME}__label ${SKILLS_CLASSNAME}__label-center`}>{labels?.center}</span>
          <span className={`${SKILLS_CLASSNAME}__label ${SKILLS_CLASSNAME}__label-right`}>{labels?.right}</span>
        </div>
      </React.Fragment>
    );
  }
}

export default SkillsItemSectionLabels;