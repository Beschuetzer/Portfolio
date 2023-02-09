import React from 'react';
import { useAppSelector } from '../../hooks';
import { isMobileSelector } from '../../slices/generalSlice';
import { SKILLS_CLASSNAME } from './utils';

interface SkillsPopupNameProps {
  repo: any,
  href: string,
}

export const SkillsPopupName: React.FC<SkillsPopupNameProps> = ({
  repo,
  href,
}) => {
  const isMobile = useAppSelector(isMobileSelector);
  
  return (
    <div className={`${SKILLS_CLASSNAME}-popup__table-item ${SKILLS_CLASSNAME}-popup__name`}>
      {isMobile ?
        <span className={`${SKILLS_CLASSNAME}-popup__name-title`}>Name:</span>
        :
        null
      }
      <a 
        href={href}  
        className=  {`${SKILLS_CLASSNAME}-popup__link ${SKILLS_CLASSNAME}__title--animating`}
        target="_blank"
        rel="noreferrer"
      >
        <div 
          className={`${SKILLS_CLASSNAME}-popup__link-text`}
        >
          {repo['name']}
        </div>
      </a>
    </div>
  );
}