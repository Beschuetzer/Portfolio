import React from "react";
import { BRIDGE_CLASSNAME } from "./utils";

interface BridgeCardProps {
	children: any,
	titleSize?: string,
	titleContent: string,
	titleSubtitle?: string,
}

const BridgeCard: React.FC<BridgeCardProps> = ({
	children,
	titleSize = "two",
	titleContent,
	titleSubtitle = "",
}) => {
	return (
		<div className={`${BRIDGE_CLASSNAME}__card`}>
			<div className={`${BRIDGE_CLASSNAME}__section-titles`}>
				<h2 className={`heading--${titleSize} ${BRIDGE_CLASSNAME}__section-title`}>
					{titleContent}
				</h2>
				{titleSubtitle !== "" ? (
					<h4 className="heading--five">{titleSubtitle}</h4>
				) : null}
			</div>
			<div className={`${BRIDGE_CLASSNAME}__section-content`}>{children}</div>
		</div>
	);
};

export default BridgeCard;
