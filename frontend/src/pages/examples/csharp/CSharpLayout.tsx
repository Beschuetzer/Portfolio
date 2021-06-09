import React from "react";
import { capitalize, replaceCharacters } from "../../../helpers";
import Section from "../../../components/Section";
import SectionContainer from "../../../components/SectionContainer";
import SourceCodeLink from "../../../components/SourceCodeLink";
import { C_SHARP_LAYOUT_CSS_NAME } from "./utils";

interface CSharpLayoutProps {
	pageName: string;
	sourceCodeLink: string;
	sourceCodeMsg?: string;
	sections: any[];
	children: any;
}

const CSharpLayout: React.FC<CSharpLayoutProps> = ({
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
					{section.children.map((child: Element, index: number) => {
						return <React.Fragment key={index}>{child}</React.Fragment>;
					})}
				</Section>
			);
		});
	}

	return (
		<div className={`${C_SHARP_LAYOUT_CSS_NAME} ${pageName}`}>
			{sourceCodeLink ? (
				<SourceCodeLink href={sourceCodeLink} msg={sourceCodeMsg} />
			) : null}
			<div className={`${C_SHARP_LAYOUT_CSS_NAME}__title`}>
				{capitalize(replaceCharacters(pageName))}
			</div>
			{children}
			{renderSections()}
		</div>
	);
};

export default CSharpLayout;
