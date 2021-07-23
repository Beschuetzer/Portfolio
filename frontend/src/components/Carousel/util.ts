import { CSSProperties, RefObject } from "react";
import { ANIMATION_DURATION, HIDDEN_CLASSNAME } from "../constants";

export const CAROUSEL_CLASSNAME = "carousel";
export const CAROUSEL_TRANSLATION_CSS_CLASSNAME = `--${CAROUSEL_CLASSNAME}-item-translation-x`;
export const CAROUSEL_VIDEO_CLASSNAME = `${CAROUSEL_CLASSNAME}__video`;

export const CAROUSEL_IMAGE_CLASSNAME = `${CAROUSEL_CLASSNAME}__image`;
export const CAROUSEL_ITEM_CLASSNAME = `${CAROUSEL_CLASSNAME}__item`;
export const CAROUSEL_TRANSITION_CLASSNAME = "carousel-transition";
export const CAROUSEL_DESCRIPTION_CLASSNAME = `${CAROUSEL_IMAGE_CLASSNAME}-description`;
export const CAROUSEL_DOT_CLASSNAME = `${CAROUSEL_CLASSNAME}__dot`;
export const CAROUSEL_DOT_ACTIVE_CLASSNAME = `${CAROUSEL_DOT_CLASSNAME}--active`;
export const CAROUSEL_ARROW_BUTTONS_CLASSNAME = `${CAROUSEL_CLASSNAME}__arrow-button`;
export const CAROUSEL_ARROW_BUTTON_LEFT_CLASSNAME = `${CAROUSEL_ARROW_BUTTONS_CLASSNAME}--left`;
export const CAROUSEL_ARROW_BUTTON_RIGHT_CLASSNAME = `${CAROUSEL_ARROW_BUTTONS_CLASSNAME}--right`;
export const CAROUSEL_MIN_IMAGE_COUNT = 0;

export interface CarouselItemProps {
	descriptionClassname: string | undefined;
	itemClassName: string | undefined;
	imageClassname: string | undefined;
	videoClassname: string | undefined;
	foregroundVideoClassname: string | undefined;
	description: string | undefined;
	itemSrc: string | undefined;
	leftArrowRef: RefObject<HTMLElement> | undefined;
	rightArrowRef: RefObject<HTMLElement> | undefined;
	videoType?: "mp4" | "ogv" | "webm" | "ogg" | undefined;
	videoAutoPlay?: boolean | undefined;
	videoLoop?: boolean | undefined;
	videoPlaySVGXLinkHref: string | undefined;
	videoPlayControlSvgXLinkHref?: string | undefined;
	videoStopControlSvgXLinkHref?: string | undefined;
	videoRestartControlSvgXLinkHref?: string | undefined;
	videoPauseControlSvgXLinkHref?: string | undefined;
	videoCloseControlSvgXLinkHref?: string | undefined;
	videoCloseControlClassesToRemove?: string | undefined;
	videoOverlayStyles?: CSSProperties | undefined;
	videoOverlayText?: string | undefined;
	videoOverlayChildren?: any | undefined;
	videoExtentions?: string[] | undefined;
	functionToRunOnClose?: any | undefined;
	functionToGetContainer?: any | undefined;
}

export function setArrowButtonsHiddenClass(
	CAROUSEL_MIN_IMAGE_COUNT: number,
	maxImageCount: number,
	currentTranslationFactor: number,
	leftArrowRef: RefObject<HTMLElement>,
	rightArrowRef: RefObject<HTMLElement>,
	numberOfItemsInCarouselAtOneTime: number,
	numberOfItemsToScrollOnClick: number,
) {
	const leftArrow = (leftArrowRef.current as any)[0];
	const rightArrow = (rightArrowRef.current as any)[0];
	if (currentTranslationFactor === 0) {
		leftArrow.classList.add(HIDDEN_CLASSNAME);
		return rightArrow.classList.remove(HIDDEN_CLASSNAME);
	}

	if (!leftArrow || !rightArrow) return;

	leftArrow.classList.remove(HIDDEN_CLASSNAME);
	rightArrow.classList.remove(HIDDEN_CLASSNAME);

	const currentCount =
		numberOfItemsInCarouselAtOneTime +
		currentTranslationFactor * numberOfItemsToScrollOnClick -
		1;

	if (currentCount <= CAROUSEL_MIN_IMAGE_COUNT)
		leftArrow.classList.add(HIDDEN_CLASSNAME);
	if (currentCount >= maxImageCount) rightArrow.classList.add(HIDDEN_CLASSNAME);
}

export function setCurrentActiveButton(indexOfActiveDot: number) {
	const dots = document.querySelectorAll(`.${CAROUSEL_DOT_CLASSNAME}`);
	for (let i = 0; i < dots.length; i++) {
		const dot = dots[i];
		if (i !== indexOfActiveDot)
			dot?.classList.remove(CAROUSEL_DOT_ACTIVE_CLASSNAME);
		else dot?.classList.add(CAROUSEL_DOT_ACTIVE_CLASSNAME);
	}
}

