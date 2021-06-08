import React from 'react';
import WorkHistoryItemSection from './WorkHistoryItemSection';
import { WorkHistoryItemModel, WORK_HISTORY_CLASSNAME } from './utils';

interface WorkHistoryItemProps {
  sections: WorkHistoryItemModel[],
  startDate: string,
  endDate: string,
  title: string,
  number: string,
}

const WorkHistoryItem: React.FC<WorkHistoryItemProps> = ({
  sections,
  startDate,
  endDate,
  title,
  number,
}) => {
  const renderSections = () => {
    return sections.map((section: WorkHistoryItemModel, index: number) => {
      return (
        <WorkHistoryItemSection key={index} title={section.title}>
          {renderItemSectionBullets(section.bullets)}
        </WorkHistoryItemSection>
      );
    })
  }

  const renderItemSectionBullets = (bullets: any[]) => {
    return bullets.map((bullet,index) => {
      return (
        <li key={index} className={`${WORK_HISTORY_CLASSNAME}__item-section-bullet`}>
          <p dangerouslySetInnerHTML={{__html: bullet}}></p>
        </li>
      );
    })
  }

  const createTitle = (title: string) => {
    return {
      __html: `${title}:`
    }
  }

  return (
    <div className={`${WORK_HISTORY_CLASSNAME}__item`}>
        <span className={`${WORK_HISTORY_CLASSNAME}__item-number`}>{number}.</span>
        <h6 className={`${WORK_HISTORY_CLASSNAME}__title-header heading--six`} dangerouslySetInnerHTML={createTitle(title)}></h6>
        <div className={`${WORK_HISTORY_CLASSNAME}__title-dates`}>
          <div> {startDate} </div>
          <div> &ndash; </div>
          <div> {endDate} </div>
        </div>
      {renderSections()}    
    </div>        
  )
}

export default WorkHistoryItem;