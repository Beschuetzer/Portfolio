import React from "react";
import { BRIDGE_CLASSNAME } from "../../../components/constants";
import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";

interface BridgeCardProps {
	children: any,
	selectorToUseForSubtitle?: (state: RootState) => string,
	titleSize?: string,
	titleContent: string,
	titleSubtitle?: string,
}

const BridgeSectionComponent: React.FC<BridgeCardProps> = ({
	children,
	selectorToUseForSubtitle = () => '',
	titleSize = "two",
	titleContent,
	titleSubtitle = "",
}) => {
	const titleToUse = useAppSelector((state: RootState) => selectorToUseForSubtitle(state)) || titleSubtitle || null;
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

export const BridgeSection = React.memo(BridgeSectionComponent);