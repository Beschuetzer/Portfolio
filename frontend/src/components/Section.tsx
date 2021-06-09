import React from "react";

import SectionContainer from "./SectionContainer";
import { capitalize, replaceCharacters } from "../helpers";

interface SectionProps {
	name: string,
	pageName: string,
	children: string,
	headerSideContent?: any,
	hint?: string,
}

const Section: React.FC<SectionProps> = ({
	name,
	pageName,
	children,
	headerSideContent,
	hint,
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
					<div 
						dangerouslySetInnerHTML={{ __html: hint ? hint : ''}}
						className={`${pageName}__hint`}
					></div>
					{children}
				</div>
			</article>
		</SectionContainer>
	);
}

export default Section;
