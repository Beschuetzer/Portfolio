import React, { CSSProperties, useRef } from "react";
import { connect, RootStateOrAny } from "react-redux";
import CarouselItem, { FULLSCREEN_PARENT_CLASSNAME } from "./CarouselItem";
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
} from "./util";
import { ArrowButtonDirection, HIDDEN_CLASSNAME } from "../constants";

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
	let itemsRef = useRef<HTMLElement>(null);
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
	);
	useInterItemWidth(viewPortWidth, itemsRef, itemsWidthRef);

	const handleArrowClick = (e: Event) => {
		const isFullSize = handleFullSize(e);
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

	const handleFullSize = (e: Event) => {
		const leftArrow = (leftArrowRef.current as any)[0] as HTMLElement;
		const rightArrow = (rightArrowRef.current as any)[0] as HTMLElement;
		debugger;
		const { isNotFirstItem, isNotLastItem, nthItemOpen, items } = getNthItemOpen(
			e,
			leftArrow,
			rightArrow,
		);

		if (isNotFirstItem)
			leftArrow?.classList.remove(HIDDEN_CLASSNAME);
		else leftArrow?.classList.add(HIDDEN_CLASSNAME);

		if (isNotLastItem)
			rightArrow?.classList.remove(HIDDEN_CLASSNAME);
		else rightArrow?.classList.add(HIDDEN_CLASSNAME);

		if (nthItemOpen !== -1 && typeof nthItemOpen === 'number')
			if (items) items[nthItemOpen]?.classList.add(FULLSCREEN_PARENT_CLASSNAME);

		return nthItemOpen !== -1;
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

	const renderCarouselButtons = () => {
		return items.map((image, index) => {
			return (
				<svg
					key={index}
					className={`
              ${CAROUSEL_DOT_CLASSNAME}
              ${CAROUSEL_DOT_CLASSNAME}-${index}
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
				{renderCarouselButtons()}
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
