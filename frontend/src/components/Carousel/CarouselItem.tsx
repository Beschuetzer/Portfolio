import React, { useState, useRef } from "react";

import PlayControl from "../VideoPlayer/PlayControl";
import StopControl from "../VideoPlayer/StopControl";
import PauseControl from "../VideoPlayer/PauseControl";
import RestartControl from "../VideoPlayer/RestartControl";
import CloseControl from "../VideoPlayer/CloseControl";
import Video, { FOREGROUND_VIDEO_CLASSNAME } from "../VideoPlayer/Video";
import {
	CarouselItemProps,
	CAROUSEL_CLASSNAME,
	CAROUSEL_DESCRIPTION_CLASSNAME,
	CAROUSEL_IMAGE_CLASSNAME,
	CAROUSEL_ITEM_CLASSNAME,
	CAROUSEL_VIDEO_CLASSNAME,
	getNthItemOpen,
	handleVideo,
	toggleLeftAndRightArrows,
	toggleMobileDisplayIssueFixes,
} from "./util";
import {
	getPercentOfProgressBar,
} from "../VideoPlayer/utils";
import { closeCarouselItem } from "../utils";
import OverlayText from "../OverlayText/OverlayText";
import { FILL_RED_CLASSNAME } from "../constants";

export const FULLSCREEN_CLASSNAME = "full-screen";
export const FULLSCREEN_PARENT_CLASSNAME = `${CAROUSEL_CLASSNAME}__item--full-screen`;
export const FULLSCREEN_ARROW_BUTTON_CLASSNAME = `${CAROUSEL_CLASSNAME}__arrow-button--full-screen`;
export const PLAYING_CLASSNAME = `${CAROUSEL_CLASSNAME}__item--playing`;
export const STOPPED_CLASSNAME = `${CAROUSEL_CLASSNAME}__item--stopped`;
export const DONE_CLASSNAME = `${CAROUSEL_CLASSNAME}__item--done`;
export const CLASSNAMES_TO_REMOVE = [
	FULLSCREEN_PARENT_CLASSNAME,
	FULLSCREEN_CLASSNAME,
	PLAYING_CLASSNAME,
	STOPPED_CLASSNAME,
	DONE_CLASSNAME,
];

