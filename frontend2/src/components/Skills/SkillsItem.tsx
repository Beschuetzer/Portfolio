import React from "react";
import { useAppDispatch } from "../../hooks";
import { clickSkill } from "../../slices/resumeSlice";
import { EmbeddedLink } from "../EmbeddedLink";
import { PercentBar, PercentBarLabel } from "../PercentBar/PercentBar";
import { toggleScrollability } from "../utils";
import { SKILLS_CLASSNAME } from "./utils";

interface SkillsItemProps {
	title: string;
	percent: string;
	href: string;
	hours?: string;
	isLocal?: boolean;
	label: PercentBarLabel;
}

export const SkillsItem: React.FC<SkillsItemProps> = ({
	title,
	percent,
	href,
	hours,
	label,
	isLocal = false,
}) => {
	const dispatch = useAppDispatch();
	const skillsPopupDiv = document.querySelector("#skillsPopup");

	const onParagraphClick = (e: MouseEvent) => {
		if (
			(
				(e.target as HTMLElement)?.parentNode?.parentNode as any
			)?.previousElementSibling?.textContent.search(/human/i) !== -1
		)
			return;

		skillsPopupDiv?.classList?.toggle(`${SKILLS_CLASSNAME}-popup--active`);
		dispatch(clickSkill(e.target as HTMLElement));
		setTimeout(() => toggleScrollability(false), 750);
	};

	function renderHref() {
		let toReturn = (
			<div
				onClick={(e: any) => onParagraphClick(e)}
				className={`${SKILLS_CLASSNAME}__title`}>
				{title}:
			</div>
		);


		if (href) {
			toReturn = (
				<EmbeddedLink className={`${SKILLS_CLASSNAME}__title`} href={href} isLocal={isLocal} openInNewTab={!isLocal}>
					{title}:
				</EmbeddedLink>
			);
		}

		return toReturn;
	}

	

	return (
		<React.Fragment>
			<li className={`${SKILLS_CLASSNAME}__item`}>
				<svg className={`${SKILLS_CLASSNAME}__section-svg`}>
					<use xlinkHref="/sprite.svg#icon-circle"></use>
				</svg>
				{renderHref()}
			</li>
			<PercentBar value={hours} label={label} percent={percent}/>
			
		</React.Fragment>
	);
};