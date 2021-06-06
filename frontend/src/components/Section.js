import React from "react";

import SectionContainer from '../components/SectionContainer';
import { capitalize, replaceCharacters } from "../helpers";

class Section extends React.Component {
	render() {
		const { name, pageName, children, headerSideContent } = this.props;
		return (
			<SectionContainer
				name={name}
				pageName={pageName}
			>
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
}

export default Section;
