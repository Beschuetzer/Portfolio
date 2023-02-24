import React, { ReactNode } from "react";
import { useEffect, useCallback } from "react";
import { checkForParentOfType } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setLastSecondRowCardNumber, setBridgeCards, setIsCardVideoOpen, bridgeCardsSelector, isCardVideoOpenSelector, lastSecondRowCardNumberSelector } from "../../slices/bridgeSlice";
import { isMobileSelector, viewPortWidthSelector } from "../../slices/generalSlice";
import { CARD_OPEN_CLASSNAME, CARD_DEFAULT_CLASSNAME } from "../constants";
import { FOREGROUND_VIDEO_CLASSNAME } from "../VideoPlayer/Video";

interface CardManagerProps {
  children: ReactNode,
}

export enum CardTransformOptions {
	center = "center",
	top = "top",
	bottom = "bottom",
	left = "left",
	right = "right",
	topLeft = "top left",
	topRight = "top right",
	bottomLeft = "bottom left",
	bottomRight = "bottom right",
}

//Responsible for changing transform origin on cards if the rows change due to viewport width
export const CardManager: React.FC<CardManagerProps> = ({
	children,
}) => {
	//#region Init
	const dispatch = useAppDispatch();
	const isMobile = useAppSelector(isMobileSelector);
	const viewPortWidth  = useAppSelector(viewPortWidthSelector);
	const lastSecondRowCardNumber  = useAppSelector(lastSecondRowCardNumberSelector);
	const bridgeCards  = useAppSelector(bridgeCardsSelector);
	const isCardVideoOpen  = useAppSelector(isCardVideoOpenSelector);
	//#endregion
	
	//#region Functions/Handlers
	const memoizedCheckForChanges = useCallback(() => {
		const getSecondRowStartCardNumber = () => {
			if (!bridgeCards) return;
			let cardNumberToReturn = -1;
			let previousTop = -1;
			for (let i = 0; i < bridgeCards.length; i++) {
				const card = bridgeCards[i];
				const currentTop = card.getBoundingClientRect().top;
				if (previousTop === -1) {
					previousTop = currentTop;
					continue;
				}
				if (previousTop !== currentTop) return i;
			}
			return cardNumberToReturn;
		};

		const secondRowCardNumber = getSecondRowStartCardNumber();
		if (secondRowCardNumber !== lastSecondRowCardNumber) {
			if (secondRowCardNumber) dispatch(setLastSecondRowCardNumber(secondRowCardNumber));
		}
	}, [lastSecondRowCardNumber, setLastSecondRowCardNumber, dispatch, bridgeCards]);
	//#endregion
	
	//#region Side FXs
	//whenever lastSecondRowCardNumber changes,
	useEffect(() => {
		const setTransformOrigins = () => {
			const rowLength = lastSecondRowCardNumber;
			const numberOfRows = Math.ceil((bridgeCards || []).length / rowLength);
			

			for (let i = 0; i < (bridgeCards || []).length; i++) {
				const card = (bridgeCards || [])[i];
				const isTopRow = i < lastSecondRowCardNumber;
				const isBottomRow = i > rowLength * (numberOfRows - 1) - 1;
				const isFirstInRow = i === 0 || i % rowLength === 0;
				const isLastInRow = (i + 1) % rowLength === 0;

				let transformOriginToUse = CardTransformOptions.topLeft;
				if (isTopRow) {
					//1st: top left
					//middle: top
					//last: top right
					if (numberOfRows > 2) {
						card.style.transformOrigin = CardTransformOptions.top;
						continue;
					}
					if (isFirstInRow) {
						transformOriginToUse = CardTransformOptions.topLeft;
					} else if (isLastInRow)
						transformOriginToUse = CardTransformOptions.topRight;
					else transformOriginToUse = CardTransformOptions.top;
				} else if (isBottomRow) {
					//1st: bottom left
					//middle: bottom
					//last: bottom right
					if (numberOfRows > 2) {
						card.style.transformOrigin = CardTransformOptions.bottom;
						continue;
					}
					if (isFirstInRow)
						transformOriginToUse = CardTransformOptions.bottomLeft;
					else if (isLastInRow)
						transformOriginToUse = CardTransformOptions.bottomRight;
					else transformOriginToUse = CardTransformOptions.bottom;
				} else {
					//middle rows:
					//1st: left
					//middle: top if middle row or above otherwise bottom
					//last: right
					if (numberOfRows > 2) {
						card.style.transformOrigin = CardTransformOptions.center;
						continue;
					}
					if (isFirstInRow) transformOriginToUse = CardTransformOptions.left;
					else if (isLastInRow)
						transformOriginToUse = CardTransformOptions.right;
					else {
						const middleRow = Math.ceil(numberOfRows / 2);
						const cutoffIndex = middleRow * rowLength - 1;

						if (i <= cutoffIndex)
							transformOriginToUse = CardTransformOptions.top;
						else transformOriginToUse = CardTransformOptions.bottom;
					}
				}

				card.style.transformOrigin = transformOriginToUse;
			}
		};

		if (!bridgeCards) return;
		setTransformOrigins();
	}, [lastSecondRowCardNumber, bridgeCards]);

	//Initial Load Check if need to change transform origins
	useEffect(() => {
		memoizedCheckForChanges();
	}, [memoizedCheckForChanges]);

	useEffect(() => {
		dispatch(setBridgeCards(document.querySelectorAll(".card") as any));
	}, [setBridgeCards, dispatch]);

	//check if need to change transform origins when viewPortWidth changes
	useEffect(() => {
		if (!isMobile) return;
		memoizedCheckForChanges();
	}, [viewPortWidth, isMobile, memoizedCheckForChanges]);

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (!isCardVideoOpen) return;
			const isFgVideoClick = checkForParentOfType(
				e.target as HTMLElement,
				"video",
				FOREGROUND_VIDEO_CLASSNAME,
			);
			if (!isFgVideoClick) {
				const cards = document.querySelectorAll(".card");
				for (let i = 0; i < cards.length; i++) {
					const card = cards[i];
					if (!card) continue;
					if (card.classList.contains(CARD_OPEN_CLASSNAME)) {
						card.className = CARD_DEFAULT_CLASSNAME;
						const video = card.querySelector("video");
						if (!video) break;
						video.currentTime = 0;
						video.pause();
						break;
					}
				}
				dispatch(setIsCardVideoOpen(false));
			}
		};

		window.addEventListener("click", handleClick);

		return () => {
			window.removeEventListener("click", handleClick);
		};
	}, [isCardVideoOpen, setIsCardVideoOpen, dispatch]);
	//#endregion

	return <React.Fragment>{children}</React.Fragment>;
};