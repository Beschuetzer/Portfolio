import React from 'react';
import { PercentBarLabel, PERCENT_BAR_CLASSNAME } from './PercentBar';

interface PercentBarLabelsProps {
  label: PercentBarLabel,
}

export const PercentBarLabels: React.FC<PercentBarLabelsProps> = ({
  label,
}) => {
  return (
    <React.Fragment>
      <div></div>
      <div className={`${PERCENT_BAR_CLASSNAME}__labels`}>
        <span className={`${PERCENT_BAR_CLASSNAME}__label ${PERCENT_BAR_CLASSNAME}__label-left`}>{label?.left}</span>
        <span className={`${PERCENT_BAR_CLASSNAME}__label ${PERCENT_BAR_CLASSNAME}__label-center`}>{label?.center}</span>
        <span className={`${PERCENT_BAR_CLASSNAME}__label ${PERCENT_BAR_CLASSNAME}__label-right`}>{label?.right}</span>
      </div>
    </React.Fragment>
  );
}