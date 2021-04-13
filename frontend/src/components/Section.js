import React from "react";
import { capitalize } from "../helpers";

class Section extends React.Component {
	render() {
		const { name, pageName, children, headerSideContent } = this.props;
		return (
			<section
				id={name.toLowerCase()}
				data-section={name.toLowerCase()}
				className={`${pageName}__section ${pageName}__section-${name.toLowerCase()}`}>
				<article className={`${pageName}__card z-index-content`}>
					<div className={`${pageName}__content`}>
						<div className={`${pageName}__header`}>
							<h3 className={`heading--three ${pageName}__header-title`}>
								{capitalize(name)?.replace("-", " ")}
							</h3>
							{headerSideContent ? headerSideContent : null}
						</div>
						{children}
					</div>
				</article>
			</section>
		);
	}
}

export default Section;
