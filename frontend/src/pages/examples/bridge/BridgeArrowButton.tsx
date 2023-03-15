import React, { useState } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { clickedBridgeInfoButtonCountSelector, currentBridgeSectionSelector, setCurrentBridgeSection } from "../../../slices";
import { ANIMATION_DURATION, BRIDGE_ARROW_BUTTON_LEFT_FILL_CUSTOM_PROPERTY_NAME, BRIDGE_ARROW_BUTTON_RIGHT_FILL_CUSTOM_PROPERTY_NAME, BRIDGE_LINK_SVG_FILL_CUSTOM_PROPERTY_NAME, BRIDGE_LINK_TEXT_COLOR_CUSTOM_PROPERTY_NAME, BRIDGE_SECTION_COLORS, PAGE_NAV_CLASSNAME, SLIDING_CLASSNAME } from "../../../components/constants";
import { useGetBridgeSections } from "../../../hooks/useGetBridgeSections";
import { useBridgeSectionTransitionHiding } from "../../../hooks/useBridgeSectionTransitionHiding";
import { BridgeSectionHidingLogic } from "./BridgeSectionHidingLogic";

type BridgeArrowButtonProps = {
  	direction: 'left' | 'right',
	reference?: any,
}



export const BridgeArrowButton: React.FC<BridgeArrowButtonProps> = ({
	direction,
	reference,
}) => {
	const dispatch = useAppDispatch();
	const currentBridgeSection = useAppSelector(currentBridgeSectionSelector);
	const clickedBridgeInfoButtonCount = useAppSelector(clickedBridgeInfoButtonCountSelector);
	const bridgeSections = useGetBridgeSections();
	const bridgeTransitionHidingLogic = new BridgeSectionHidingLogic(clickedBridgeInfoButtonCount, currentBridgeSection, bridgeSections.length);
	const isHiddenDuringTransition = useBridgeSectionTransitionHiding(
		bridgeTransitionHidingLogic.areBridgeSectionsVisible ||
		!bridgeTransitionHidingLogic.leftDisplayCondition ||
		!bridgeTransitionHidingLogic.rightDisplayCondition
	);
	const [isHidden, setIsHidden] = useState(isHiddenDuringTransition);
	
	//Handling Updates
	useEffect(() => {
		const handleDisplay = () => {
			if (direction === 'left') {
				setIsHidden(bridgeTransitionHidingLogic.leftDisplayCondition);
			} else {
				setIsHidden(bridgeTransitionHidingLogic.rightDisplayCondition);
			}
		};
		
		const handleArrowColors = () => {
			document.documentElement.style.setProperty(
				BRIDGE_ARROW_BUTTON_LEFT_FILL_CUSTOM_PROPERTY_NAME,
				BRIDGE_SECTION_COLORS[currentBridgeSection].arrowNormal.left(),
			);
			document.documentElement.style.setProperty(
				BRIDGE_ARROW_BUTTON_RIGHT_FILL_CUSTOM_PROPERTY_NAME,
				BRIDGE_SECTION_COLORS[currentBridgeSection].arrowNormal.right(),
			);
			document.documentElement.style.setProperty(
				`${BRIDGE_ARROW_BUTTON_LEFT_FILL_CUSTOM_PROPERTY_NAME}-hover`,
				BRIDGE_SECTION_COLORS[currentBridgeSection].arrowHover.left(),
			);
			document.documentElement.style.setProperty(
				`${BRIDGE_ARROW_BUTTON_RIGHT_FILL_CUSTOM_PROPERTY_NAME}-hover`,
				BRIDGE_SECTION_COLORS[currentBridgeSection].arrowHover.right(),
			);

			document.documentElement.style.setProperty(
				BRIDGE_LINK_SVG_FILL_CUSTOM_PROPERTY_NAME,
				BRIDGE_SECTION_COLORS[currentBridgeSection].linkNormal.svg(),
			);
			document.documentElement.style.setProperty(
				`${BRIDGE_LINK_SVG_FILL_CUSTOM_PROPERTY_NAME}-hover`,
				BRIDGE_SECTION_COLORS[currentBridgeSection].linkHover.svg(),
			);
			document.documentElement.style.setProperty(
				BRIDGE_LINK_TEXT_COLOR_CUSTOM_PROPERTY_NAME,
				BRIDGE_SECTION_COLORS[currentBridgeSection].linkNormal.text(),
			);
			document.documentElement.style.setProperty(
				`${BRIDGE_LINK_TEXT_COLOR_CUSTOM_PROPERTY_NAME}-hover`,
				BRIDGE_SECTION_COLORS[currentBridgeSection].linkHover.text(),
			);
		};

		handleDisplay();
		handleArrowColors();
	}, [currentBridgeSection, bridgeSections, clickedBridgeInfoButtonCount]);

	const handleClick = (e: MouseEvent) => {
		const MAX_BRIDGE_SECTION = 3;
		if (currentBridgeSection === MAX_BRIDGE_SECTION && direction === 'right' || currentBridgeSection === 0 && direction === 'left') return;
		hideContentDuringSlide()
		if ((e.currentTarget as HTMLElement)?.className.match(/left/i)) {
			if (currentBridgeSection > 0) {
				return dispatch(setCurrentBridgeSection(currentBridgeSection - 1));
			}
		} else {
			if (currentBridgeSection < (bridgeSections || []).length - 1) {
				dispatch(setCurrentBridgeSection(currentBridgeSection + 1));
			}
		}

	};

	const hideContentDuringSlide = () => {
		const pageNav = document.querySelector(`.${PAGE_NAV_CLASSNAME}`);
		const leftArrow = document.querySelector(".arrow-button--left");
		const rightArrow = document.querySelector(".arrow-button--right");
		const toHide = [pageNav, leftArrow, rightArrow];

		toHide.forEach(item => {
			item?.classList.add(SLIDING_CLASSNAME);
		})
		
		setTimeout(() => {
			toHide.forEach(item => {
				item?.classList.remove(SLIDING_CLASSNAME);
			})

		}, ANIMATION_DURATION / 2);

	}


	//#region JSX
	if (isHidden) return null;
	return (
		<div
			ref={reference}
			onClick={(e: any) => handleClick(e)}
			className={`arrow-button arrow-button--${direction}`}>
			<svg>
				<use xlinkHref="/sprite.svg#icon-arrow-with-circle-down"></use>
			</svg>
			{/* <svg className={`arrow-button__fill-${fillNumber} arrow-button__hover-fill-${hoverFillNumber}`}>
        <use xlinkHref="/sprite.svg#icon-arrow-with-circle-down"></use>
      </svg> */}
		</div>
	);
	//#endregion
};