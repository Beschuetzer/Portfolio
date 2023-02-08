import React from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	setCurrentBridgeSection,
	setClickedBridgeInfoButtonCount,
	setHasClickedALink,
} from "../../../actions";
import { scrollToSection } from "../../../components/utils";
import { RootState } from "../../../reducers";
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
	sectionToSkipTo: string,
	name: string,
	match?: {url: string},
}

export const BridgeSectionLink: React.FC<BridgeSectionLinkProps> = ({
	isEmbeddedLink = false,
	sectionToSkipTo,
	name,
	match,
}) => {
	const currentBridgeSection = useSelector((state: RootState) => state.bridge.currentBridgeSection);
	const bridgeSections = useSelector((state: RootState) => state.bridge.bridgeSections);
	const hasClickedALink = useSelector((state: RootState) => state.bridge.hasClickedALink);
	const headerHeight = useSelector((state: RootState) => state.general.headerHeight);
	const isMobile = useSelector((state: RootState) => state.general.isMobile);
	const sounds = useSelector((state: RootState) => state.sounds);
	// numberOfSkips: parseInt(ownProps.numberOfSkips),
	// const numberOfSkips = useSelector((state: RootState) => stat);
	const dispatch = useDispatch();
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
			dispatch(setCurrentBridgeSection(valueToUse));
		}

		if (match && match.url.match(/bridge$/i)) {
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
			dispatch(setClickedBridgeInfoButtonCount(2));

			if (!hasClickedALink) {
				handleBridgeHeroSounds(
					checkBoxRef,
					backgroundRef,
					sounds as any,
					isMobile,
					headerHeight,
				);
				dispatch(setHasClickedALink(true));
			}
		}
	};

	let classToUse = BRIDGE_PAGE_NAV_LINK_CLASSNAMES;
	if (isEmbeddedLink) classToUse = `${BRIDGE_CLASSNAME}__link`;

	return (
		<a ref={spanRef as any} onClick={(e: any) => navigateToSection(e)} className={classToUse}>
			{name}
		</a>
	);
};