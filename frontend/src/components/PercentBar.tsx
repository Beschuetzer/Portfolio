import React from "react";
import { useEffect, useRef, useState } from "react";
import SkillsItemSectionLabels from "./Skills/SkillsItemSectionLabels";
import { SkillsItemLabel } from "./Skills/utils";

export const PERCENT_BAR_CLASSNAME = 'percent-bar'
export const PERCENT_BAR_OUTER_CLASSNAME = `${PERCENT_BAR_CLASSNAME}__outer`;
export const PERCENT_BAR_INNER_CLASSNAME = `${PERCENT_BAR_CLASSNAME}__inner`;

export interface PercentBarProps {
  label: SkillsItemLabel;
  hours: string | undefined;
  percent: string;
}

const PercentBar: React.FC<PercentBarProps> = ({
  label,
  hours,
  percent
}) => {
	const percentDiv = useRef<any>(null);
	const [isDivSet, setIsDivSet] = useState(false);

  useEffect(() => {
		percentDiv.current.style.width = `${percent}%`;
		setIsDivSet(true);
	}, [percentDiv, percent, isDivSet]);


	return (
		<div className={`${PERCENT_BAR_OUTER_CLASSNAME}`}>
			<SkillsItemSectionLabels label={label} />
			<div ref={percentDiv} className={`${PERCENT_BAR_INNER_CLASSNAME}`}>
				<div className={`${PERCENT_BAR_CLASSNAME}__hours`}>
					{hours ? `~ ${hours} hours` : null}
				</div>
			</div>
			<div className={`${PERCENT_BAR_OUTER_CLASSNAME}-left`}></div>
			<div className={`${PERCENT_BAR_OUTER_CLASSNAME}-center`}></div>
			<div className={`${PERCENT_BAR_OUTER_CLASSNAME}-right`}></div>
		</div>
	);
};

export default PercentBar;
