import { CSSProperties, RefObject } from "react";
import {
	ArrowButtonDirection,
	carouselGridWidth,
	CONTAINS_CAROUSEL_CLASSNAME,
	HIDDEN_CLASSNAME,
	TRANSFORM_REMOVED_CLASSNAME,
} from "../constants";
import { toggleScrollability } from "../utils";
import { getIsVideoPlaying } from "../VideoPlayer/utils";
import { FULLSCREEN_PARENT_CLASSNAME, PLAYING_CLASSNAME } from "./CarouselItem";

export const CAROUSEL_CLASSNAME = "carousel";
export const CAROUSEL_TRANSLATION_CSS_CLASSNAME = `--${CAROUSEL_CLASSNAME}-item-translation-x`;
export const CAROUSEL_VIDEO_CLASSNAME = `${CAROUSEL_CLASSNAME}__video`;

export const CAROUSEL_IMAGE_CLASSNAME = `${CAROUSEL_CLASSNAME}__image`;
export const CAROUSEL_ITEM_CLASSNAME = `${CAROUSEL_CLASSNAME}__item`;
export const CAROUSEL_TRANSITION_CLASSNAME = "carousel-transition";
export const CAROUSEL_DESCRIPTION_CLASSNAME = `${CAROUSEL_ITEM_CLASSNAME}-description`;
export const CAROUSEL_DOT_CLASSNAME = `${CAROUSEL_CLASSNAME}__dot`;
export const CAROUSEL_DOT_ACTIVE_CLASSNAME = `${CAROUSEL_DOT_CLASSNAME}--active`;
export const CAROUSEL_ARROW_BUTTONS_CLASSNAME = `${CAROUSEL_CLASSNAME}__arrow-button`;
export const CAROUSEL_ARROW_BUTTON_LEFT_CLASSNAME = `${CAROUSEL_ARROW_BUTTONS_CLASSNAME}--left`;
export const CAROUSEL_ARROW_BUTTON_RIGHT_CLASSNAME = `${CAROUSEL_ARROW_BUTTONS_CLASSNAME}--right`;
export const CAROUSEL_MIN_IMAGE_COUNT = 0;

export const CAROUSEL_GRID_MAX_COLUMN_WIDTH_DEFAULT = "1.6rem";
export const CAROUSEL_GRID_MAX_COLUMN_WIDTHS: [number, string][] = [
	//1st index is number of items and second is the width
	[7, "15rem"],
	[8, "12rem"],
	[12, "10rem"],
	[13, "7rem"],
];

export interface CarouselItemProps {
	descriptionClassname: string | undefined;
	itemClassName: string | undefined;
	imageClassname: string | undefined;
	videoClassname: string | undefined;
	foregroundVideoClassname: string | undefined;
	description: string | undefined;
	itemSrc: string | undefined;
	itemThumbnailSrc: string | undefined;
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
	shouldRenderFullScreen?: boolean;
}

export function setArrowButtonsHiddenClass(
	CAROUSEL_MIN_IMAGE_COUNT: number,
	maxImageCount: number,
	currentTranslationFactor: number,
	leftArrowRef: RefObject<HTMLElement>,
	rightArrowRef: RefObject<HTMLElement>,
	numberOfItemsInCarouselWidthWise: number,
	numberOfItemsToScrollOnClick: number,
) {
	const leftArrow = leftArrowRef.current as any;
	const rightArrow = rightArrowRef.current as any;
	if (currentTranslationFactor === 0) {
		leftArrow.classList.add(HIDDEN_CLASSNAME);
		return rightArrow.classList.remove(HIDDEN_CLASSNAME);
	}

	if (!leftArrow || !rightArrow) return;

	leftArrow.classList.remove(HIDDEN_CLASSNAME);
	rightArrow.classList.remove(HIDDEN_CLASSNAME);

	const currentCount =
		numberOfItemsInCarouselWidthWise +
		currentTranslationFactor * numberOfItemsToScrollOnClick -
		1;

	let numberOfRows = 1;
	if (
		getCarouselGridMaxColumnWidth(maxImageCount + 1) !==
		CAROUSEL_GRID_MAX_COLUMN_WIDTH_DEFAULT
	)
		numberOfRows = 2;

	if (currentCount <= CAROUSEL_MIN_IMAGE_COUNT)
		leftArrow.classList.add(HIDDEN_CLASSNAME);
	if (currentCount >= maxImageCount / numberOfRows)
		rightArrow.classList.add(HIDDEN_CLASSNAME);
}

