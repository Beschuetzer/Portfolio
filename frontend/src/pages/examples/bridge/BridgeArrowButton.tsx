import React, { useState } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { clickedBridgeInfoButtonCountSelector, currentBridgeSectionSelector, setCurrentBridgeSection } from "../../../slices";
import { ANIMATION_DURATION, COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME, COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME, PAGE_NAV_CLASSNAME, SLIDING_CLASSNAME } from "../../../components/constants";
import { getComputedStyleCustom } from "../../../helpers";
import { useGetBridgeSections } from "../../../hooks/useGetBridgeSections";
import { useBridgeSectionTransitionHiding } from "../../../hooks/useBridgeSectionTransitionHiding";
import { BridgeSectionHidingLogic } from "./BridgeSectionHidingLogic";

interface ArrowButtonProps {
  	direction: 'left' | 'right',
	reference?: any,
}

export const BridgeArrowButton: React.FC<ArrowButtonProps> = ({
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
			const arrowColors: {
        [key: string]: {
          normal: {left: () => string, right: () => string},
          hover: {left: () => string, right: () => string},
        },
      } = {
				0: {
					normal: {
						left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
						right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
					},
					hover: {
						left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
						right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
					},
				},
				1: {
					normal: {
						left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
						right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
					},
					hover: {
						left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
						right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
					},
				},
				2: {
					normal: {
						left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
						right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
					},
					hover: {
						left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
						right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
					},
				},
				3: {
					normal: {
						left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
						right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CUSTOM_PROPERTY_NAME),
					},
					hover: {
						left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
						right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CUSTOM_PROPERTY_NAME),
					},
				},
			};

			document.documentElement.style.setProperty(
				"--arrow-button-left-fill",
				arrowColors[currentBridgeSection].normal.left(),
			);
			document.documentElement.style.setProperty(
				"--arrow-button-right-fill",
				arrowColors[currentBridgeSection].normal.right(),
			);
			document.documentElement.style.setProperty(
				"--arrow-button-left-fill-hover",
				arrowColors[currentBridgeSection].hover.left(),
			);
			document.documentElement.style.setProperty(
				"--arrow-button-right-fill-hover",
				arrowColors[currentBridgeSection].hover.right(),
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