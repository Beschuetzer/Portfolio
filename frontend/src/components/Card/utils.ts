import { RefObject } from "react";
import { bridgeSections, BRIDGE_BACKDROP_CLASSNAME, BRIDGE_SECTION_TITLES_CLASSNAME } from "../../pages/examples/bridge/utils";
import { MOBILE_BREAK_POINT_WIDTH, Reference } from "../constants";
import { closeVideo, getPercentOfProgressBar } from "../VideoPlayer/utils";

export const CARD_MOUSE_LEAVE_INDEX_SWITCH_DURATION = 75;
export const CARD_DONE_CLASSNAME = "card--done";
export const CARD_STOPPED_CLASSNAME = "card--stopped";
export const CARD_OPEN_CLASSNAME = "card--open";
export const CARD_PLAYING_CLASSNAME = "card--playing";
export const CARD_DEFAULT_CLASSNAME = "card card--hoverable";

export const changeSectionTitle = (
	titleRef: RefObject<HTMLElement> | HTMLElement,
	isOpen = true,
) => {
	if (!titleRef) return;
	const originalMsgTitle = "Features";
	const originalMsgSubTitle = "Pick a Card any Card";

	const sections = document.querySelectorAll(".bridge__section");
	for (let i = 0; i < sections.length; i++) {
		const section = sections[i];
		if (section.id.match(/feature/i)) {
			const title = section.querySelector(".bridge__section-title");

			let msgTitleToUse = originalMsgTitle as string | null | undefined;
			let msgSubTitleToUse = originalMsgSubTitle;
			if (isOpen) {
				if (titleRef && (titleRef as any).current)
					msgTitleToUse = (titleRef as any).current?.textContent;
				msgSubTitleToUse = "";
			}
			if (title) {
				title.textContent = msgTitleToUse as string;
				(title.nextElementSibling as any).textContent = msgSubTitleToUse;
			}
			break;
		}
	}
};

export const getFeaturesBridgeSectionTitles = () => {
	const features = document.querySelector(
		`#${(bridgeSections as any)[1]?.toLowerCase()}`,
	) as HTMLElement;
	return features.querySelector(`.${BRIDGE_SECTION_TITLES_CLASSNAME}`);
};

export const getGapAmount = (
	video: HTMLVideoElement,
) => {
	const featuresBridgeSectionTitles = getFeaturesBridgeSectionTitles() as HTMLElement;
	const bridgeSectionBounds =
		featuresBridgeSectionTitles.getBoundingClientRect();
	const videoBounds = video.getBoundingClientRect();
	return videoBounds.top - bridgeSectionBounds.bottom;
};

export const getCardScaleOnHoverAmount = (
	card: HTMLElement,
	cardDimensions: ClientRect,
) => {
	let cardToUseAsReference = document.querySelector(".card")!;

	if (cardToUseAsReference === card) {
		const cards = document.querySelectorAll(".card");
		cardToUseAsReference = cards[cards.length - 1];
	}

	const cardToUseAsReferenceDimensions =
		cardToUseAsReference.getBoundingClientRect();
	const valueToReturn =
		cardDimensions.height / cardToUseAsReferenceDimensions.height;
	return valueToReturn;
};

