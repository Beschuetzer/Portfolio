import React, { RefObject, useRef } from "react";
import { connect, RootStateOrAny } from "react-redux";
import CarouselItem from "./CarouselItem";
import {
	ANIMATION_DURATION,
} from "../constants";
import useInit from "./useInit";
import useInterItemWidth from "./useInterItemWidth";
import CarouselArrow from "./CarouselArrow";
import { CAROUSEL_TRANSLATION_CSS_CLASSNAME, CAROUSEL_VIDEO_CLASSNAME } from "./util";
import { FOREGROUND_VIDEO_CLASSNAME } from "../VideoPlayer/Video";

interface CarouselProps {
	viewPortWidth: number,
	items: string[],
	alts: string[],
	numberOfItemsInCarouselAtOneTime: number,
	numberOfItemsToScrollOnClick: number,
}

const Carousel: React.FC<CarouselProps> = ({
	viewPortWidth,
	items,
	alts,
	numberOfItemsInCarouselAtOneTime,
	numberOfItemsToScrollOnClick,
}) => {
	const IMAGE_CLASSNAME = "carousel__image";
	const ITEM_CLASSNAME = "carousel__item";
	const TRANSITION_CLASSNAME = "carousel-transition";
	const DESCRIPTION_CLASSNAME = `${IMAGE_CLASSNAME}-description`;

	const DOT_CLASSNAME = "carousel__dot";
	const DOT_ACTIVE_CLASSNAME = `${DOT_CLASSNAME}--active`;
	const ARROW_BUTTONS_CLASSNAME = "carousel__arrow-button";
	const ARROW_BUTTON_LEFT_CLASSNAME = `${ARROW_BUTTONS_CLASSNAME}--left`;
	const ARROW_BUTTON_RIGHT_CLASSNAME = `${ARROW_BUTTONS_CLASSNAME}--right`;
	const minImageCount = 0;
	let currentTranslationFactor = minImageCount;
	let itemsRef = useRef<RefObject<HTMLElement>>(null);
	let itemsWidthRef = useRef<RefObject<HTMLElement>>(null);
	let leftArrowRef = useRef<RefObject<HTMLElement>>(null);
	let rightArrowRef = useRef<RefObject<HTMLElement>>(null);
	let removeTransitionTimeout: any;

	useInit(
		leftArrowRef,
		rightArrowRef,
		ARROW_BUTTON_RIGHT_CLASSNAME,
		ARROW_BUTTON_LEFT_CLASSNAME,
		ITEM_CLASSNAME,
    itemsRef,
	);
	useInterItemWidth(viewPortWidth, itemsRef, itemsWidthRef);

	function setArrowButtonsHiddenClass(
		minImageCount: number,
		maxImageCount: number,
		currentTranslationFactor: number,
	) {
		const leftArrow = (leftArrowRef.current as any)[0];
		const rightArrow = (rightArrowRef.current as any)[0];

		if (!leftArrow || !rightArrow) return;

		leftArrow.classList.remove("hidden");
		rightArrow.classList.remove("hidden");

		const currentCount =
			+numberOfItemsInCarouselAtOneTime +
			currentTranslationFactor * +numberOfItemsToScrollOnClick -
			1;

		if (currentCount <= minImageCount) leftArrow.classList.add("hidden");
		if (currentCount >= maxImageCount) rightArrow.classList.add("hidden");
	}

	function setCurrentActiveButton(indexOfActiveDot: number) {
		const dots = document.querySelectorAll(`.${DOT_CLASSNAME}`);
		for (let i = 0; i < dots.length; i++) {
			const dot = dots[i];
			if (i !== indexOfActiveDot) dot?.classList.remove(DOT_ACTIVE_CLASSNAME);
			else dot?.classList.add(DOT_ACTIVE_CLASSNAME);
		}
	}

	function setTranslationAmount(amountToTranslateImages: number) {
		clearInterval(removeTransitionTimeout);

		const itemElements = (itemsRef as any).current;
		for (let i = 0; i < itemElements.length; i++) {
			const item = itemElements[i];
			item?.classList.add(TRANSITION_CLASSNAME);
		}

		const newValue = `${CAROUSEL_TRANSLATION_CSS_CLASSNAME}: -${amountToTranslateImages}px`;
		document.documentElement.style.cssText += newValue;

		removeTransitionTimeout = setTimeout(() => {
			for (let i = 0; i < itemElements.length; i++) {
				const item = itemElements[i];
				item?.classList.remove(TRANSITION_CLASSNAME);
			}
		}, ANIMATION_DURATION / 2);
	}

	const handleArrowClick = (e: Event) => {
		const maxImageCount =
			+numberOfItemsToScrollOnClick === 1
				? items.length - numberOfItemsInCarouselAtOneTime
				: items.length - 1;

		let hasClickedLeftArrow = false;
		if ((e.currentTarget as HTMLElement)?.classList.contains(ARROW_BUTTON_LEFT_CLASSNAME))
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
			minImageCount
		) {
			return (currentTranslationFactor = minImageCount);
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

		const dots = document.querySelectorAll(`.${DOT_CLASSNAME}`);
		const clickedOnDot = e.currentTarget;

		for (let i = 0; i < dots.length; i++) {
			const dot = dots[i];
			if (dot === clickedOnDot) indexOfDotToMoveTo = i;
			else if (dot?.classList.contains(DOT_ACTIVE_CLASSNAME))
				indexOfCurrentDot = i;

			if (indexOfCurrentDot !== -1 && indexOfDotToMoveTo !== -1) break;
		}

		const amountToTranslateImages = (itemsWidthRef as any).current * indexOfDotToMoveTo;

		currentTranslationFactor =
			indexOfDotToMoveTo / numberOfItemsToScrollOnClick;

		setArrowButtonsHiddenClass(0, items.length - 1, currentTranslationFactor);

		setTranslationAmount(amountToTranslateImages);
		dots[indexOfDotToMoveTo]?.classList.add(DOT_ACTIVE_CLASSNAME);
		dots[indexOfCurrentDot]?.classList.remove(DOT_ACTIVE_CLASSNAME);
	};

	const renderItems = () => {
    return items.map((item, index) => {
			const carouselItemProps = {
				descriptionClassname: DESCRIPTION_CLASSNAME,
				itemClassName: ITEM_CLASSNAME,
				imageClassname: IMAGE_CLASSNAME,
				videoClassname: CAROUSEL_VIDEO_CLASSNAME,
				foregroundVideoClassname: FOREGROUND_VIDEO_CLASSNAME,
				imageAlt: alts[index],
				itemSrc: item,
				videoSvgXLinkHref: "/sprite.svg#icon-play",
				videoPlayControlSvgXLinkHref: "/sprite.svg#icon-play",
				videoStopControlSvgXLinkHref: "/sprite.svg#icon-stop",
				videoRestartControlSvgXLinkHref: "/sprite.svg#icon-restart",
				videoPauseControlSvgXLinkHref: "/sprite.svg#icon-pause",
				videoCloseControlSvgXLinkHref: "/sprite.svg#icon-close",
			};

			return (

				<React.Fragment key={index}>
					<CarouselItem {...carouselItemProps} />
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
              ${DOT_CLASSNAME}
              ${DOT_CLASSNAME}-${index}
              ${index === 0 ? DOT_ACTIVE_CLASSNAME : ""}
            `}
					onClick={(e: any ) => handleDotClick(e)}>
					<use xlinkHref="/sprite.svg#icon-dot-single"></use>
				</svg>
			);
		});
	};

	return (
		<React.Fragment>
			<article className="carousel">
        {renderItems()}
      </article>

      <CarouselArrow
        onClick={(e: any) => handleArrowClick(e)}
        className={`hidden ${ARROW_BUTTONS_CLASSNAME} ${ARROW_BUTTON_LEFT_CLASSNAME}`}
        svgXLinkHref="/sprite.svg#icon-arrow-with-circle-down"
      />

      <CarouselArrow
        onClick={(e: any) => handleArrowClick(e)}
        className={` ${ARROW_BUTTONS_CLASSNAME} ${ARROW_BUTTON_RIGHT_CLASSNAME} `}
        svgXLinkHref="/sprite.svg#icon-arrow-with-circle-down"
      />

			<div className="carousel__dots">{renderCarouselButtons()}</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		viewPortWidth: state.general.viewPortWidth,
	};
};

export default connect(mapStateToProps, {})(Carousel);
