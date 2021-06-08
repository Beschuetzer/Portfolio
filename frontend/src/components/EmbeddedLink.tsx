import React from "react";
import { Link } from "react-router-dom";
import { BRIDGE_CLASSNAME } from "../pages/examples/bridge/utils";

interface EmbeddedLinkProps {
	href: string,
	className?: string,
	isLocal?: boolean,
	children: any,
}

const EmbeddedLink: React.FC<EmbeddedLinkProps> = ({
	href,
	className = `${BRIDGE_CLASSNAME}__link`,
	isLocal = false,
	children,
}) => {
	const renderContent = () => {
		if (isLocal) {
			return (
				<Link to={href} className={className}>
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

export default EmbeddedLink;
