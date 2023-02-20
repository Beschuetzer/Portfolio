import React, { MouseEventHandler, RefObject, useState } from "react";
import { useRef } from "react";

import {
	ANIMATION_DURATION,
	bridgeSectionNames,
	BRIDGE_BACKDROP_CLASSNAME,
	BRIDGE_CLASSNAME,
	BRIDGE_SECTION_TITLES_CLASSNAME,
	CARD_DEFAULT_CLASSNAME,
	CARD_DONE_CLASSNAME,
	CARD_OPEN_CLASSNAME,
	CARD_PLAYING_CLASSNAME,
	CARD_STOPPED_CLASSNAME,
	MOBILE_BREAK_POINT_WIDTH,
	Z_INDEX_HIGHEST_CLASSNAME,
} from "../constants";
import { setIsCardVideoOpen } from "../../slices/bridgeSlice";
import { attachProgressListener, capitalize, closeVideo, getIsVideoPlaying, getPercentOfProgressBar, handleVideoProgress, scrollToSection } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { isMobileSelector, viewPortWidthSelector } from "../../slices/generalSlice";
import { Reference } from "../../types";
import { CloseControl } from "../VideoPlayer/CloseControl";
import { PauseControl } from "../VideoPlayer/PauseControl";
import { PlayControl } from "../VideoPlayer/PlayControl";
import { RestartControl } from "../VideoPlayer/RestartControl";
import { StopControl } from "../VideoPlayer/StopControl";
import { Video, FOREGROUND_VIDEO_CLASSNAME } from "../VideoPlayer/Video";

interface CardProps {
	title: string;
	cardName: string;
	fileType?: string;
	children: any;
	video: string;
}

