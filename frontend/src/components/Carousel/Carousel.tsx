import React, { CSSProperties, useRef } from "react";
import { connect, RootStateOrAny } from "react-redux";
import CarouselItem, {
	FULLSCREEN_CLASSNAME,
	FULLSCREEN_PARENT_CLASSNAME,
	PLAYING_CLASSNAME,
	STOPPED_CLASSNAME,
} from "./CarouselItem";
import useInit from "./useInit";
import useInterItemWidth from "./useInterItemWidth";
import CarouselArrow from "./CarouselArrow";
import {
	CarouselItemProps,
	CAROUSEL_ARROW_BUTTONS_CLASSNAME,
	CAROUSEL_ARROW_BUTTON_LEFT_CLASSNAME,
	CAROUSEL_ARROW_BUTTON_RIGHT_CLASSNAME,
	CAROUSEL_CLASSNAME,
	CAROUSEL_DOT_ACTIVE_CLASSNAME,
	CAROUSEL_DOT_CLASSNAME,
	CAROUSEL_ITEM_CLASSNAME,
	CAROUSEL_MIN_IMAGE_COUNT,
	setArrowButtonsHiddenClass,
	setTranslationAmount,
	handleSetTranslation as getNewCurrentTranslationFactor,
	getCurrentTranslationFactorFromDots,
	getNthItemOpen,
	toggleLeftAndRightArrows as handleWhetherToDisplayArrows,
	resetCarouselVideo,
	CAROUSEL_VIDEO_CLASSNAME,
	getCarouselGridMaxColumnWidth,
	CAROUSEL_GRID_MAX_COLUMN_WIDTH_DEFAULT,
} from "./util";
import {
	ArrowButtonDirection,
} from "../constants";

interface CarouselProps {
	viewPortWidth: number;
	items: CarouselItemProps[];
	descriptions: string[];
	numberOfItemsInCarouselAtOneTime: number;
	numberOfItemsToScrollOnClick: number;
	functionToRunOnClose?: any;
	functionToGetContainer?: any;
	videoOverlayText?: string;
	videoOverlayStyles?: CSSProperties;
	videoOverlayChildren?: any;
	dotSVGXLinkHref?: string;
}

const Carousel: React.FC<CarouselProps> = ({
	viewPortWidth,
	items,
	numberOfItemsInCarouselAtOneTime,
	numberOfItemsToScrollOnClick,
	functionToRunOnClose,
	functionToGetContainer,
	dotSVGXLinkHref = "/sprite.svg#icon-dot-single",
}) => {
	let currentTranslationFactor = CAROUSEL_MIN_IMAGE_COUNT;
	let itemsRef = useRef<NodeListOf<Element>>(null);
	let itemsWidthRef = useRef<HTMLElement>(null);
	let leftArrowRef = useRef<HTMLElement>(null);
	let rightArrowRef = useRef<HTMLElement>(null);
	let removeTransitionTimeout: any;

	useInit(
		leftArrowRef,
		rightArrowRef,
		CAROUSEL_ARROW_BUTTON_RIGHT_CLASSNAME,
		CAROUSEL_ARROW_BUTTON_LEFT_CLASSNAME,
		CAROUSEL_ITEM_CLASSNAME,
		itemsRef,
		items,
	);
	useInterItemWidth(viewPortWidth, itemsRef, itemsWidthRef);

	const handleArrowClick = (e: Event) => {
		const isFullSize = handleFullsizeArrowToggling(e);
		if (isFullSize) return;

		currentTranslationFactor = getNewCurrentTranslationFactor(
			e,
			currentTranslationFactor,
			numberOfItemsToScrollOnClick,
			numberOfItemsInCarouselAtOneTime,
			items,
		);

		setArrowButtonsHiddenClass(
			numberOfItemsInCarouselAtOneTime - 1,
			items.length - 1,
			currentTranslationFactor,
			leftArrowRef as any,
			rightArrowRef as any,
			numberOfItemsInCarouselAtOneTime,
			numberOfItemsToScrollOnClick,
		);

		const amountToTranslateImages =
			(itemsWidthRef as any).current *
			currentTranslationFactor *
			numberOfItemsToScrollOnClick;

		removeTransitionTimeout = setTranslationAmount(
			amountToTranslateImages,
			removeTransitionTimeout,
			itemsRef as any,
		);
	};

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
				numberOfItemsInCarouselAtOneTime,
				numberOfItemsToScrollOnClick,
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
				imageOrVideo.classList.add(FULLSCREEN_CLASSNAME);
			}

		if (!nthItemOpen) return false;

		//return whether it's full-size
		return nthItemOpen !== -1;
	};

	const renderItems = () => {
		return items.map((item, index) => {
			const carouselItemProps: CarouselItemProps = {
				descriptionClassname: item.descriptionClassname
					? item.descriptionClassname
					: undefined,
				itemClassName: item.itemClassName ? item.itemClassName : undefined,
				imageClassname: item.imageClassname ? item.imageClassname : undefined,
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
					? functionToRunOnClose
					: undefined,
				functionToGetContainer: functionToGetContainer
					? functionToGetContainer
					: undefined,
			};

			return (
				<React.Fragment key={index}>
					<CarouselItem {...(carouselItemProps as any)} />
				</React.Fragment>
			);
		});
	};

	const renderCarouselDots = () => {
		if (!items.length) return null;
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

	return (
		<React.Fragment>
			<article className="carousel">{renderItems()}</article>

			<CarouselArrow
				onClick={(e: any) => handleArrowClick(e)}
				className={`hidden ${CAROUSEL_ARROW_BUTTONS_CLASSNAME} ${CAROUSEL_ARROW_BUTTON_LEFT_CLASSNAME}`}
				svgXLinkHref="/sprite.svg#icon-arrow-with-circle-down"
			/>

			<CarouselArrow
				onClick={(e: any) => handleArrowClick(e)}
				className={` ${CAROUSEL_ARROW_BUTTONS_CLASSNAME} ${CAROUSEL_ARROW_BUTTON_RIGHT_CLASSNAME} `}
				svgXLinkHref="/sprite.svg#icon-arrow-with-circle-down"
			/>

			<div className={`${CAROUSEL_CLASSNAME}__dots`}>
				{renderCarouselDots()}
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state: RootStateOrAny, ownProps: any) => {
	return {
		viewPortWidth: state.general.viewPortWidth,
		numberOfItemsToScrollOnClick: +ownProps.numberOfItemsToScrollOnClick,
		numberOfItemsInCarouselAtOneTime:
			+ownProps.numberOfItemsInCarouselAtOneTime,
	};
};

export default connect(mapStateToProps, {})(Carousel);
