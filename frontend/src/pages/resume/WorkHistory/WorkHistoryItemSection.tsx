import React from 'react';
import { WORK_HISTORY_CLASSNAME } from './utils';

interface WorkHistoryItemSectionProps {
  title: string,
  children: any,
}

export const WorkHistoryItemSection: React.FC<WorkHistoryItemSectionProps> = ({
  title,
  children,
}) => {
  return (
    <div aria-label={title} className={`${WORK_HISTORY_CLASSNAME}__item-section`}>
      <ul className={`${WORK_HISTORY_CLASSNAME}__item-section-list`}>
        {children}
      </ul>
    </div>
  );
}