export const getCardCoordinates = (
	card: HTMLElement,
	cardDimensions: ClientRect,
	viewPortWidth: number,
	isMobile: boolean,
) => {
	let cardLeftOriginal = cardDimensions.left;
	let cardRightOriginal = cardDimensions.right;
	let cardTopOriginal = cardDimensions.top;
	let cardBottomOriginal = cardDimensions.bottom;
	let cardCenterXOriginal =
		(cardRightOriginal - cardLeftOriginal) / 2 + cardLeftOriginal;
	let cardCenterYOriginal =
		(cardBottomOriginal - cardTopOriginal) / 2 + cardTopOriginal;

	if (viewPortWidth > MOBILE_BREAK_POINT_WIDTH) {
		cardLeftOriginal = cardDimensions.left + (cardDimensions.width * 1) / 6;
		cardRightOriginal = cardDimensions.right - (cardDimensions.width * 1) / 6;

		cardTopOriginal = cardDimensions.top + (cardDimensions.height * 1) / 6;
		cardBottomOriginal =
			cardDimensions.bottom - (cardDimensions.height * 1) / 6;

		cardCenterXOriginal =
			(cardRightOriginal - cardLeftOriginal) / 2 + cardLeftOriginal;
		cardCenterYOriginal =
			(cardBottomOriginal - cardTopOriginal) / 2 + cardTopOriginal;
	}

	const transformOrigin = getComputedStyle(card)["transformOrigin"];
	const split = transformOrigin.split(" ");
	const yCornerOffset = isMobile ? 1.75 : 1.85;
	const xCornerOffset = 1.1675;
	const cardScaleOnHoverAmount = getCardScaleOnHoverAmount(
		card,
		cardDimensions,
	);
	const yTransformOffset = parseFloat(split[0]);
	const xTransformOffset = parseFloat(split[1]);
	const xValueToMatch = cardDimensions.width / cardScaleOnHoverAmount;
	const yValueToMatch = cardDimensions.height / cardScaleOnHoverAmount;
	const xCondition = Math.abs(yTransformOffset - xValueToMatch) < 1;
	const yCondition = Math.abs(xTransformOffset - yValueToMatch) < 1;
	const xConditionHalf = Math.abs(yTransformOffset * 2 - xValueToMatch) < 1;
	const yConditionHalf = Math.abs(xTransformOffset * 2 - yValueToMatch) < 1;

	const isTransformOriginTopLeft =
		xTransformOffset === 0 && yTransformOffset === 0;
	const isTransformOriginTopRight = xTransformOffset === 0 && xCondition;
	const isTransformOriginBottomLeft = yCondition && yTransformOffset === 0;
	const isTransformOriginBottomRight = yCondition && xCondition;
	const isTransformOriginTop = xTransformOffset === 0 && xConditionHalf;
	const isTransformOriginBottom = yCondition && xConditionHalf;
	const isTransformOriginLeft = yTransformOffset === 0 && yConditionHalf;
	const isTransformOriginRight = xCondition && yConditionHalf;

	// console.log('xTransformOffset =', xTransformOffset);
	// console.log('yTransformOffset =', yTransformOffset);
	// console.log('cardDimensions =', cardDimensions);
	// console.log('xValueToMatch =', xValueToMatch);
	// console.log('yValueToMatch =', yValueToMatch);
	// console.log('xCondition =', xCondition);
	// console.log('yCondition =', yCondition);
	// console.log('xConditionHalf =', xConditionHalf);
	// console.log('yConditionHalf =', yConditionHalf);
	// console.log('something------------------------------------------------');
	// console.log('isTransformOriginTopLeft =', isTransformOriginTopLeft);
	// console.log('isTransformOriginTopRight =', isTransformOriginTopRight);
	// console.log('isTransformOriginBottomLeft =', isTransformOriginBottomLeft);
	// console.log('isTransformOriginBottomRight =', isTransformOriginBottomRight);
	// console.log('isTransformOriginTop =', isTransformOriginTop);
	// console.log('isTransformOriginBottom =', isTransformOriginBottom);
	// console.log('isTransformOriginLeft =', isTransformOriginLeft);
	// console.log('isTransformOriginRight =', isTransformOriginRight);
	// console.log('Math.abs(yTransformOffset - valueToMatch) =', Math.abs(yTransformOffset - xValueToMatch));

	if (isTransformOriginTopLeft || isTransformOriginTopRight) {
		cardCenterYOriginal =
			cardCenterYOriginal +
			cardDimensions.height / cardScaleOnHoverAmount / yCornerOffset;
	} else if (isTransformOriginBottomLeft || isTransformOriginBottomRight) {
		cardCenterYOriginal =
			cardCenterYOriginal -
			cardDimensions.height / cardScaleOnHoverAmount / yCornerOffset;
	}

	if (isTransformOriginTopLeft || isTransformOriginBottomLeft) {
		cardCenterXOriginal =
			cardCenterXOriginal + cardDimensions.width * xCornerOffset;
	} else if (isTransformOriginTopRight || isTransformOriginBottomRight) {
		cardCenterXOriginal =
			cardCenterXOriginal - cardDimensions.width * xCornerOffset;
	} else if (isTransformOriginTop)
		cardCenterYOriginal += yTransformOffset * cardScaleOnHoverAmount;
	else if (isTransformOriginBottom)
		cardCenterYOriginal -= yTransformOffset * cardScaleOnHoverAmount;
	else if (isTransformOriginLeft)
		cardCenterXOriginal += xTransformOffset * cardScaleOnHoverAmount;
	else if (isTransformOriginRight)
		cardCenterXOriginal -= xTransformOffset * cardScaleOnHoverAmount;

	// cardCenterXOriginal += xOffset;

	return {
		cardCenterXOriginal,
		cardCenterYOriginal,
	};
};

export const adjustCardYPosition = (
	video: HTMLVideoElement,
) => {
	//calls getGapAmount then change the css translate var based on that
	const gapAmount = getGapAmount(video);
	const cardPlayingTransform = document.documentElement.style.getPropertyValue(
		"--card-playing-transform",
	);
	const split = cardPlayingTransform.split(" ");

	let translateY = split[2];
	let translateYIndex = 2;
	if (!translateY.match(/Y/)) {
		for (let i = 0; i < split.length; i++) {
			const splitString = split[i];
			if (splitString.match(/Y/)) {
				translateY = splitString;
				translateYIndex = i;
			}
		}
	}
	const startParenthIndex = translateY.indexOf("(");
	const endParenthIndex = translateY.indexOf(")");
	const currentValue = translateY.slice(
		startParenthIndex + 1,
		endParenthIndex - 2,
	);

	split[translateYIndex] = `translateY(-${
		gapAmount - parseFloat(currentValue)
	}px)`;
	const newString = split.join(" ");

	document.documentElement.style.setProperty(
		"--card-playing-transform",
		newString,
	);
};