export function setActiveDot(
	items: CarouselItemProps[],
	indexOfActiveDot: number,
) {
	const { csharpParentCarousel } = getFirstItemAndParentCarousels(items);

	const dots = csharpParentCarousel?.querySelectorAll(
		`.${CAROUSEL_DOT_CLASSNAME}`,
	);
	if (!dots) return;

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
	itemsRef: RefObject<NodeListOf<Element>>,
) {
	clearInterval(removeTransitionTimeout);
	const itemElements = (itemsRef as any).current;

	return setTimeout(() => {
		for (let i = 0; i < itemElements.length; i++) {
			const item = itemElements[i] as HTMLElement;
			const string = `translate(-${amountToTranslateImages}px, 0)`;
			item.style.transform = string;
		}
	}, 1);
}

export function toggleMobileDisplayIssueFixes() {
	const pageWrapper = document.querySelector('.page-wrapper') as HTMLElement;
	const sections = document.querySelectorAll('.csharp__section');

	if (pageWrapper?.classList.contains(TRANSFORM_REMOVED_CLASSNAME)) {
		pageWrapper?.classList.remove(TRANSFORM_REMOVED_CLASSNAME);
		sections?.forEach((section) => {
			if (!section.classList.contains(CONTAINS_CAROUSEL_CLASSNAME)) {
				section.classList.remove(HIDDEN_CLASSNAME);
			}
		});
		toggleScrollability();
	} else {
		pageWrapper?.classList.add(TRANSFORM_REMOVED_CLASSNAME);
		sections?.forEach((section) => {
			if (!section.classList.contains(CONTAINS_CAROUSEL_CLASSNAME)) {
				section.classList.add(HIDDEN_CLASSNAME);
			}
		});
		toggleScrollability(false);
	}
}

