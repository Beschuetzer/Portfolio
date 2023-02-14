import React, { RefObject, useEffect, useRef } from "react";
import {
	CarouselItem,
} from "./CarouselItem";
import CarouselArrow from "./CarouselArrow";
import {
	setArrowButtonsHiddenClass,
	setTranslationAmount,
	handleSetTranslation as getNewCurrentTranslationFactor,
	getCurrentTranslationFactorFromDots,
	getNthItemOpen,
	toggleLeftAndRightArrows as handleWhetherToDisplayArrows,
	resetCarouselVideo,
	getCarouselGridMaxColumnWidth,
	getArrangedItems,
	toggleMobileDisplayIssueFixes,
	getFirstItemAndParentCarousels,
	setCarouselGridMaxColumnWidth,
} from "./util";
import { CAROUSEL_ARROW_BUTTONS_CLASSNAME, CAROUSEL_ARROW_BUTTON_LEFT_CLASSNAME, CAROUSEL_ARROW_BUTTON_RIGHT_CLASSNAME, CAROUSEL_DOT_ACTIVE_CLASSNAME, CAROUSEL_DOT_CLASSNAME, CAROUSEL_GRID_MAX_COLUMN_WIDTH_DEFAULT, CAROUSEL_ITEM_CLASSNAME, CAROUSEL_MIN_IMAGE_COUNT, CAROUSEL_VIDEO_CLASSNAME, CONTAINS_CAROUSEL_CLASSNAME, FULLSCREEN_CLASSNAME, FULLSCREEN_PARENT_CLASSNAME, PLAYING_CLASSNAME, STOPPED_CLASSNAME } from "../constants";
import { useState } from "react";
import { toggleScrollability } from "../utils";
import { ArrowButtonDirection, CarouselItemProps } from "../../types";

