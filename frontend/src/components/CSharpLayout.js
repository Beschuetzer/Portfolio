import React from "react";
import { capitalize } from "../helpers";
import { C_SHARP_LAYOUT_CSS_NAME } from "./constants";
import Section from "./Section";
import SectionContainer from "./SectionContainer";
import SourceCodeLink from "./SourceCodeLink";

const CSharpLayout = ({
	sections,
	pageName,
	sourceCodeLink,
	sourceCodeMsg = "Code",
	children,
}) => {

	function renderSections() {
		return sections.map((section, index) => {
			return (
				<Section key={index} name={section.name} pageName={section.pageName}>
					{section.children.map((child, index) => {
						return <React.Fragment key={index}>{child}</React.Fragment>;
					})}
				</Section>
			);
		});
	}

	return (
		<div className={`${C_SHARP_LAYOUT_CSS_NAME} ${pageName}`}>
			<SectionContainer name="Images" pageName={C_SHARP_LAYOUT_CSS_NAME}>
        {
          sourceCodeLink ? 
    				<SourceCodeLink href={sourceCodeLink} msg={sourceCodeMsg} />
          : 
            null
        }
				<div className={`${C_SHARP_LAYOUT_CSS_NAME}__title`}>{capitalize(pageName)}</div>
				{children}
			</SectionContainer>
			{renderSections()}
		</div>
	);
};

export default CSharpLayout;