export const CARD_MOUSE_LEAVE_INDEX_SWITCH_DURATION = 75;
export const Card: React.FC<CardProps> = ({
	title,
	cardName,
	fileType = "svg",
	children,
	video,
}) => {
	//#region Init
	const dispatch = useAppDispatch();
	const isMobile = useAppSelector(isMobileSelector);
	const viewPortWidth  = useAppSelector(viewPortWidthSelector);
	const [showChildren, setShowChildren] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const cardRef = useRef<HTMLElement>(null);
	const progressBarRef = useRef<HTMLProgressElement>(null);
	let hasProgressEventListener = false;
	//#endregion

	//#region Functions/Handlers	
	const adjustCardYPosition = (
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
				if (splitString.match(/translateY/)) {
					translateY = splitString;
					translateYIndex = i;
					break;
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

	const changeSectionTitle = (
		titleRef: RefObject<HTMLElement> | HTMLElement,
		isOpen = true,
	) => {
		if (!titleRef) return;
		const originalMsgTitle = "Features";
		const originalMsgSubTitle = "Pick a Card any Card";
	
		const sections = document.querySelectorAll(`.${BRIDGE_CLASSNAME}__section`);
		for (let i = 0; i < sections.length; i++) {
			const section = sections[i];
			if (section.id.match(/feature/i)) {
				const title = section.querySelector(`.${BRIDGE_CLASSNAME}__section-title`);
	
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

	const centerCard = (
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

	const closeCard = (
		video: HTMLVideoElement,
		card: HTMLElement,
		titleRef: Reference,
	) => {
		closeVideo(video);
	
		if (!titleRef) return;
		changeSectionTitle(titleRef, false);
		dispatch(setIsCardVideoOpen(false));
	
		if (!card) return;
		card.classList.remove(CARD_OPEN_CLASSNAME);
		card.classList.remove(CARD_DONE_CLASSNAME);
		card.classList.remove(CARD_STOPPED_CLASSNAME);
	};

	const getCardCoordinates = (
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

	const getCardScaleOnHoverAmount = (
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

	const getFeaturesBridgeSectionTitles = () => {
		const features = document.querySelector(
			`#${(bridgeSectionNames as any)[1]?.toLowerCase()}`,
		) as HTMLElement;
		return features.querySelector(`.${BRIDGE_SECTION_TITLES_CLASSNAME}`);
	};
	
	const getGapAmount = (
		video: HTMLVideoElement,
	) => {
		const featuresBridgeSectionTitles = getFeaturesBridgeSectionTitles() as HTMLElement;
		const bridgeSectionBounds =
			featuresBridgeSectionTitles.getBoundingClientRect();
		const videoBounds = video.getBoundingClientRect();
		return videoBounds.top - bridgeSectionBounds.bottom;
	};

	const handleVideoEnd = (e: Event) => {
		cardRef.current?.classList.add(CARD_DONE_CLASSNAME);
		cardRef.current?.classList.remove(CARD_PLAYING_CLASSNAME);
		const video = e.currentTarget;
		if (video) video.removeEventListener("ended", handleVideoEnd);
	};

	const handleCardClick = (e: MouseEventHandler<HTMLElement>) => {
		(e as any).stopPropagation();
		const clickedCard = cardRef.current as HTMLElement;
		if (
			clickedCard?.classList.contains(CARD_DONE_CLASSNAME) ||
			clickedCard?.classList.contains(CARD_OPEN_CLASSNAME)
		)
			return [null, null, null, null];

			clickedCard?.classList.add(Z_INDEX_HIGHEST_CLASSNAME);
		const initialCardSize = clickedCard?.getBoundingClientRect();
		const bridgeBackdrop = document.querySelector(
			`.${BRIDGE_BACKDROP_CLASSNAME}`,
		) as HTMLElement;
		bridgeBackdrop?.classList.add("visible");

		const video = videoRef?.current as HTMLVideoElement;
		if (!video) return;

		setTimeout(() => {
			changeSectionTitle(titleRef);
			openCard(video as HTMLVideoElement , clickedCard as HTMLElement, bridgeBackdrop as HTMLElement, initialCardSize as ClientRect);
			scrollToSection(
				document.querySelector(`#${bridgeSectionNames[1].toLowerCase()}`) as HTMLElement
			);
			setShowChildren(true);
		}, ANIMATION_DURATION / 2);
	};

	const handleMouseEnter = (e: MouseEventHandler<HTMLElement>) => {
		((e as any).currentTarget as HTMLElement)?.classList.add("z-index-content");
	};

	const handleMouseLeave = (e: MouseEventHandler<HTMLElement>): void => {
		const target = (e as any).currentTarget as HTMLElement;
		// setTimeout(() => {
		target?.classList.remove("z-index-content");
		// }, CARD_MOUSE_LEAVE_INDEX_SWITCH_DURATION);
	};

	const handleProgressBarClick = (
		videoRef: RefObject<HTMLVideoElement>,
		cardRef: RefObject<HTMLElement>,
		e: () => void,
	) => {
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

	const onCloseChildren = () => {
		setShowChildren(false);
		
	};

	const onProgressBarClick = (e: MouseEventHandler<HTMLElement>) => {
		handleProgressBarClick(videoRef, cardRef, e as any);
	};

	const openCard = (
		video: HTMLVideoElement,
		card: HTMLElement,
		backdrop: HTMLElement,
		initialCardDimensions: ClientRect,
	) => {
		if (!card) return;

		const cardDimensions = card.getBoundingClientRect();
		centerCard(
			card,
			cardDimensions,
			initialCardDimensions,
			viewPortWidth,
			isMobile,
		);

		const isVideoPlaying = getIsVideoPlaying(video);
		if (!video) return;
		if (isVideoPlaying || card.classList.contains(CARD_OPEN_CLASSNAME))
			return closeCard(video, card, titleRef as Reference);
		else {
			playVideo(video, card);
			card.classList.add(CARD_OPEN_CLASSNAME);
		}

		setTimeout(() => {
			adjustCardYPosition(video);
			backdrop?.classList.remove("visible");
			card.classList.remove(Z_INDEX_HIGHEST_CLASSNAME);
		}, ANIMATION_DURATION);

		dispatch(setIsCardVideoOpen(true));
	};

	const playVideo = (video: HTMLVideoElement, card: HTMLElement) => {
		hasProgressEventListener = attachProgressListener(
			video,
			hasProgressEventListener,
			handleVideoProgress.bind(null, {current: video}, progressBarRef) as any,
		)!;
		video.addEventListener("ended", handleVideoEnd);
		card.classList.remove(CARD_DONE_CLASSNAME);
		card.classList.add(CARD_PLAYING_CLASSNAME);
		card.classList.remove(CARD_STOPPED_CLASSNAME);
		video.play();
	};
	//#endregion

	//#region JSX	
	return (
		<article
			ref={cardRef}
			onMouseLeave={(e: any) => handleMouseLeave(e)}
			onMouseEnter={(e: any) => handleMouseEnter(e)}
			onClick={(e: any) => handleCardClick(e)}
			className={CARD_DEFAULT_CLASSNAME}>
			<img
				className="card__image"
				alt={capitalize(cardName.replace("-", " "))}
				src={`/${cardName}.${fileType}`}
			/>
			<div className="card__content">
				<StopControl
					xlinkHref="/sprite.svg#icon-stop"
					videoRef={videoRef}
					containerRef={cardRef}
					playingClassname={CARD_PLAYING_CLASSNAME}
					doneClassname={CARD_DONE_CLASSNAME}
					stoppedClassname={CARD_STOPPED_CLASSNAME}
				/>

				<PauseControl
					xlinkHref="/sprite.svg#icon-pause"
					videoRef={videoRef}
					containerRef={cardRef}
					playingClassname={CARD_PLAYING_CLASSNAME}
					doneClassname={CARD_DONE_CLASSNAME}
					stoppedClassname={CARD_STOPPED_CLASSNAME}
				/>

				<RestartControl
					xlinkHref="/sprite.svg#icon-restart"
					videoRef={videoRef}
					containerRef={cardRef}
					progressBarRef={progressBarRef}
					playingClassname={CARD_PLAYING_CLASSNAME}
					doneClassname={CARD_DONE_CLASSNAME}
					stoppedClassname={CARD_STOPPED_CLASSNAME}
				/>

				<CloseControl
					xlinkHref="/sprite.svg#icon-close"
					videoRef={videoRef}
					containerRef={cardRef}
					classNamesToRemove={[
						CARD_DONE_CLASSNAME,
						CARD_OPEN_CLASSNAME,
						CARD_STOPPED_CLASSNAME,
					]}
					classNamesToRemoveFromElement={[
						[
							"visible",
							document.querySelector(`.${BRIDGE_BACKDROP_CLASSNAME}`),
						],
						[Z_INDEX_HIGHEST_CLASSNAME, cardRef.current],
					]}
					functionToRunOnClose={() => {
						changeSectionTitle(titleRef, false);
						setShowChildren(true);
					}}
				/>

				<PlayControl
					xlinkHref="/sprite.svg#icon-play"
					videoRef={videoRef}
					containerRef={cardRef}
					playingClassname={CARD_PLAYING_CLASSNAME}
					doneClassname={CARD_DONE_CLASSNAME}
					stoppedClassname={CARD_STOPPED_CLASSNAME}
				/>

				<h4 ref={titleRef} className="card__title">
					{title}
				</h4>
				<Video
					className={FOREGROUND_VIDEO_CLASSNAME}
					type="mp4"
					src={video}
					autoPlay={false}
					loop={false}
					reference={videoRef}
					progressBarRef={progressBarRef}
					progressBarOnClick={onProgressBarClick}>
					{showChildren ? (
						<div className="card__children">
							<svg onClick={onCloseChildren} className="card__children-close">
								<use xlinkHref="/sprite.svg#icon-close"/>
							</svg>
							{children}
						</div>
					) : null}
				</Video>
			</div>
		</article>
	);
	//#endregion
};