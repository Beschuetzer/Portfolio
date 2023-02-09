import React from "react";

import { SectionContainer } from "./SectionContainer";
import { capitalize, replaceCharacters } from "../helpers";

interface SectionProps {
	name: string;
	pageName: string;
	children: any;
	headerSideContent?: any;
	hint?: string;
	styles?: any,
}

export const Section: React.FC<SectionProps> = ({
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
				<section className={`${pageName}__content`}>
					<header className={`${pageName}__headers`}>
						{hint ? (
							<div
								className={`${pageName}__hint`}>
								*&nbsp;{hint}
							</div>
						) : null}
						<h3 className={`${pageName}__header`}>
							<span className={`heading--three ${pageName}__header-title`}>
								{capitalize(replaceCharacters(name))}
							</span>
							{headerSideContent ? headerSideContent : null}
						</h3>
					</header>

					{children}
				</section>
			</article>
		</SectionContainer>
	);
};