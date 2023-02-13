import React from "react";
import { SKILLS_CLASSNAME } from "../../components/constants";
import { EDUCATION_CLASSNAME } from "./utils";


interface EducationItemProps{
	startDate?: string,
	endDate?: string,
	degree: string,
	location: string,
	gpa: string,
	href: string,
}

export const EducationItem: React.FC<EducationItemProps> = ({
	startDate,
	endDate,
	degree,
	location,
	gpa,
	href,
}) => {
	function getStartDate() {
		return startDate ? `${startDate}:` : null;
	}

	return (
		<li className={`${EDUCATION_CLASSNAME}__item`}>
			<span className={`${EDUCATION_CLASSNAME}__date`}>
				{endDate ? (
					<React.Fragment>
						<span>{startDate}</span>
						<span>&nbsp; &#8211; &nbsp;</span>
						<span>{endDate}</span>
					</React.Fragment>
				) : (
					getStartDate()
				)}
			</span>
			<a
				href={href}
				className={`${EDUCATION_CLASSNAME}__degree ${SKILLS_CLASSNAME}-popup__link-text ${SKILLS_CLASSNAME}__title--animating`}
				target="_blank"
				rel="noreferrer">
				{degree}
			</a>
			<span className={`${EDUCATION_CLASSNAME}__location`}> from {location} </span>
			<span className={`${EDUCATION_CLASSNAME}__gpa`}> ({gpa} GPA). </span>
		</li>
	);
};