import React from "react";
import { capitalize, replaceCharacters } from "../../../helpers";
import { Section } from "../../../components/Section";
import { SourceCodeLink } from "../../../components/SourceCodeLink";
import { C_SHARP_CLASSNAME } from "./utils";
import { CSharpSection } from "../../../components/constants";
import { PageWrapper } from "../../PageWrapper";


interface CSharpLayoutProps {
	pageName: string;
	sourceCodeLink?: string;
	sourceCodeMsg?: string;
	demoLink?: string;
	demoMsg?: string;
	href?: string;
	sections: CSharpSection[];
	children?: any;
	headerSideContents?: any;
}

export const CSharpLayout: React.FC<CSharpLayoutProps> = ({
	href,
	sections,
	pageName,
	sourceCodeLink,
	sourceCodeMsg = "Code",
	demoLink,
	demoMsg = "Demo",
	children,
	headerSideContents,
}) => {
	function renderSections() {
		return sections.map((section, index) => {
			if (section.hasCarousel) {
				section.styles = {...section.styles, position: 'relative'};
			}

			return (
				<Section
					key={index}
					name={section.name}
					pageName={section.pageName}
					headerSideContent={headerSideContents ? headerSideContents[index] : null}
					styles={section.styles}>
					{(section.children as any).map((child: any, index: number) => {
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
						className="source-link__demo d-none"
						href={sourceCodeLink as string}
						msg={demoMsg}
					/>
				)}
			</React.Fragment>
		);
	}

	return (
		<PageWrapper
			pageName={pageName.toLowerCase()}
			className={`${C_SHARP_CLASSNAME}`}
		>
			{href ? (
				<h2
					className={`${C_SHARP_CLASSNAME}__title`} >
					{renderSourceCodeLinks()}

					<a 
					className={`${C_SHARP_CLASSNAME}__title-link`}
					target="_blank" rel="noreferrer" href={href}>
						{capitalize(replaceCharacters(pageName))}
					</a>
				</h2>
			) : (
				<h2 className={`${C_SHARP_CLASSNAME}__title`}>
					{renderSourceCodeLinks()}
					{capitalize(replaceCharacters(pageName))}
				</h2>
			)}
			{children}
			{renderSections()}
		</PageWrapper>
	);
};