const CarouselItem: React.FC<CarouselItemProps> = ({
	descriptionClassname = CAROUSEL_DESCRIPTION_CLASSNAME,
	itemClassName = CAROUSEL_ITEM_CLASSNAME,
	imageClassname = CAROUSEL_IMAGE_CLASSNAME,
	videoClassname = CAROUSEL_VIDEO_CLASSNAME,
	foregroundVideoClassname = FOREGROUND_VIDEO_CLASSNAME,
	description: imageAlt,
	itemSrc,
	itemThumbnailSrc,
	isItemOpenRef,
	leftArrowRef,
	rightArrowRef,
	videoType = "mp4",
	videoAutoPlay = false,
	videoLoop = false,
	videoPlaySVGXLinkHref = "/sprite.svg#icon-play",
	videoPlayControlSvgXLinkHref = "/sprite.svg#icon-play",
	videoStopControlSvgXLinkHref = "/sprite.svg#icon-stop",
	videoRestartControlSvgXLinkHref = "/sprite.svg#icon-restart",
	videoPauseControlSvgXLinkHref = "/sprite.svg#icon-pause",
	videoCloseControlSvgXLinkHref = "/sprite.svg#icon-close",
	videoCloseControlClassesToRemove = CLASSNAMES_TO_REMOVE,
	videoExtentions = ["mp4", "ogv", "webm", "ogg"],
	videoOverlayText = "",
	videoOverlayStyles = {},
	videoOverlayChildren = null,
	functionToRunOnClose,
	functionToGetContainer,
	shouldRenderFullScreen = false,
}) => {

	const [isFullScreen, setIsFullScreen] = useState(false);
	const [showOverlayText, setShowOverlayText] = useState(true);
	const videoRef = useRef<HTMLVideoElement>(null);
	const containerRef = useRef<HTMLElement>(null);
	const progressBarRef = useRef<HTMLProgressElement>(null);
	const isVideo = itemSrc?.match(
		getRegexStringFromStringArray(videoExtentions),
	);

	function addFullscreenClassToArrowButtons() {
		const leftArrowEl = (leftArrowRef?.current as any);
		const rightArrowEl = (rightArrowRef?.current as any);

		if (leftArrowEl) {
			leftArrowEl.classList.add(FULLSCREEN_ARROW_BUTTON_CLASSNAME);
			const svg = leftArrowEl.querySelector("svg");
			svg?.classList.add(FILL_RED_CLASSNAME);
		}
		if (rightArrowEl) {
			rightArrowEl.classList.add(FULLSCREEN_ARROW_BUTTON_CLASSNAME);
			const svg = rightArrowEl.querySelector("svg");
			svg?.classList.add(FILL_RED_CLASSNAME);
		}
	}

	function getRegexStringFromStringArray(fileExtensions: string[]) {
		const mapped = fileExtensions.map((ext, index) => {
			let orChar = "|";
			if (index === 0) orChar = "";
			return `${orChar}(.${ext})`;
		});
		const result = ".+" + mapped.join("") + "$";
		return result;
	}

	const handleVideoEnd = (e: Event) => {
		const video = videoRef?.current as any;
		if (!video) return;
		video.parentNode.classList.add(DONE_CLASSNAME);
		video.parentNode.classList.remove(PLAYING_CLASSNAME);
		video.removeEventListener("ended", handleVideoEnd);
	};

	const handleShouldHideArrows = (e: Event) => {
		const leftArrow = (leftArrowRef?.current as any) as HTMLElement;
		const rightArrow = (rightArrowRef?.current as any) as HTMLElement;
		const { isNotFirstItem, isNotLastItem } = getNthItemOpen(
			e,
			leftArrow,
			rightArrow,
			null,
		);

		toggleLeftAndRightArrows(
			leftArrow,
			rightArrow,
			isNotFirstItem !== undefined ? isNotFirstItem : true,
			isNotLastItem !== undefined ? isNotLastItem : true,
		);
	};

	const onItemClick = (e: MouseEvent) => {
		if (isItemOpenRef?.current) {
			return
		}

		if (isItemOpenRef) {
			isItemOpenRef.current = true;
		}

		const carouselItem = e.currentTarget as any;
		if (
			!carouselItem ||
			(carouselItem.parentNode as HTMLElement)?.classList.contains(
				FULLSCREEN_PARENT_CLASSNAME,
			)
		) {
			return;
		}

		e.preventDefault();
		handleShouldHideArrows(e);

		carouselItem?.classList.remove(STOPPED_CLASSNAME);
		carouselItem.classList.add(FULLSCREEN_CLASSNAME);
		carouselItem.parentNode?.classList.add(FULLSCREEN_PARENT_CLASSNAME);

		addFullscreenClassToArrowButtons();
		toggleMobileDisplayIssueFixes();
		handleVideo(
			carouselItem,
			videoClassname,
			foregroundVideoClassname,
			handleVideoEnd,
			onVideoProgress as any,
		);
		closeCarouselItem(carouselItem, "", true);
		setIsFullScreen(true);
	};

	const onProgressBarClick = (e: MouseEvent) => {
		const clientX = e.clientX;
		const progressBar = e.currentTarget as HTMLProgressElement;
		if (!progressBar) return;

		const percent = getPercentOfProgressBar(progressBar, clientX);

		const video = videoRef.current;
		if (!video) return;
		video.currentTime = percent * video.duration;
		if ((video as any).parentNode.classList.contains(DONE_CLASSNAME)) {
			(video as any).parentNode.classList.remove(DONE_CLASSNAME);
			(video as any).parentNode.classList.add(STOPPED_CLASSNAME);
		}
	};

	const onVideoProgress = (e: Event) => {
		const video = e.target as any;
		const item = video.parentNode;
		if (!video || !item) return;

		const percent = video.currentTime / video.duration;

		if (progressBarRef.current) {
			progressBarRef.current.value = percent;
		}
	};
	
	let mediaToAdd = (
		<img
			src={isFullScreen || shouldRenderFullScreen ? itemSrc : itemThumbnailSrc}
			className={`${imageClassname}`}
			alt={imageAlt}
			onClick={(e: any) => onItemClick(e)}
		/>
	);

	if (isVideo) {
		mediaToAdd = (
			<React.Fragment>
				<Video
					type={videoType}
					src={itemSrc as string}
					autoPlay={videoAutoPlay}
					loop={videoLoop}
					className={`${videoClassname} ${foregroundVideoClassname}`}
					onClick={onItemClick}
					reference={videoRef}
					progressBarRef={progressBarRef}
					progressBarOnClick={onProgressBarClick}>
					{videoOverlayChildren ? (
						<OverlayText
							titleText={videoOverlayText}
							styles={videoOverlayStyles}
							setIsVisible={setShowOverlayText}
							isVisible={showOverlayText}>
							{videoOverlayChildren}
						</OverlayText>
					) : null}
				</Video>
				;
				<svg className={`${videoClassname}-svg`}>
					<use xlinkHref={videoPlaySVGXLinkHref}></use>
				</svg>
			</React.Fragment>
		);
	}

	const renderControls = (isVideo: RegExpMatchArray | null) => {
		const closeControlToUse = (
			<CloseControl
				additionalSvgClassNames={["fill-red"]}
				xlinkHref={videoCloseControlSvgXLinkHref}
				videoRef={videoRef}
				containerRef={containerRef}
				isItemOpenRef={isItemOpenRef}
				classNamesToRemove={videoCloseControlClassesToRemove}
				functionToRunOnClose={functionToRunOnClose}
			/>
		);

		if (!isVideo) return closeControlToUse;

		return (
			<React.Fragment>
				<PlayControl
					xlinkHref={videoPlayControlSvgXLinkHref}
					videoRef={videoRef}
					containerRef={{
						current: containerRef?.current?.querySelector(
							`.${CAROUSEL_VIDEO_CLASSNAME}`,
						),
					}}
					playingClassname={PLAYING_CLASSNAME}
					doneClassname={DONE_CLASSNAME}
					stoppedClassname={STOPPED_CLASSNAME}
					handleVideoEnd={handleVideoEnd}
					handleVideoProgress={onVideoProgress}
					functionToGetContainer={functionToGetContainer}
				/>

				<StopControl
					xlinkHref={videoStopControlSvgXLinkHref}
					videoRef={videoRef}
					containerRef={{
						current: containerRef?.current?.querySelector(
							`.${CAROUSEL_VIDEO_CLASSNAME}`,
						),
					}}
					playingClassname={PLAYING_CLASSNAME}
					doneClassname={DONE_CLASSNAME}
					stoppedClassname={STOPPED_CLASSNAME}
					functionToGetContainer={functionToGetContainer}
				/>

				<PauseControl
					xlinkHref={videoPauseControlSvgXLinkHref}
					videoRef={videoRef}
					containerRef={{
						current: containerRef?.current?.querySelector(
							`.${CAROUSEL_VIDEO_CLASSNAME}`,
						)!,
					}}
					playingClassname={PLAYING_CLASSNAME}
					doneClassname={DONE_CLASSNAME}
					stoppedClassname={STOPPED_CLASSNAME}
					functionToGetContainer={functionToGetContainer}
					onClick={() => setShowOverlayText(true)}
				/>

				<RestartControl
					xlinkHref={videoRestartControlSvgXLinkHref}
					videoRef={videoRef}
					containerRef={{
						current: containerRef?.current?.querySelector(
							`.${CAROUSEL_VIDEO_CLASSNAME}`,
						),
					}}
					progressBarRef={progressBarRef}
					playingClassname={PLAYING_CLASSNAME}
					doneClassname={DONE_CLASSNAME}
					stoppedClassname={STOPPED_CLASSNAME}
					functionToGetContainer={functionToGetContainer}
				/>
				{closeControlToUse}
			</React.Fragment>
		);
	};

	return (
		<article ref={containerRef} className={itemClassName}>
			{mediaToAdd}
			<p className={descriptionClassname}>{imageAlt}</p>
			{renderControls(isVideo as RegExpMatchArray)}
		</article>
	);
};

export default CarouselItem;
