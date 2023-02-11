import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { BRIDGE_CLASSNAME, COLOR_PRIMARY_BRIDGE_1_CSS_PROPERTY_NAME, COLOR_PRIMARY_BRIDGE_4_CSS_PROPERTY_NAME, COLOR_PRIMARY_BRIDGE_2_CSS_PROPERTY_NAME, COLOR_PRIMARY_BRIDGE_3_CSS_PROPERTY_NAME } from "../pages";
import { bridgeSectionsSelector, clickedBridgeInfoButtonCountSelector, currentBridgeSectionSelector, setBridgeSections, setCurrentBridgeSection } from "../slices";
import { ANIMATION_DURATION, HIDDEN_CLASSNAME, PAGE_NAV_CLASSNAME, SLIDING_CLASSNAME } from "./constants";
import { getComputedStyleCustom } from "../helpers";

interface ArrowButtonProps {
  	direction: string,
	reference?: any,
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
	direction,
	reference,
}) => {
	const dispatch = useAppDispatch();
	const currentBridgeSection = useAppSelector(currentBridgeSectionSelector);
	const bridgeSections = useAppSelector(bridgeSectionsSelector);
	const clickedBridgeInfoButtonCount = useAppSelector(clickedBridgeInfoButtonCountSelector);

	//Initial setup, storing sections
	useEffect(() => {
		// if (bridgeSections) return;
		const sections = document.querySelectorAll(`.${BRIDGE_CLASSNAME}__section`);
		dispatch(setBridgeSections(sections));
	}, [dispatch, setBridgeSections]);

	//Handling Updates
	useEffect(() => {
		const leftArrow = document.querySelector(".arrow-button--left");
		const rightArrow = document.querySelector(".arrow-button--right");
		if (!bridgeSections) return;

		const handleDisplay = (arrowElement: HTMLElement) => {
			if (arrowElement?.className.match(/left/i)) {
				if (
					rightArrow &&
					currentBridgeSection < bridgeSections.length - 1 &&
					clickedBridgeInfoButtonCount > 1
				)
					rightArrow.classList.remove(HIDDEN_CLASSNAME);

				if (leftArrow && currentBridgeSection === 0)
					leftArrow.classList.add(HIDDEN_CLASSNAME);
			} else {
				if (leftArrow && currentBridgeSection > 0)
					leftArrow.classList.remove(HIDDEN_CLASSNAME);

				if (
					rightArrow &&
					(currentBridgeSection === bridgeSections.length - 1 ||
						(clickedBridgeInfoButtonCount > 1 && currentBridgeSection === 0))
				)
					rightArrow.classList.add(HIDDEN_CLASSNAME);
			}
		};

		const handleSliding = () => {
			for (let i = 0; i < bridgeSections.length; i++) {
				const section = bridgeSections[i];
				if (!section) return;

				if (i !== currentBridgeSection)
					section.classList.remove("current-section");

				if (i < currentBridgeSection) {
					section.classList.add("slide-left");
				} else if (i === currentBridgeSection) {
					section.classList.remove("slide-left");
					section.classList.add("current-section");
				} else {
					section.classList.remove("slide-left");
				}
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
						left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CSS_PROPERTY_NAME),
						right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CSS_PROPERTY_NAME),
					},
					hover: {
						left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CSS_PROPERTY_NAME),
						right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CSS_PROPERTY_NAME),
					},
				},
				1: {
					normal: {
						left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CSS_PROPERTY_NAME),
						right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CSS_PROPERTY_NAME),
					},
					hover: {
						left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CSS_PROPERTY_NAME),
						right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CSS_PROPERTY_NAME),
					},
				},
				2: {
					normal: {
						left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CSS_PROPERTY_NAME),
						right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CSS_PROPERTY_NAME),
					},
					hover: {
						left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CSS_PROPERTY_NAME),
						right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CSS_PROPERTY_NAME),
					},
				},
				3: {
					normal: {
						left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CSS_PROPERTY_NAME),
						right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_4_CSS_PROPERTY_NAME),
					},
					hover: {
						left: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CSS_PROPERTY_NAME),
						right: () => getComputedStyleCustom(COLOR_PRIMARY_BRIDGE_1_CSS_PROPERTY_NAME),
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

		//NOTE: handleDisplay(rightArrow) must come before handleDisplay(leftArrow)
		handleDisplay(rightArrow as HTMLElement);
		handleDisplay(leftArrow as HTMLElement);
		handleArrowColors();
		handleSliding();
	}, [currentBridgeSection, bridgeSections, clickedBridgeInfoButtonCount]);

	const handleClick = (e: MouseEvent) => {
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

	return (
		<div
			ref={reference}
			onClick={(e: any) => handleClick(e)}
			className={`hidden arrow-button arrow-button--${direction}`}>
			<svg>
				<use xlinkHref="/sprite.svg#icon-arrow-with-circle-down"></use>
			</svg>
			{/* <svg className={`arrow-button__fill-${fillNumber} arrow-button__hover-fill-${hoverFillNumber}`}>
        <use xlinkHref="/sprite.svg#icon-arrow-with-circle-down"></use>
      </svg> */}
		</div>
	);
};