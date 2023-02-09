import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { BRIDGE_CLASSNAME } from "./utils";

interface BridgeCardProps {
	children: any,
	selectorToUseForSubtitle?: (state: RootState) => string,
	titleSize?: string,
	titleContent: string,
	titleSubtitle?: string,
}

export const BridgeSection: React.FC<BridgeCardProps> = ({
	children,
	selectorToUseForSubtitle: selectorToUseForSubtitle = () => '',
	titleSize = "two",
	titleContent,
	titleSubtitle = "",
}) => {
	const titleToUse = useSelector((state: RootState) => selectorToUseForSubtitle(state)) || titleSubtitle || null;
	return (
		<div className={`${BRIDGE_CLASSNAME}__card`}>
			<div className={`${BRIDGE_CLASSNAME}__section-titles`}>
				<h2 className={`heading--${titleSize} ${BRIDGE_CLASSNAME}__section-title`}>
					{titleContent}
				</h2>
				{titleToUse ? (
					<h4 className="heading--five">{titleToUse}</h4>
				) : null}
			</div>
			<div className={`${BRIDGE_CLASSNAME}__section-content`}>{children}</div>
		</div>
	);
};