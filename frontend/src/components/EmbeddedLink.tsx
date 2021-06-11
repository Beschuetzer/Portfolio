import React from "react";
import { connect, RootStateOrAny } from 'react-redux';
import { Link } from "react-router-dom";
import { BRIDGE_CLASSNAME } from "../pages/examples/bridge/utils";
import { scrollToSection } from "./utils";

interface EmbeddedLinkProps {
	href: string,
	className?: string,
	isLocal?: boolean,
	children: any,
	headerHeight: number,
}

const EmbeddedLink: React.FC<EmbeddedLinkProps> = ({
	href,
	className = `${BRIDGE_CLASSNAME}__link`,
	isLocal = false,
	children,
	headerHeight,
}) => {

	const scrollToLink = (e: MouseEvent) => {
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
				<Link to={href} className={className} onClick={(e: any) => scrollToLink(e)}>
					{children}
				</Link>
			);
		}

		return (
			<a target="_blank" rel="noreferrer" href={href} className={className}>
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
