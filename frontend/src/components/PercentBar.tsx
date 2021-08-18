import React from "react";
import { useEffect, useRef, useState } from "react";
import SkillsItemSectionLabels from "./Skills/SkillsItemSectionLabels";
import { SkillsItemLabel, SKILLS_CLASSNAME } from "./Skills/utils";

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
		<div className={`${SKILLS_CLASSNAME}__percent-outer`}>
			<SkillsItemSectionLabels label={label} />
			<div ref={percentDiv} className={`${SKILLS_CLASSNAME}__percent-inner`}>
				<div className={`${SKILLS_CLASSNAME}__hours`}>
					{hours ? `~ ${hours} hours` : null}
				</div>
			</div>
			<div className={`${SKILLS_CLASSNAME}__percent-outer-left`}></div>
			<div className={`${SKILLS_CLASSNAME}__percent-outer-center`}></div>
			<div className={`${SKILLS_CLASSNAME}__percent-outer-right`}></div>
		</div>
	);
};

export default PercentBar;
