import React, { CSSProperties, RefObject, useRef } from "react";
import { connect, RootStateOrAny } from "react-redux";
import CarouselItem from "./CarouselItem";
import { ANIMATION_DURATION, HIDDEN_CLASSNAME } from "../constants";
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
	CAROUSEL_TRANSITION_CLASSNAME,
	CAROUSEL_TRANSLATION_CSS_CLASSNAME,
} from "./util";

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
	dotSVGXLinkHref?: string,
}

const Carousel: React.FC<CarouselProps> = ({
	viewPortWidth,
	items,
	descriptions,
	numberOfItemsInCarouselAtOneTime,
	numberOfItemsToScrollOnClick,
	functionToRunOnClose,
	functionToGetContainer,
	videoOverlayText = "",
	videoOverlayStyles = {},
	videoOverlayChildren = null,
	dotSVGXLinkHref = "/sprite.svg#icon-dot-single",
}) => {
	let currentTranslationFactor = CAROUSEL_MIN_IMAGE_COUNT;
	let itemsRef = useRef<RefObject<HTMLElement>>(null);
	let itemsWidthRef = useRef<RefObject<HTMLElement>>(null);
	let leftArrowRef = useRef<RefObject<HTMLElement>>(null);
	let rightArrowRef = useRef<RefObject<HTMLElement>>(null);
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

	function setArrowButtonsHiddenClass(
		CAROUSEL_MIN_IMAGE_COUNT: number,
		maxImageCount: number,
		currentTranslationFactor: number,
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
			+numberOfItemsInCarouselAtOneTime +
			currentTranslationFactor * numberOfItemsToScrollOnClick -
			1;

		if (currentCount <= CAROUSEL_MIN_IMAGE_COUNT)
			leftArrow.classList.add(HIDDEN_CLASSNAME);
		if (currentCount >= maxImageCount)
			rightArrow.classList.add(HIDDEN_CLASSNAME);
	}

	function setCurrentActiveButton(indexOfActiveDot: number) {
		const dots = document.querySelectorAll(`.${CAROUSEL_DOT_CLASSNAME}`);
		for (let i = 0; i < dots.length; i++) {
			const dot = dots[i];
			if (i !== indexOfActiveDot)
				dot?.classList.remove(CAROUSEL_DOT_ACTIVE_CLASSNAME);
			else dot?.classList.add(CAROUSEL_DOT_ACTIVE_CLASSNAME);
		}
	}

	function setTranslationAmount(amountToTranslateImages: number) {
		clearInterval(removeTransitionTimeout);

		const itemElements = (itemsRef as any).current;
		for (let i = 0; i < itemElements.length; i++) {
			const item = itemElements[i];
			item?.classList.add(CAROUSEL_TRANSITION_CLASSNAME);
		}

		const newValue = `${CAROUSEL_TRANSLATION_CSS_CLASSNAME}: -${amountToTranslateImages}px`;
		document.documentElement.style.cssText += newValue;

		removeTransitionTimeout = setTimeout(() => {
			for (let i = 0; i < itemElements.length; i++) {
				const item = itemElements[i];
				item?.classList.remove(CAROUSEL_TRANSITION_CLASSNAME);
			}
		}, ANIMATION_DURATION / 2);
	}

	const handleArrowClick = (e: Event) => {
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

		// console.log('numberOfImagesInCarouselAtOneTime =', numberOfImagesInCarouselAtOneTime);
		// console.log('numberOfImagesToScrollOnClick =',
		// numberOfImagesToScrollOnClick);
		// console.log('maxImageCount =', maxImageCount);

		if (
			currentTranslationFactor * numberOfItemsToScrollOnClick <
			CAROUSEL_MIN_IMAGE_COUNT
		) {
			return (currentTranslationFactor = CAROUSEL_MIN_IMAGE_COUNT);
		} else if (
			currentTranslationFactor * numberOfItemsToScrollOnClick >
			maxImageCount
		) {
			return (currentTranslationFactor = Math.floor(
				maxImageCount / numberOfItemsToScrollOnClick,
			));
		}

		setArrowButtonsHiddenClass(
			numberOfItemsInCarouselAtOneTime - 1,
			items.length - 1,
			currentTranslationFactor,
		);

		const amountToTranslateImages =
			(itemsWidthRef as any).current *
			currentTranslationFactor *
			numberOfItemsToScrollOnClick;
		setTranslationAmount(amountToTranslateImages);
	};

	const handleDotClick = (e: MouseEvent) => {
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

		currentTranslationFactor =
			indexOfDotToMoveTo / numberOfItemsToScrollOnClick;

		setArrowButtonsHiddenClass(
			0,
			items.length - 1,
			indexOfDotToMoveTo === 0 ? 0 : currentTranslationFactor,
		);

		setTranslationAmount(amountToTranslateImages);
		dots[indexOfDotToMoveTo]?.classList.add(CAROUSEL_DOT_ACTIVE_CLASSNAME);
		dots[indexOfCurrentDot]?.classList.remove(CAROUSEL_DOT_ACTIVE_CLASSNAME);
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
				functionToRunOnClose: functionToRunOnClose ? functionToRunOnClose	: undefined,
				functionToGetContainer: functionToGetContainer ? functionToGetContainer	: undefined,
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