export const centerCard = (
	card: HTMLElement,
	cardDimensions: ClientRect,
	initialCardDimensions: ClientRect,
	viewPortWidth: number,
	isMobile: boolean,
) => {
	if (!card) return;

	let cardDimensionsToUse = cardDimensions;
	if (initialCardDimensions.width > cardDimensions.width)
		cardDimensionsToUse = initialCardDimensions;

	const sectionDimensions = (
		card.parentNode as HTMLElement
	).getBoundingClientRect();
	const { cardCenterXOriginal, cardCenterYOriginal } = getCardCoordinates(
		card,
		cardDimensionsToUse,
		viewPortWidth,
		isMobile,
	);

	const containerCenterX =
		(sectionDimensions.right - sectionDimensions.left) / 2 +
		sectionDimensions.left;
	const containerCenterY =
		(sectionDimensions.bottom - sectionDimensions.top) / 2 +
		sectionDimensions.top;

	let translateLeftAmount = Math.abs(cardCenterXOriginal - containerCenterX);
	let translateUpAmount = Math.abs(cardCenterYOriginal - containerCenterY);

	const cardOriginalWidth = (cardDimensionsToUse.width * 2) / 3;
	// const cardOriginalHeight = (cardDimensions.height * 2) / 3;
	const scaleXFactor = sectionDimensions.width / cardOriginalWidth;
	// const scaleYFactor = sectionDimensions.height / cardOriginalHeight;

	if (cardCenterXOriginal < containerCenterX)
		translateLeftAmount = -translateLeftAmount;

	if (cardCenterYOriginal < containerCenterY)
		translateUpAmount = -translateUpAmount;
	// console.log('------------------------------------------------');
	// console.log('card =', card);
	// console.log('card.parentNode =', card.parentNode);
	// console.log('cardLeftOriginal =', cardLeftOriginal);
	// console.log('cardRightOriginal =', cardRightOriginal);
	// console.log('cardDimensions =', cardDimensions);
	// console.log('sectionDimensions =', sectionDimensions);
	// console.log('containerCenterX =', containerCenterX);
	// console.log('cardCenterXOriginal =', cardCenterXOriginal);
	// console.log('containerCenterY =', containerCenterY);
	// console.log('cardCenterYOriginal =', cardCenterYOriginal);
	// console.log('translateLeftAmount =', translateLeftAmount);
	// console.log('translateUpAmount =', translateUpAmount);
	// console.log('scaleXFactor =', scaleXFactor);
	// console.log('scaleYFactor =', scaleYFactor);
	// console.log('------------------------------------------------');

	const newTransform = `
    translateX(${-translateLeftAmount}px) 
    translateY(${-translateUpAmount}px) 
    scaleX(${scaleXFactor})
    scaleY(${scaleXFactor})
    ;
  `;

	const newValue = `--card-playing-transform: ${newTransform}`;

	document.documentElement.style.cssText += newValue;
};

export const closeCard = (
	video: HTMLVideoElement,
	card: HTMLElement,
	titleRef: Reference,
	setIsCardVideoOpen: (value: boolean) => void,
) => {
	closeVideo(video);

	if (!titleRef) return;
	changeSectionTitle(titleRef, false);
	setIsCardVideoOpen(false);

	if (!card) return;
	card.classList.remove(CARD_OPEN_CLASSNAME);
	card.classList.remove(CARD_DONE_CLASSNAME);
	card.classList.remove(CARD_STOPPED_CLASSNAME);
};

export const checkShouldContinueOnClick = (
  videoRef: RefObject<HTMLVideoElement>,
  cardRef: RefObject<HTMLElement>,
) => {
  const clickedCard = cardRef.current as HTMLElement;
  clickedCard?.classList.add("z-index-highest");

  if (
    clickedCard?.classList.contains(CARD_DONE_CLASSNAME) ||
    clickedCard?.classList.contains(CARD_OPEN_CLASSNAME)
  )
    return [null, null, null, null];

  const initialCardSize = clickedCard?.getBoundingClientRect();
  const bridgeBackdrop = document.querySelector(
    `.${BRIDGE_BACKDROP_CLASSNAME}`,
  ) as HTMLElement;
  bridgeBackdrop?.classList.add("visible");

  const video = videoRef?.current as HTMLVideoElement;
  return [video, clickedCard, bridgeBackdrop, initialCardSize];
}

export const handleProgressBarClick = (
  videoRef: RefObject<HTMLVideoElement>,
  cardRef: RefObject<HTMLElement>,
  e: () => void,
) => {
	console.log('progress click------------------------------------------------');
  const clientX = (e as any).clientX;
  const progressBar = (e as any).currentTarget;
  if (!progressBar) return;

  const percent = getPercentOfProgressBar(progressBar, clientX);

  const video = videoRef.current;
  if (!video) return;
  video.currentTime = percent * video.duration;

  const card = cardRef.current;
  if (!card) return;
  if (!card.classList.contains(CARD_PLAYING_CLASSNAME))
    card.classList.add(CARD_STOPPED_CLASSNAME);
  if (percent < 1) card.classList.remove(CARD_DONE_CLASSNAME);
  else card.classList.add(CARD_DONE_CLASSNAME);
}


