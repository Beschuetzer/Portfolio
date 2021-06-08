import React from "react";
import { useEffect } from "react";
import { connect, RootStateOrAny } from "react-redux";

import { setCurrentBridgeSection, setBridgeSections } from "../actions";
import {
	BRIDGE_CLASSNAME,
	COLOR_PRIMARY_BRIDGE_1,
	COLOR_PRIMARY_BRIDGE_2,
	COLOR_PRIMARY_BRIDGE_3,
	COLOR_PRIMARY_BRIDGE_4,
} from "../pages/examples/bridge/utils";

interface ArrowButtonProps {
  direction: string,
	bridgeSections: NodeListOf<Element>,
	currentBridgeSection: number,
	clickedBridgeInfoButtonCount: number,
	setBridgeSections: (value: NodeListOf<Element>) => void,
	setCurrentBridgeSection: (value: number) => void,
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
	direction,
	setCurrentBridgeSection,
	currentBridgeSection,
	bridgeSections,
	setBridgeSections,
	clickedBridgeInfoButtonCount,
}) => {
	//Initial setup, storing sections
	useEffect(() => {
		// if (bridgeSections) return;
		const sections = document.querySelectorAll(`.${BRIDGE_CLASSNAME}__section`);
		setBridgeSections(sections);
	}, [setBridgeSections]);

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
					rightArrow.classList.remove("hidden");

				if (leftArrow && currentBridgeSection === 0)
					leftArrow.classList.add("hidden");
			} else {
				if (leftArrow && currentBridgeSection > 0)
					leftArrow.classList.remove("hidden");

				if (
					rightArrow &&
					(currentBridgeSection === bridgeSections.length - 1 ||
						(clickedBridgeInfoButtonCount > 1 && currentBridgeSection === 0))
				)
					rightArrow.classList.add("hidden");
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
          normal: {left: string, right: string},
          hover: {left: string, right: string},
        },
      } = {
				0: {
					normal: {
						left: COLOR_PRIMARY_BRIDGE_1,
						right: COLOR_PRIMARY_BRIDGE_1,
					},
					hover: {
						left: COLOR_PRIMARY_BRIDGE_4,
						right: COLOR_PRIMARY_BRIDGE_4,
					},
				},
				1: {
					normal: {
						left: COLOR_PRIMARY_BRIDGE_1,
						right: COLOR_PRIMARY_BRIDGE_2,
					},
					hover: {
						left: COLOR_PRIMARY_BRIDGE_4,
						right: COLOR_PRIMARY_BRIDGE_1,
					},
				},
				2: {
					normal: {
						left: COLOR_PRIMARY_BRIDGE_1,
						right: COLOR_PRIMARY_BRIDGE_3,
					},
					hover: {
						left: COLOR_PRIMARY_BRIDGE_2,
						right: COLOR_PRIMARY_BRIDGE_4,
					},
				},
				3: {
					normal: {
						left: COLOR_PRIMARY_BRIDGE_1,
						right: COLOR_PRIMARY_BRIDGE_1,
					},
					hover: {
						left: COLOR_PRIMARY_BRIDGE_4,
						right: COLOR_PRIMARY_BRIDGE_4,
					},
				},
			};

			document.documentElement.style.setProperty(
				"--arrow-button-left-fill",
				arrowColors[currentBridgeSection].normal.left,
			);
			document.documentElement.style.setProperty(
				"--arrow-button-right-fill",
				arrowColors[currentBridgeSection].normal.right,
			);
			document.documentElement.style.setProperty(
				"--arrow-button-left-fill-hover",
				arrowColors[currentBridgeSection].hover.left,
			);
			document.documentElement.style.setProperty(
				"--arrow-button-right-fill-hover",
				arrowColors[currentBridgeSection].hover.right,
			);
		};

		//NOTE: handleDisplay(rightArrow) must come before handleDisplay(leftArrow)
		handleDisplay(rightArrow as HTMLElement);
		handleDisplay(leftArrow as HTMLElement);
		handleArrowColors();
		handleSliding();
	}, [currentBridgeSection, bridgeSections, clickedBridgeInfoButtonCount]);

	const handleClick = (e: MouseEvent) => {
		if ((e.currentTarget as HTMLElement)?.className.match(/left/i)) {
			if (currentBridgeSection > 0) {
				return setCurrentBridgeSection(currentBridgeSection - 1);
			}
		} else {
			if (currentBridgeSection < bridgeSections.length - 1) {
				setCurrentBridgeSection(currentBridgeSection + 1);
			}
		}
	};

	return (
		<div
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

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		currentBridgeSection: state.bridge.currentBridgeSection,
		bridgeSections: state.bridge.bridgeSections,
		clickedBridgeInfoButtonCount: state.bridge.clickedBridgeInfoButtonCount,
	};
};

export default connect(mapStateToProps, {
	setCurrentBridgeSection,
	setBridgeSections,
})(ArrowButton as any);
