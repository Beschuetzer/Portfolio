import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { BRIDGE_HERO_CLASSNAME, BRIDGE_PAGE_NAV_LINK_CLASSNAMES, BRIDGE_CLASSNAME, BRIDGE_CURRENT_SECTION_CLASSNAME } from "../../../components/constants";
import { scrollToSection } from "../../../helpers";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useBridgeSectionTransitionHiding } from "../../../hooks/useBridgeSectionTransitionHiding";
import { useGetBridgeSections } from "../../../hooks/useGetBridgeSections";
import { setCurrentBridgeSection, setClickedBridgeInfoButtonCount, setHasClickedALink, currentBridgeSectionSelector, hasClickedALinkSelector } from "../../../slices/bridgeSlice";
import { isMobileSelector } from "../../../slices/generalSlice";
import { loadedSoundsSelector } from "../../../slices/soundsSlice";
import {
	handleBridgeNavigation,
	showBridgeHero,
	toggleSecondInfoButtonClick,
} from "./utils";

interface BridgeSectionLinkProps {
	index?: number,
	isEmbeddedLink?: boolean,
	sectionToSkipTo: string,
	name: string,
	match?: {url: string},
}

export const BridgeSectionLink: React.FC<BridgeSectionLinkProps> = ({
	index,
	isEmbeddedLink = false,
	sectionToSkipTo,
	name,
	match,
}) => {
	const [isCurrentSection, setIsCurrentSection] = useState(false)
	const isHiddenDuringTransition = useBridgeSectionTransitionHiding();
	const bridgeSections = useGetBridgeSections();
	const currentBridgeSection = useAppSelector(currentBridgeSectionSelector);
	const hasClickedALink = useAppSelector(hasClickedALinkSelector);
	const isMobile = useAppSelector(isMobileSelector);
	const sounds = useAppSelector(loadedSoundsSelector);
	
	// numberOfSkips: parseInt(ownProps.numberOfSkips),
	// const numberOfSkips = useAppSelector((state: RootState) => stat);
	const dispatch = useAppDispatch();
	const spanRef = useRef<HTMLElement>(null);

	const getSkipDirectionAndSkips = (e: MouseEvent) => {
		let skipToSectionNumber = -1;
		for (let i = 0; i < (bridgeSections || []).length; i++) {
			const bridgeSection = (bridgeSections || [])[i];
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
				valueToUse < (bridgeSections || []).length
					? valueToUse
					: (bridgeSections || []).length - 1;

		if (isMobile) {
			scrollToSection((bridgeSections || [])[valueToUse]);
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
				handleBridgeNavigation(
					checkBoxRef,
					backgroundRef,
					sounds as any,
					isMobile,
				);
				dispatch(setHasClickedALink(true));
			}
		}
	};

	useEffect(() => {
		const isCurrentSection = currentBridgeSection === index;
		setIsCurrentSection(isCurrentSection);
	}, [currentBridgeSection, index])
	

	//#region JSX
	const linkClassname = isEmbeddedLink ? `${BRIDGE_CLASSNAME}__link` : BRIDGE_PAGE_NAV_LINK_CLASSNAMES;
	const isCurrentSectionClassname = isCurrentSection ? BRIDGE_CURRENT_SECTION_CLASSNAME : '';
	if (isHiddenDuringTransition) return null;
	return (
		<a 
			ref={spanRef as any} 
			onClick={(e: any) => navigateToSection(e)} 
			className={`${linkClassname} ${isCurrentSectionClassname}`}
		>
			{name}
		</a>
	);
	//#endregion
};