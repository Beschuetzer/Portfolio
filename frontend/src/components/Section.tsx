import React from "react";

import SectionContainer from "./SectionContainer";
import { capitalize, replaceCharacters } from "../helpers";

interface SectionProps {
	name: string,
	pageName: string,
	children: string,
	headerSideContent?: any,
}

const Section: React.FC<SectionProps> = ({
	name,
	pageName,
	children,
	headerSideContent
}) => {
	return (
		<SectionContainer name={name} pageName={pageName}>
			<article className={`${pageName}__card z-index-content`}>
				<div className={`${pageName}__content`}>
					<div className={`${pageName}__header`}>
						<h3 className={`heading--three ${pageName}__header-title`}>
							{capitalize(replaceCharacters(name))}
						</h3>
						{headerSideContent ? headerSideContent : null}
					</div>
					{children}
				</div>
			</article>
		</SectionContainer>
	);
}

export default Section;
