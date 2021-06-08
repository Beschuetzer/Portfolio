import React from "react";
import { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { clickSkill } from "../../actions"
import SkillsItemSectionLabels from "./SkillsItemSectionLabels";
import { SkillsItemLabel, SKILLS_CLASSNAME } from "./utils";

interface SkillsItemProps {
	title: string;
	percent: string;
	href: string;
	hours: string;
	label: SkillsItemLabel;
	clickSkill: (value: HTMLElement) => void;
}

const SkillsItem: React.FC<SkillsItemProps> = ({
	title,
	percent,
	href,
	clickSkill,
	hours,
	label,
}) => {
	const skillsPopupDiv = document.querySelector("#skillsPopup");
	const percentDiv = useRef<any>(null);
	const [isDivSet, setIsDivSet] = useState(false);

	const onParagraphClick = (e: MouseEvent) => {
		if (
			(
				(e.target as HTMLElement)?.parentNode?.parentNode as any
			)?.previousElementSibling?.textContent.search(/human/i) !== -1
		)
			return;

		skillsPopupDiv?.classList?.toggle(`${SKILLS_CLASSNAME}-popup--active`);
		clickSkill(e.target as HTMLElement);
	};

	useEffect(() => {
		percentDiv.current.style.width = `${percent}%`;
		setIsDivSet(true);
	}, [percentDiv, percent, isDivSet]);

	return (
		<React.Fragment>
			<li className={`${SKILLS_CLASSNAME}__item`}>
				<svg className={`${SKILLS_CLASSNAME}__section-svg`}>
					<use xlinkHref="/sprite.svg#icon-circle"></use>
				</svg>
				{href ? (
					<a
						target="_blank"
						rel="noreferrer"
						className={`${SKILLS_CLASSNAME}__title`}
						href={href}>
						{title}:
					</a>
				) : (
					<div
						onClick={(e: any) => onParagraphClick(e)}
						className={`${SKILLS_CLASSNAME}__title`}>
						{title}:
					</div>
				)}
			</li>
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
		</React.Fragment>
	);
};

export default connect(null, {
	clickSkill,
})(SkillsItem);
