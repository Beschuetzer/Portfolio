import React from "react";
import { useRef } from "react";
import { connect, RootStateOrAny } from "react-redux";

import {
	setCurrentBridgeSection,
	setClickedBridgeInfoButtonCount,
	setHasClickedALink,
} from "../../../actions";
import { scrollToSection } from "../../../components/utils";
import {
	BRIDGE_CLASSNAME,
  BRIDGE_HERO_CLASSNAME,
	BRIDGE_PAGE_NAV_LINK_CLASSNAMES,
	handleBridgeHeroSounds,
	showBridgeHero,
	toggleSecondInfoButtonClick,
} from "./utils";

interface BridgeSectionLinkProps {
	isEmbeddedLink?: boolean,
	hasClickedALink: boolean,
	isMobile: boolean,
	currentBridgeSection: number,
	headerHeight: number,
	sectionToSkipTo: string,
	name: string,
	match: {url: string},
  bridgeSections: any[],
	sounds: {play: (sound: string) => void},
	setCurrentBridgeSection: (value: number) => void,
	setClickedBridgeInfoButtonCount: (value: number) => void,
	setHasClickedALink: (value: boolean) => void,
}

const BridgeSectionLink: React.FC<BridgeSectionLinkProps> = ({
	isEmbeddedLink = false,
	bridgeSections,
	currentBridgeSection,
	setCurrentBridgeSection,
	sectionToSkipTo,
	name,
	match,
	sounds,
	isMobile,
	headerHeight,
	setClickedBridgeInfoButtonCount,
	setHasClickedALink,
	hasClickedALink,
}) => {
	const spanRef = useRef<HTMLElement>(null);

	const getSkipDirectionAndSkips = (e: MouseEvent) => {
		let skipToSectionNumber = -1;
		for (let i = 0; i < bridgeSections.length; i++) {
			const bridgeSection = bridgeSections[i];
			if (bridgeSection.id === sectionToSkipTo.toLowerCase()) {
				skipToSectionNumber = i;
				break;
			}
		}
		return skipToSectionNumber - currentBridgeSection;
	};

	const navigateToSection = (e: MouseEvent) => {
		const numberOfSkips = getSkipDirectionAndSkips(e);
		let valueToUse = currentBridgeSection + numberOfSkips;
		if (numberOfSkips < 0) valueToUse = valueToUse >= 0 ? valueToUse : 0;
		else if (numberOfSkips > 0)
			valueToUse =
				valueToUse < bridgeSections.length
					? valueToUse
					: bridgeSections.length - 1;

		if (isMobile) {
			scrollToSection(bridgeSections[valueToUse]);
		} else {
			setCurrentBridgeSection(valueToUse);
		}

		if (match && match.url.match(/bridge/i)) {
			const hero = document.querySelector(`.${BRIDGE_HERO_CLASSNAME}`) as any;
			const heroMore = document.querySelector(`.${BRIDGE_HERO_CLASSNAME}__more`) as any;
			const checkBoxRef = document.querySelector(`#${BRIDGE_HERO_CLASSNAME}__more-checkbox`) as any;
			const backgroundRef = document.querySelector(`.${BRIDGE_HERO_CLASSNAME}__background`) as any;

			showBridgeHero(heroMore);

			toggleSecondInfoButtonClick(
				hero,
				heroMore,
				isMobile,
				false,
				spanRef.current,
			);
			setClickedBridgeInfoButtonCount(2);

			if (!hasClickedALink) {
				handleBridgeHeroSounds(
					checkBoxRef,
					backgroundRef,
					sounds,
					isMobile,
					headerHeight,
				);
				setHasClickedALink(true);
			}
		}
	};

	let classToUse = BRIDGE_PAGE_NAV_LINK_CLASSNAMES;
	if (isEmbeddedLink) classToUse = `${BRIDGE_CLASSNAME}__link`;

	return (
		<span ref={spanRef} onClick={(e: any) => navigateToSection(e)} className={classToUse}>
			{name}
		</span>
	);
};

const mapStateToProps = (state: RootStateOrAny, ownProps: any) => {
	return {
		currentBridgeSection: state.bridge.currentBridgeSection,
		bridgeSections: state.bridge.bridgeSections,
		hasClickedALink: state.bridge.hasClickedALink,
		headerHeight: state.general.headerHeight,
		isMobile: state.general.isMobile,
		sounds: state.sounds,
		numberOfSkips: parseInt(ownProps.numberOfSkips),
	};
};

export default connect(mapStateToProps, {
	setCurrentBridgeSection,
	setClickedBridgeInfoButtonCount,
	setHasClickedALink,
})(BridgeSectionLink);
