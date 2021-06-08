import React from 'react';
import { WORK_HISTORY_CLASSNAME } from './utils';

interface WorkHistoryItemSectionProps {
  title: string,
  children: any,
}

const WorkHistoryItemSection: React.FC<WorkHistoryItemSectionProps> = ({
  title,
  children,
}) => {
  return (
    <div className={`${WORK_HISTORY_CLASSNAME}__item-section`}>
      <h6 className="heading--six">{title}:</h6>
      <ul className={`${WORK_HISTORY_CLASSNAME}__item-section-list`}>
        {children}
      </ul>
    </div>
  );
}

export default WorkHistoryItemSection;