export function setTranslationAmount(
	amountToTranslateImages: number,
	removeTransitionTimeout: number,
	itemsRef: RefObject<HTMLElement>,
) {
	clearInterval(removeTransitionTimeout);

	const itemElements = (itemsRef as any).current;
	for (let i = 0; i < itemElements.length; i++) {
		const item = itemElements[i];
		item?.classList.add(CAROUSEL_TRANSITION_CLASSNAME);
	}

	const newValue = `${CAROUSEL_TRANSLATION_CSS_CLASSNAME}: -${amountToTranslateImages}px`;
	document.documentElement.style.cssText += newValue;

	return setTimeout(() => {
		for (let i = 0; i < itemElements.length; i++) {
			const item = itemElements[i];
			item?.classList.remove(CAROUSEL_TRANSITION_CLASSNAME);
		}
	}, ANIMATION_DURATION / 2);
}

export const handleSetTranslation = (
	e: Event,
	currentTranslationFactor: number,
	numberOfItemsToScrollOnClick: number,
	numberOfItemsInCarouselAtOneTime: number,
	items: any[],
): number => {
	const maxImageCount =
		numberOfItemsToScrollOnClick === 1
			? items.length - +numberOfItemsInCarouselAtOneTime
			: items.length - 1;

	let hasClickedLeftArrow = false;
	if (
		(e.currentTarget as HTMLElement)?.classList.contains(
			CAROUSEL_ARROW_BUTTON_LEFT_CLASSNAME,
		)
	)
		hasClickedLeftArrow = true;

	if (hasClickedLeftArrow) {
		if (!Number.isInteger(currentTranslationFactor))
			currentTranslationFactor = Math.floor(currentTranslationFactor);
		else currentTranslationFactor -= 1;
	} else {
		if (!Number.isInteger(currentTranslationFactor))
			currentTranslationFactor = Math.ceil(currentTranslationFactor);
		else currentTranslationFactor += 1;
	}

	setCurrentActiveButton(
		currentTranslationFactor * numberOfItemsToScrollOnClick,
	);

	if (
		currentTranslationFactor * numberOfItemsToScrollOnClick <
		CAROUSEL_MIN_IMAGE_COUNT
	) {
		return CAROUSEL_MIN_IMAGE_COUNT;
	} else if (
		currentTranslationFactor * numberOfItemsToScrollOnClick >
		maxImageCount
	) {
		return Math.floor(maxImageCount / numberOfItemsToScrollOnClick);
	}
	return currentTranslationFactor;
};

export const getCurrentTranslationFactorFromDots = (
  e: MouseEvent,
  items: any[],
  itemsRef: RefObject<HTMLElement>,
	itemsWidthRef: RefObject<HTMLElement>,
  leftArrowRef: RefObject<HTMLElement>,
  rightArrowRef: RefObject<HTMLElement>,
  numberOfItemsInCarouselAtOneTime: number,
	numberOfItemsToScrollOnClick: number,
	removeTransitionTimeout: any,
) => {
	let indexOfCurrentDot = -1;
	let indexOfDotToMoveTo = -1;

	const dots = document.querySelectorAll(`.${CAROUSEL_DOT_CLASSNAME}`);
	const clickedOnDot = e.currentTarget;

	for (let i = 0; i < dots.length; i++) {
		const dot = dots[i];
		if (dot === clickedOnDot) indexOfDotToMoveTo = i;
		else if (dot?.classList.contains(CAROUSEL_DOT_ACTIVE_CLASSNAME))
			indexOfCurrentDot = i;

		if (indexOfCurrentDot !== -1 && indexOfDotToMoveTo !== -1) break;
	}

	const amountToTranslateImages =
		(itemsWidthRef as any).current * indexOfDotToMoveTo;

	const currentTranslationFactor =
		indexOfDotToMoveTo / numberOfItemsToScrollOnClick;

	setArrowButtonsHiddenClass(
		0,
		items.length - 1,
		indexOfDotToMoveTo === 0 ? 0 : currentTranslationFactor,
		leftArrowRef as any,
		rightArrowRef as any,
		numberOfItemsInCarouselAtOneTime,
		numberOfItemsToScrollOnClick,
	);

	removeTransitionTimeout = setTranslationAmount(
		amountToTranslateImages,
		removeTransitionTimeout,
		itemsRef as any,
	);
	dots[indexOfDotToMoveTo]?.classList.add(CAROUSEL_DOT_ACTIVE_CLASSNAME);
	dots[indexOfCurrentDot]?.classList.remove(CAROUSEL_DOT_ACTIVE_CLASSNAME);

	return [currentTranslationFactor, removeTransitionTimeout];
};
