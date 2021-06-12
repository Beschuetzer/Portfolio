import React from "react";
import { connect, RootStateOrAny } from 'react-redux';
import { Link } from "react-router-dom";
import { BRIDGE_CLASSNAME } from "../pages/examples/bridge/utils";
import { scrollToSection } from "./utils";

interface EmbeddedLinkProps {
	href: string,
	className?: string,
	isLocal?: boolean,
	openInNewTab?: boolean,
	children: any,
	headerHeight: number,
}

const EmbeddedLink: React.FC<EmbeddedLinkProps> = ({
	href,
	className = `${BRIDGE_CLASSNAME}__link`,
	isLocal = false,
	openInNewTab = true,
	children,
	headerHeight,
}) => {

	const scrollToLink = (e: MouseEvent) => {
		if (openInNewTab) return;
		setTimeout(() => {
			const href =  ((e.target as any)?.href as string);
			const indexStart = href.indexOf('#');
			if (indexStart === -1 || !href) return;
			const sectionToScrollTo = href.slice(indexStart);
			scrollToSection(document.querySelector(`${sectionToScrollTo}`) as HTMLElement, headerHeight);
		}, 0);
	}

	const renderContent = () => {
		if (isLocal) {
			return (
				<Link rel={openInNewTab ? "noreferrer" : undefined} target={openInNewTab ? "_blank" : undefined} to={href} className={className} onClick={(e: any) => scrollToLink(e)}>
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
			&nbsp;
			{renderContent()}
			&nbsp;
		</React.Fragment>
	);
};

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		headerHeight: state.general.headerHeight,
	}
}

export default connect(mapStateToProps, {})(EmbeddedLink);
