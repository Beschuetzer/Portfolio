import React from "react";
import { capitalize, replaceCharacters } from "../../../helpers";
import Section from "../../../components/Section";
import SourceCodeLink from "../../../components/SourceCodeLink";
import { C_SHARP_CLASSNAME } from "./utils";

interface CSharpLayoutProps {
	pageName: string;
	sourceCodeLink?: string;
	sourceCodeMsg?: string;
	demoLink?: string;
	demoMsg?: string;
	href?: string;
	sections: any[];
	children: any;
}

const CSharpLayout: React.FC<CSharpLayoutProps> = ({
	href,
	sections,
	pageName,
	sourceCodeLink,
	sourceCodeMsg = "Code",
	demoLink,
	demoMsg = "Demo",
	children,
}) => {
	function renderSections() {
		return sections.map((section, index) => {
			return (
				<Section
					key={index}
					name={section.name}
					pageName={section.pageName}
					styles={section.styles}>
					{section.children.map((child: Element, index: number) => {
						return <React.Fragment key={index}>{child}</React.Fragment>;
					})}
				</Section>
			);
		});
	}

	function renderSourceCodeLinks() {
		return (
			<React.Fragment>
				{sourceCodeLink ? (
					<SourceCodeLink href={sourceCodeLink} msg={sourceCodeMsg} />
				) : null}
				{demoLink ? (
					<SourceCodeLink
						className="source-link__demo"
						href={demoLink}
						msg={demoMsg}
					/>
				) : (
					<SourceCodeLink
						className="source-link__demo hidden"
						href={sourceCodeLink as string}
						msg={demoMsg}
					/>
				)}
			</React.Fragment>
		);
	}

	return (
		<div className={`${C_SHARP_CLASSNAME} ${pageName}`}>
			{href ? (
				<div
					className={`${C_SHARP_CLASSNAME}__title`} >
					{renderSourceCodeLinks()}

					<a 
					className={`${C_SHARP_CLASSNAME}__title-link`}
					target="_blank" rel="noreferrer" href={href}>
						{capitalize(replaceCharacters(pageName))}
					</a>
				</div>
			) : (
				<div className={`${C_SHARP_CLASSNAME}__title`}>
					{renderSourceCodeLinks()}
					{capitalize(replaceCharacters(pageName))}
				</div>
			)}
			{children}
			{renderSections()}
		</div>
	);
};

export default CSharpLayout;