export const handleSetTranslation = (
	e: Event | null,
	currentTranslationFactor: number,
	numberOfItemsToScrollOnClick: number,
	numberOfItemsInCarouselWidthWise: number,
	items: CarouselItemProps[],
): number => {

	const maxImageCount =
		numberOfItemsToScrollOnClick === 1
			? items.length - +numberOfItemsInCarouselWidthWise
			: items.length - 1;

	let hasClickedLeftArrow: boolean | null = false;
	if (
		(e?.currentTarget as HTMLElement)?.classList.contains(
			CAROUSEL_ARROW_BUTTON_LEFT_CLASSNAME,
		)
	)
		hasClickedLeftArrow = true;

	if (!e) hasClickedLeftArrow = null;

	if (hasClickedLeftArrow === true) {
		if (!Number.isInteger(currentTranslationFactor))
			currentTranslationFactor = Math.floor(currentTranslationFactor);
		else currentTranslationFactor -= 1;
	} else if (hasClickedLeftArrow === false) {
		if (!Number.isInteger(currentTranslationFactor))
			currentTranslationFactor = Math.ceil(currentTranslationFactor);
		else currentTranslationFactor += 1;
	}

	setActiveDot(
		items,
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
	items: CarouselItemProps[],
	itemsRef: RefObject<NodeListOf<Element>>,
	itemsWidthRef: RefObject<HTMLElement>,
	leftArrowRef: RefObject<HTMLElement>,
	rightArrowRef: RefObject<HTMLElement>,
	numberOfItemsInCarouselWidthWise: number,
	numberOfItemsToScrollOnClick: number,
	removeTransitionTimeout: any,
) => {
	let indexOfCurrentDot = -1;
	let indexOfDotToMoveTo = -1;

	const { csharpParentCarousel } = getFirstItemAndParentCarousels(items);
	const dots = csharpParentCarousel?.querySelectorAll(
		`.${CAROUSEL_DOT_CLASSNAME}`,
	);
	const clickedOnDot = e.currentTarget;

	if (!dots) return [0, -1];
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
		numberOfItemsInCarouselWidthWise,
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

export const getNthItemOpen = (
	e: Event,
	leftArrow: HTMLElement,
	rightArrow: HTMLElement,
	direction: ArrowButtonDirection | null,
) => {
	const defaultReturn = {
		isNotFirstItem: undefined,
		isNotLastItem: undefined,
		nthItemOpen: undefined,
		items: undefined,
		direction: undefined,
	};

	const clickedItem = (e.currentTarget as HTMLElement).closest(
		`.${CAROUSEL_ITEM_CLASSNAME}`,
	);
	const carousel = rightArrow?.parentNode as HTMLElement;
	const items = carousel?.querySelectorAll(`.${CAROUSEL_ITEM_CLASSNAME}`);
	if (!items || items?.length <= 0) return defaultReturn;

	let nthItemOpen = -1;

	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		if (
			nthItemOpen === -1 &&
			(item.classList.contains(FULLSCREEN_PARENT_CLASSNAME) ||
				clickedItem === item)
		) {
			nthItemOpen = i;
		}
		item.classList.remove(FULLSCREEN_PARENT_CLASSNAME);
	}

	if (nthItemOpen === -1 && direction !== null) return defaultReturn;

	let isNotLastItem = nthItemOpen < items?.length - 1;
	let isNotFirstItem = nthItemOpen > 0;
	if (direction === "left" && isNotFirstItem) {
		nthItemOpen--;
	} else if (direction === "right" && isNotLastItem) {
		nthItemOpen++;
	}

	if (direction === "left" || direction === "right") {
		isNotLastItem = nthItemOpen < items?.length - 1;
		isNotFirstItem = nthItemOpen > 0;
	}

	return { isNotFirstItem, isNotLastItem, nthItemOpen, items };
};

export const toggleLeftAndRightArrows = (
	leftArrow: HTMLElement,
	rightArrow: HTMLElement,
	isNotFirstItem: boolean,
	isNotLastItem: boolean,
) => {
	if (isNotFirstItem) leftArrow?.classList.remove(HIDDEN_CLASSNAME);
	else leftArrow?.classList.add(HIDDEN_CLASSNAME);

	if (isNotLastItem) rightArrow?.classList.remove(HIDDEN_CLASSNAME);
	else rightArrow?.classList.add(HIDDEN_CLASSNAME);
};

export function handleVideo(
	carouselItem: HTMLElement,
	videoClassname: string,
	foregroundVideoClassname: string,
	handleVideoEnd?: (e: Event) => void,
	onVideoProgress?: (
		videoRef: RefObject<HTMLVideoElement>,
		progressBarRef: RefObject<HTMLProgressElement>,
		e: Event,
	) => void,
) {
	if (
		carouselItem.classList.contains(videoClassname) ||
		carouselItem.classList.contains(foregroundVideoClassname)
	) {
		const video = carouselItem.querySelector("video") as HTMLVideoElement;
		const isPlaying = getIsVideoPlaying(video);

		if (isPlaying) {
			resetCarouselVideo(carouselItem, video);
			if (onVideoProgress)
				video.removeEventListener("timeupdate", onVideoProgress as any);
		} else if (!carouselItem.classList.contains(PLAYING_CLASSNAME)) {
			carouselItem.classList.add(PLAYING_CLASSNAME);
			video.play();
			if (handleVideoEnd) video.addEventListener("ended", handleVideoEnd);
			if (onVideoProgress) {
				video.addEventListener("timeupdate", onVideoProgress as any);
			}
		}
	}
}

export function resetCarouselVideo(
	carouselItem: HTMLElement,
	video: HTMLVideoElement,
) {
	carouselItem.classList.remove(PLAYING_CLASSNAME);
	video.currentTime = 0;
	video.pause();
}

export function getCarouselGridMaxColumnWidth(numberOfItemsInCarousel: number) {
	if (numberOfItemsInCarousel === undefined || numberOfItemsInCarousel === null)
		return;
	const firstItem = CAROUSEL_GRID_MAX_COLUMN_WIDTHS[0];
	const lastItem =
		CAROUSEL_GRID_MAX_COLUMN_WIDTHS[CAROUSEL_GRID_MAX_COLUMN_WIDTHS.length - 1];

	let valueToUse = "-1";

	if (numberOfItemsInCarousel < firstItem[0])
		return CAROUSEL_GRID_MAX_COLUMN_WIDTH_DEFAULT;
	if (numberOfItemsInCarousel >= lastItem[0]) return lastItem[1];

	for (let i = 0; i < CAROUSEL_GRID_MAX_COLUMN_WIDTHS.length - 1; i++) {
		const item = CAROUSEL_GRID_MAX_COLUMN_WIDTHS[i];
		const nextItem = CAROUSEL_GRID_MAX_COLUMN_WIDTHS[i + 1];

		if (item[0] === numberOfItemsInCarousel) {
			valueToUse = item[1];
			break;
		}

		if (
			item[0] < numberOfItemsInCarousel &&
			nextItem[0] >= numberOfItemsInCarousel
		) {
			valueToUse = nextItem[1];
			break;
		}
	}

	return valueToUse;
}

export function setCarouselGridMaxColumnWidth(
	itemsRef: RefObject<NodeListOf<Element>>,
) {
	if (!itemsRef || !itemsRef.current) return;

	const maxWidthToUse = getCarouselGridMaxColumnWidth(itemsRef.current.length);

	if (!maxWidthToUse) return;

	const parentCarousel = (itemsRef.current[0] as HTMLElement).closest(
		`.${CAROUSEL_CLASSNAME}`,
	) as HTMLElement;

	const newValue = `repeat(auto-fill,	minmax(${carouselGridWidth}, ${maxWidthToUse}))`;
	if (parentCarousel)
		parentCarousel.style.setProperty("grid-template-columns", newValue);
}

export function getFirstItemAndParentCarousels(items: CarouselItemProps[]) {
	let firstItem = document.querySelector(
		`[src="${(items[0] as CarouselItemProps).itemThumbnailSrc}"]`,
	) as HTMLElement;

	if (!firstItem)
		firstItem = document.querySelector(
			`[src="${(items[0] as CarouselItemProps).itemSrc}"]`,
		) as HTMLElement;

	const csharpParentCarousel = firstItem?.closest(
		`.csharp__${CAROUSEL_CLASSNAME}`,
	);
	const parentCarousel = firstItem?.closest(`.${CAROUSEL_CLASSNAME}`);

	return { firstItem, csharpParentCarousel, parentCarousel };
}

export function getArrangedItems(
	items: NodeListOf<Element> | CarouselItemProps[],
	shouldRearrange: boolean,
	numberOfItemsInCarouselWidthWise: number,
) {
	const minCutOff = +CAROUSEL_GRID_MAX_COLUMN_WIDTHS[0][0];

	if (!shouldRearrange || items.length < minCutOff) return items;

	const front = [];
	const back = [];

	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		if (Math.floor(i / numberOfItemsInCarouselWidthWise) % 2 === 1)
			back.push(item);
		else front.push(item);
	}

	return [...front, ...back];
}
