import React from "react";
import { Link } from "react-router-dom";
import { scrollToSection } from "../helpers";
import { BRIDGE_CLASSNAME } from "./constants";

interface EmbeddedLinkProps {
	href: string,
	className?: string,
	isLocal?: boolean,
	addSpaces?: boolean,
	openInNewTab?: boolean,
	children: any,
}

export const EmbeddedLink: React.FC<EmbeddedLinkProps> = ({
	href,
	className = `${BRIDGE_CLASSNAME}__link`,
	isLocal = false,
	addSpaces = true,
	openInNewTab = true,
	children,
}) => {
	const scrollToLink = (e: MouseEvent) => {
		if (openInNewTab) return;
		setTimeout(() => {
			const href =  ((e.target as any)?.href as string);
			const indexStart = href.indexOf('#');
			if (indexStart === -1 || !href) return;
			const sectionToScrollTo = href.slice(indexStart);
			scrollToSection(document.querySelector(`${sectionToScrollTo}`) as HTMLElement);
		}, 0);
	}

	const renderContent = () => {
		const ariaLabel = `link to ${children}`
		if (isLocal) {
			return (
				<Link aria-label={ariaLabel} rel={openInNewTab ? "noreferrer" : undefined} target={openInNewTab ? "_blank" : undefined} to={href} className={className} onClick={(e: any) => scrollToLink(e)}>
					{children}
				</Link>
			);
		}

		return (
			//eslint-disable-next-line
			<a rel={openInNewTab ? "noreferrer" : undefined} target={openInNewTab ? "_blank" : undefined} href={href} className={className}>
				{children}
			</a>
		);
	};

	return (
		<React.Fragment>
			{addSpaces ? <span>&nbsp;</span> : null}
			{renderContent()}
			{addSpaces ? <span>&nbsp;</span> : null}
		</React.Fragment>
	);
};