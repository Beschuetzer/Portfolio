import React from "react";
import { useEffect, useRef, useState } from "react";
import { PercentBarLabels } from "./PercentBarLabels";

export const PERCENT_BAR_CLASSNAME = 'percent-bar'
export const PERCENT_BAR_OUTER_CLASSNAME = `${PERCENT_BAR_CLASSNAME}__outer`;
export const PERCENT_BAR_INNER_CLASSNAME = `${PERCENT_BAR_CLASSNAME}__inner`;
export interface PercentBarLabel {
  left: string;
  center: string;
  right: string;
}

export interface PercentBarProps {
  label: PercentBarLabel;
  percent: string | number;
  value?: string | number | undefined;
}

export const PercentBar: React.FC<PercentBarProps> = ({
  label,
  value,
  percent
}) => {
	const percentDiv = useRef<any>(null);
	const [isDivSet, setIsDivSet] = useState(false);

  	useEffect(() => {
		percentDiv.current.style.width = `${percent}%`;
		setIsDivSet(true);
	}, [percentDiv, percent, isDivSet]);


	return (
		<div aria-label={`${percent} percent`} className={`${PERCENT_BAR_OUTER_CLASSNAME}`}>
			<PercentBarLabels label={label} />
			<div ref={percentDiv} className={`${PERCENT_BAR_INNER_CLASSNAME}`}>
				<div className={`${PERCENT_BAR_CLASSNAME}__value`}>
					{value ? `${value}` : null}
				</div>
			</div>
			<div className={`${PERCENT_BAR_OUTER_CLASSNAME}-left`}></div>
			<div className={`${PERCENT_BAR_OUTER_CLASSNAME}-center`}></div>
			<div className={`${PERCENT_BAR_OUTER_CLASSNAME}-right`}></div>
		</div>
	);
};