export type CarouselProps = {
	items: CarouselItemProps[];
	numberOfItemsInCarouselWidthWise?: string;
	numberOfItemsToScrollOnClick?: string;
	functionToRunOnClose?: any;
	functionToGetContainer?: any;
	dotSVGXLinkHref?: string;
	shouldRearrangeItems?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
	items,
	functionToRunOnClose,
	functionToGetContainer,
	numberOfItemsInCarouselWidthWise = "3",
	numberOfItemsToScrollOnClick = "3",
	dotSVGXLinkHref = "/sprite.svg#icon-dot-single",
	shouldRearrangeItems = true,
}) => {
	const numberOfItemsInCarouselWidthWiseConverted = Number(numberOfItemsInCarouselWidthWise);
	const numberOfItemsToScrollOnClickConverted = Number(numberOfItemsToScrollOnClick);
	let currentTranslationFactor = CAROUSEL_MIN_IMAGE_COUNT;
	let itemsRef = useRef<NodeListOf<Element>>(null);
	let itemsWidthRef = useRef<any>(null);
	let leftArrowRef = useRef<HTMLElement>(null);
	let rightArrowRef = useRef<HTMLElement>(null);
	let hasResized = useRef<boolean>(false);
	const isItemOpenRef = useRef<boolean>(false);
	let removeTransitionTimeout: any;

	const [itemsToRenderFullScreen, setItemsToRenderFullScreen] = useState<
		number[]
	>([]);

	window.addEventListener("resize", handleResize);

	const handleArrowClick = (e: Event) => {
		const isFullSize = handleFullsizeArrowToggling(e);
		if (isFullSize) return;

		currentTranslationFactor = getNewCurrentTranslationFactor(
			e,
			currentTranslationFactor,
			numberOfItemsToScrollOnClickConverted,
			numberOfItemsInCarouselWidthWiseConverted,
			items,
		);

		setTranslationAmountFlow();
	};

	function setTranslationAmountFlow() {
		setArrowButtonsHiddenClass(
			numberOfItemsInCarouselWidthWiseConverted - 1,
			items.length - 1,
			currentTranslationFactor,
			leftArrowRef as any,
			rightArrowRef as any,
			numberOfItemsInCarouselWidthWiseConverted,
			numberOfItemsToScrollOnClickConverted,
		);

		setItemsWidthRef(itemsWidthRef);
		const amountToTranslateImages =
			(itemsWidthRef as any).current *
			currentTranslationFactor *
			numberOfItemsToScrollOnClickConverted;

		removeTransitionTimeout = setTranslationAmount(
			amountToTranslateImages,
			removeTransitionTimeout,
			itemsRef as any,
		);
	}

	function handleResize() {
		hasResized.current = true;
		currentTranslationFactor = getNewCurrentTranslationFactor(
			null,
			currentTranslationFactor,
			numberOfItemsToScrollOnClickConverted,
			numberOfItemsInCarouselWidthWiseConverted,
			items,
		);
		setTranslationAmountFlow();
	}

	const handleCleanUp = () => {
		const carouselItemClicked = document.querySelector(
			`.${FULLSCREEN_PARENT_CLASSNAME}`,
		) as HTMLElement;
		const videoDiv = carouselItemClicked?.querySelector(
			`.${CAROUSEL_VIDEO_CLASSNAME}`,
		);
		const video = carouselItemClicked?.querySelector(
			"video",
		) as HTMLVideoElement;
		if (video) resetCarouselVideo(carouselItemClicked, video);
		if (videoDiv) {
			videoDiv.classList.remove(PLAYING_CLASSNAME);
			videoDiv.classList.remove(FULLSCREEN_CLASSNAME);
			videoDiv.classList.add(STOPPED_CLASSNAME);
		}

		const image = carouselItemClicked?.querySelector("img") as HTMLImageElement;
		if (image) image.classList.remove(FULLSCREEN_CLASSNAME);
	};

	const handleDotClick = (e: MouseEvent) => {
		[currentTranslationFactor, removeTransitionTimeout] =
			getCurrentTranslationFactorFromDots(
				e,
				items,
				itemsRef as any,
				itemsWidthRef as any,
				leftArrowRef as any,
				rightArrowRef as any,
				numberOfItemsInCarouselWidthWiseConverted,
				numberOfItemsToScrollOnClickConverted,
				removeTransitionTimeout as any,
			);
	};

	const handleFullsizeArrowToggling = (e: Event) => {
		handleCleanUp();

		const leftArrow = leftArrowRef.current as any as HTMLElement;
		const rightArrow = rightArrowRef.current as any as HTMLElement;
		let direction: ArrowButtonDirection = "left";
		const arrowClicked = (e.currentTarget || e.target) as HTMLElement;

		if (arrowClicked?.className?.match(/right/i)) direction = "right";

		const { isNotFirstItem, isNotLastItem, nthItemOpen, items } =
			getNthItemOpen(e, leftArrow, rightArrow, direction);

		handleWhetherToDisplayArrows(
			leftArrow,
			rightArrow,
			isNotFirstItem !== undefined ? isNotFirstItem : true,
			isNotLastItem !== undefined ? isNotLastItem : true,
		);

		if (nthItemOpen !== -1 && typeof nthItemOpen === "number")
			if (items) {
				const itemToOpen = items[nthItemOpen];
				const imageOrVideo = itemToOpen.children[0] as HTMLElement;
				itemToOpen?.classList.add(FULLSCREEN_PARENT_CLASSNAME);
				imageOrVideo.classList.remove(FULLSCREEN_CLASSNAME);

				let newItems = [...itemsToRenderFullScreen];
				if (!itemsToRenderFullScreen.includes(nthItemOpen))
					newItems.push(nthItemOpen);
				setItemsToRenderFullScreen(newItems);
			}

		if (!nthItemOpen) return false;

		//return whether it's full-size
		return nthItemOpen !== -1;
	};

	const renderItems = () => {
		// const arrangedItems = getArrangedItems(
		// 	items,
		// 	shouldRearrangeItems,
		// 	numberOfItemsInCarouselWidthWiseConverted,
		// ) as CarouselItemProps[];
		const arrangedItems = items;

		return arrangedItems.map((item, index) => {
			const carouselItemProps: CarouselItemProps = {
				descriptionClassname: item.descriptionClassname
					? item.descriptionClassname
					: undefined,
				itemClassName: item.itemClassName ? item.itemClassName : undefined,
				imageClassname: item.imageClassname ? item.imageClassname : undefined,
				isItemOpenRef: isItemOpenRef,
				videoClassname: item.videoClassname ? item.videoClassname : undefined,
				foregroundVideoClassname: item.foregroundVideoClassname
					? item.foregroundVideoClassname
					: undefined,
				description: item.description ? item.description : undefined,
				itemSrc: item.itemSrc ? item.itemSrc : undefined,
				itemThumbnailSrc: item.itemThumbnailSrc
					? item.itemThumbnailSrc
					: undefined,
				leftArrowRef: leftArrowRef,
				rightArrowRef: rightArrowRef,
				videoType: item.videoType ? item.videoType : undefined,
				videoAutoPlay: item.videoAutoPlay ? item.videoAutoPlay : undefined,
				videoLoop: item.videoLoop ? item.videoLoop : undefined,
				videoPlaySVGXLinkHref: item.videoPlaySVGXLinkHref
					? item.videoPlaySVGXLinkHref
					: undefined,
				videoPlayControlSvgXLinkHref: item.videoPlayControlSvgXLinkHref
					? item.videoPlayControlSvgXLinkHref
					: undefined,
				videoStopControlSvgXLinkHref: item.videoStopControlSvgXLinkHref
					? item.videoStopControlSvgXLinkHref
					: undefined,
				videoRestartControlSvgXLinkHref: item.videoRestartControlSvgXLinkHref
					? item.videoRestartControlSvgXLinkHref
					: undefined,
				videoPauseControlSvgXLinkHref: item.videoPauseControlSvgXLinkHref
					? item.videoPauseControlSvgXLinkHref
					: undefined,
				videoCloseControlSvgXLinkHref: item.videoCloseControlSvgXLinkHref
					? item.videoCloseControlSvgXLinkHref
					: undefined,
				videoCloseControlClassesToRemove: item.videoCloseControlClassesToRemove
					? item.videoCloseControlClassesToRemove
					: undefined,
				videoExtentions: item.videoExtentions
					? item.videoExtentions
					: undefined,
				videoOverlayText: item.videoOverlayText
					? item.videoOverlayText
					: undefined,
				videoOverlayStyles: item.videoOverlayStyles
					? item.videoOverlayStyles
					: undefined,
				videoOverlayChildren: item.videoOverlayChildren
					? item.videoOverlayChildren
					: undefined,
				functionToRunOnClose: functionToRunOnClose
					? () => {
						toggleMobileDisplayIssueFixes();
						functionToRunOnClose();
					}
					: undefined,
				functionToGetContainer: functionToGetContainer
					? functionToGetContainer
					: undefined,
				shouldRenderFullScreen: itemsToRenderFullScreen.includes(index),
			};

			return (
				<React.Fragment key={index}>
					<CarouselItem {...(carouselItemProps as any)} />
				</React.Fragment>
			);
		});
	};

	const renderCarouselDots = () => {
		if (!items.length || items.length <= numberOfItemsInCarouselWidthWiseConverted)
			return null;
		const maxWidth = getCarouselGridMaxColumnWidth(items.length);

		let numberOfRows = 1;
		if (maxWidth !== CAROUSEL_GRID_MAX_COLUMN_WIDTH_DEFAULT) numberOfRows = 2;

		return items.map((image, index) => {
			const indexToUse = index % numberOfRows;
			if (indexToUse !== 0) return null;

			const nthIndex = index / numberOfRows;

			return (
				<svg
					key={nthIndex}
					className={`
								${CAROUSEL_DOT_CLASSNAME}
								${CAROUSEL_DOT_CLASSNAME}-${nthIndex}
								${index === 0 ? CAROUSEL_DOT_ACTIVE_CLASSNAME : ""}
							`}
					onClick={(e: any) => handleDotClick(e)}>
					<use xlinkHref={dotSVGXLinkHref}></use>
				</svg>
			);
		});
	};

	function setItemsWidthRef(itemsWidthRef: RefObject<number>) {
		if (
			(itemsRef.current && itemsWidthRef.current === null) ||
			hasResized.current
		) {
			const image1Left = itemsRef?.current
				? itemsRef?.current[0]?.children[0]?.getBoundingClientRect().left
				: 0;
			const image2Left = itemsRef?.current
				? itemsRef?.current[1]?.children[0]?.getBoundingClientRect().left
				: 0;
			(itemsWidthRef.current as any) = Math.abs(image1Left - image2Left);
			hasResized.current = false;
		}
	}

	function renderArrows() {
		if (items.length <= numberOfItemsInCarouselWidthWiseConverted) return null;

		return (
			<React.Fragment>
				<CarouselArrow
					onClick={(e: any) => handleArrowClick(e)}
					className={`${CAROUSEL_ARROW_BUTTONS_CLASSNAME} ${CAROUSEL_ARROW_BUTTON_LEFT_CLASSNAME}`}
					svgXLinkHref="/sprite.svg#icon-arrow-with-circle-down"
				/>

				<CarouselArrow
					onClick={(e: any) => handleArrowClick(e)}
					className={`${CAROUSEL_ARROW_BUTTONS_CLASSNAME} ${CAROUSEL_ARROW_BUTTON_RIGHT_CLASSNAME} `}
					svgXLinkHref="/sprite.svg#icon-arrow-with-circle-down"
				/>
			</React.Fragment>
		);
	}

	useEffect(() => {
		const {csharpParentCarousel, parentCarousel }= getFirstItemAndParentCarousels(items);

		if (parentCarousel) {
			const parentSection = parentCarousel.closest('section.csharp__section');
			parentSection?.classList.add(CONTAINS_CAROUSEL_CLASSNAME)
		}

		if (itemsRef && parentCarousel) {
			const items = parentCarousel.querySelectorAll(`.${CAROUSEL_ITEM_CLASSNAME}`);
			const arrangedItems = items;
			// const arrangedItems = getArrangedItems(items, shouldRearrangeItems, numberOfItemsInCarouselWidthWiseConverted);
			(itemsRef as any).current = arrangedItems;
		}

		if (leftArrowRef && csharpParentCarousel) (leftArrowRef as any).current = csharpParentCarousel.querySelector(
			`.${CAROUSEL_ARROW_BUTTON_LEFT_CLASSNAME}`,
		);
		if (rightArrowRef && csharpParentCarousel) (rightArrowRef as any).current = csharpParentCarousel.querySelector(
			`.${CAROUSEL_ARROW_BUTTON_RIGHT_CLASSNAME}`,
		);

		setCarouselGridMaxColumnWidth(itemsRef);

		return () => {
			toggleScrollability();
		}
	}, [
		leftArrowRef,
		rightArrowRef,
		CAROUSEL_ARROW_BUTTON_LEFT_CLASSNAME,
		CAROUSEL_ARROW_BUTTON_RIGHT_CLASSNAME,
		CAROUSEL_ITEM_CLASSNAME,
		itemsRef,
		items,
		shouldRearrangeItems,
		numberOfItemsInCarouselWidthWiseConverted,
	]);


	return (
		<React.Fragment>
			<article className="carousel">{renderItems()}</article>
			{/* //todo: figure out why carousel has changed the way it renders */}
			{/* //todo: uncomment out event listener above ~line 69 */}
			{/* arrows are set to display:none unless full-screen in css */}
			{renderArrows()} 
			{/* <div className={`${CAROUSEL_CLASSNAME}__dots`}>
				{renderCarouselDots()}
			</div> */}
		</React.Fragment>
	);
};