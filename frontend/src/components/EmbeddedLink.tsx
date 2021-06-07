import React from "react";
import { Link } from "react-router-dom";

interface EmbeddedLinkProps {
	href: string,
	className?: string,
	isLocal?: boolean,
	children: any,
}

const EmbeddedLink: React.FC<EmbeddedLinkProps> = ({
	href,
	className = "bridge__link",
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
