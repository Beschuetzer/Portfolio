import React from 'react';
import WorkHistoryItemSection from './WorkHistoryItemSection';
import { WorkHistoryItemModel, WORK_HISTORY_CLASSNAME } from './utils';

interface WorkHistoryItemProps {
  sections: WorkHistoryItemModel[],
  startDate: string,
  endDate: string,
  title: string,
  number: string,
  id?: string,
}

const WorkHistoryItem: React.FC<WorkHistoryItemProps> = ({
  sections,
  startDate,
  endDate,
  title,
  number,
  id = ""
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

  function getYearFromDate(date: string) {
    const splitDate = date.split('/');
    const dateObj = new Date(date);
    return `20${splitDate[1]}-${dateObj.toLocaleString('en-us', {month: '2-digit'})}`;
  }

  function getDateString(date: string) {
    //date is in format of "mm/yy"
    const splitDate = date.split('/');
    const dateObj = new Date(date);
    return `${dateObj.toLocaleString('en-us', {month: 'long'})} 20${splitDate[1]}`;
  }

  return (
    <section aria-label={`${id} job description`} id={id ? id : undefined} className={`${WORK_HISTORY_CLASSNAME}__item`}>
        <span className={`${WORK_HISTORY_CLASSNAME}__item-number`}>{number}.</span>
        <h6 className={`${WORK_HISTORY_CLASSNAME}__title-header heading--six`} dangerouslySetInnerHTML={createTitle(title)}></h6>
        <div className={`${WORK_HISTORY_CLASSNAME}__title-dates`}>
          <time aria-label="start date" dateTime={`${getYearFromDate(startDate)}`}> {getDateString(startDate)} </time>
          <span>&nbsp;&ndash;&nbsp;</span>
          <time aria-label="end date" dateTime={`${getYearFromDate(endDate)}`}> {getDateString(endDate)} </time>
        </div>
      {renderSections()}    
    </section>        
  )
}

export default WorkHistoryItem;