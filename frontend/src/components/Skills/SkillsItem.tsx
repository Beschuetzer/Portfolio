import React, { RefObject } from "react";
import { connect } from "react-redux";
import { clickSkill } from "../../actions"
import SkillsItemSectionLabels from "./SkillsItemSectionLabels";
import { SkillsItemLabel, SKILLS_CLASSNAME } from "./utils";

interface SkillsItemProps {
	title: string;
	percent: string;
	href: string;
	hours?: string;
	label: SkillsItemLabel;
	clickSkill: (value: HTMLElement) => void;
}

interface SkillsItemState {
	isDivSet: boolean,
}

class SkillsItem extends React.PureComponent<SkillsItemProps, SkillsItemState> {
	skillsPopupDiv: HTMLElement;
	percentDiv: RefObject<HTMLElement>;
	title: string;
	percent: string;
	href: string;
	clickSkill: (value: HTMLElement) => void;
	hours: string;
	label: SkillsItemLabel;

	constructor(
		props: any,
	) {
		super(props);
		
		this.skillsPopupDiv = document.querySelector("#skillsPopup")!;
		this.percentDiv = React.createRef();
		this.title = this.props.title;
		this.percent = this.props.percent;
		this.href = this.props.href;
		this.clickSkill = this.props.clickSkill;
		this.hours = this.props.hours as any;
		this.label = this.props.label;

		this.state = {
			isDivSet: false,
		}
	}

	componentDidMount() {
	}

	componentDidUpdate() {
		(this.percentDiv?.current as any).style.width = `${this.percent}%`;
		this.setState({isDivSet: true});
	}

	onParagraphClick = (e: MouseEvent) => {
		if (
			(
				(e.target as HTMLElement)?.parentNode?.parentNode as any
			)?.previousElementSibling?.textContent.search(/human/i) !== -1
		)
			return;

		this.skillsPopupDiv?.classList?.toggle(`${SKILLS_CLASSNAME}-popup--active`);
		this.clickSkill(e.target as HTMLElement);
	};

	render() {
		return (
			<React.Fragment>
				<li className={`${SKILLS_CLASSNAME}__item`}>
					<svg className={`${SKILLS_CLASSNAME}__section-svg`}>
						<use xlinkHref="/sprite.svg#icon-circle"></use>
					</svg>
					{this.href ? (
						<a
							target="_blank"
							rel="noreferrer"
							className={`${SKILLS_CLASSNAME}__title`}
							href={this.href}>
							{this.title}:
						</a>
					) : (
						<div
							onClick={(e: any) => this.onParagraphClick(e)}
							className={`${SKILLS_CLASSNAME}__title`}>
							{this.title}:
						</div>
					)}
				</li>
				<div className={`${SKILLS_CLASSNAME}__percent-outer`}>
					<SkillsItemSectionLabels label={this.label} />
					<div ref={this.percentDiv as any} className={`${SKILLS_CLASSNAME}__percent-inner`}>
						<div className={`${SKILLS_CLASSNAME}__hours`}>
							{this.hours ? `~ ${this.hours} hours` : null}
						</div>
					</div>
					<div className={`${SKILLS_CLASSNAME}__percent-outer-left`}></div>
					<div className={`${SKILLS_CLASSNAME}__percent-outer-center`}></div>
					<div className={`${SKILLS_CLASSNAME}__percent-outer-right`}></div>
				</div>
			</React.Fragment>
		);
	}
};

export default connect(null, {
	clickSkill,
})(SkillsItem as any);
