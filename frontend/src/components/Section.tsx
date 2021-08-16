import React from "react";

import SectionContainer from "./SectionContainer";
import { capitalize, replaceCharacters } from "../helpers";

interface SectionProps {
	name: string;
	pageName: string;
	children: any;
	headerSideContent?: any;
	hint?: string;
	styles?: any,
}

const Section: React.FC<SectionProps> = ({
	name,
	pageName,
	children,
	headerSideContent,
	hint,
	styles,
}) => {
	return (
		<SectionContainer name={name} pageName={pageName} styles={styles}>
			<article className={`${pageName}__card z-index-content`}>
				<div className={`${pageName}__content`}>
					<div className={`${pageName}__headers`}>
						{hint ? (
							<div
								className={`${pageName}__hint`}>
								*&nbsp;{hint}
							</div>
						) : null}
						<div className={`${pageName}__header`}>
							<h3 className={`heading--three ${pageName}__header-title`}>
								{capitalize(replaceCharacters(name))}
							</h3>
							{headerSideContent ? headerSideContent : null}
						</div>
					</div>

					{children}
				</div>
			</article>
		</SectionContainer>
	);
};

export default Section;
