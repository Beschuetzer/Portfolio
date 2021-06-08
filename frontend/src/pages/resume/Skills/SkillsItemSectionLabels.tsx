import React from 'react';
import { SkillsItemLabel, SKILLS_CLASSNAME } from './utils';

interface SkillsItemSectionLabelsProps {
  label: SkillsItemLabel,
}

const SkillsItemSectionLabels: React.FC<SkillsItemSectionLabelsProps> = ({
  label,
}) => {
  return (
    <React.Fragment>
      <div></div>
      <div className={`${SKILLS_CLASSNAME}__labels`}>
        <span className={`${SKILLS_CLASSNAME}__label ${SKILLS_CLASSNAME}__label-left`}>{label?.left}</span>
        <span className={`${SKILLS_CLASSNAME}__label ${SKILLS_CLASSNAME}__label-center`}>{label?.center}</span>
        <span className={`${SKILLS_CLASSNAME}__label ${SKILLS_CLASSNAME}__label-right`}>{label?.right}</span>
      </div>
    </React.Fragment>
  );
}

export default SkillsItemSectionLabels;