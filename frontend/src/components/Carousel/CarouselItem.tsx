import React, { CSSProperties, useRef } from "react";

import PlayControl from "../VideoPlayer/PlayControl";
import StopControl from "../VideoPlayer/StopControl";
import PauseControl from "../VideoPlayer/PauseControl";
import RestartControl from "../VideoPlayer/RestartControl";
import CloseControl from "../VideoPlayer/CloseControl";
import Video from "../VideoPlayer/Video";
import { CAROUSEL_CLASSNAME, CAROUSEL_VIDEO_CLASSNAME } from "./util";
import {
	getIsVideoPlaying,
	getPercentOfProgressBar,
} from "../VideoPlayer/utils";
import { fixZIndexIssue } from "../utils";
import OverlayText from "../OverlayText/OverlayText";

const FULLSCREEN_CLASSNAME = "full-screen";
const FULLSCREEN_PARENT_CLASSNAME = `${CAROUSEL_CLASSNAME}__item--full-screen`;
const PLAYING_CLASSNAME = `${CAROUSEL_CLASSNAME}__item--playing`;
const STOPPED_CLASSNAME = `${CAROUSEL_CLASSNAME}__item--stopped`;
const DONE_CLASSNAME = `${CAROUSEL_CLASSNAME}__item--done`;
const CLASSNAMES_TO_REMOVE = [
	FULLSCREEN_PARENT_CLASSNAME,
	FULLSCREEN_CLASSNAME,
	PLAYING_CLASSNAME,
	STOPPED_CLASSNAME,
	DONE_CLASSNAME,
];

interface CarouselItemProps {
	descriptionClassname: string;
	itemClassName: string;
	imageClassname: string;
	videoClassname: string;
	foregroundVideoClassname: string;
	imageAlt: string;
	itemSrc: string;
	videoType?: 'mp4' | 'ogv' | 'webm' | 'ogg';
	videoAutoPlay?: boolean;
	videoLoop?: boolean;
	videoSvgXLinkHref: string
	videoPlayControlSvgXLinkHref?: string;
	videoStopControlSvgXLinkHref?: string;
	videoRestartControlSvgXLinkHref?: string;
	videoPauseControlSvgXLinkHref?: string;
	videoCloseControlSvgXLinkHref?: string;
	videoCloseControlClassesToRemove?: string;
	videoOverlayStyles?: CSSProperties,
	videoOverlayText?: string,
	videoOverlayChildren?: any,
	videoExtentions?: string[],
	functionToRunOnClose?: any,
	functionToGetContainer?: any,
}

const CarouselItem: React.FC<CarouselItemProps> = ({
	descriptionClassname,
	itemClassName,
	imageClassname,
	videoClassname,
	foregroundVideoClassname,
	imageAlt,
	itemSrc,
	videoType = "mp4",
	videoAutoPlay = false,
	videoLoop = false,
	videoSvgXLinkHref,
	videoPlayControlSvgXLinkHref = "/sprite.svg#icon-play",
	videoStopControlSvgXLinkHref = "/sprite.svg#icon-stop",
	videoRestartControlSvgXLinkHref = "/sprite.svg#icon-restart",
	videoPauseControlSvgXLinkHref = "/sprite.svg#icon-pause",
	videoCloseControlSvgXLinkHref = "/sprite.svg#icon-close",
	videoCloseControlClassesToRemove = CLASSNAMES_TO_REMOVE,
	videoExtentions = ["mp4", "ogv", "webm", "ogg"],
	videoOverlayText = '',
	videoOverlayStyles = {},
	videoOverlayChildren = null,
	functionToRunOnClose,
	functionToGetContainer,
}) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const containerRef = useRef<HTMLElement>(null);
	const progressBarRef = useRef<HTMLProgressElement>(null);
	const isVideo = itemSrc.match(getRegexStringFromStringArray(videoExtentions));

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

	const onVideoProgress = (e: Event) => {
		const video = e.target as any;
		const item = video.parentNode;
		if (!video || !item) return;

		const percent = video.currentTime / video.duration;
		(progressBarRef as any).current.value = percent;
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

	const onItemClick = (e: MouseEvent) => {
		const item = e.currentTarget as any;
		if (!item) return;
		e.preventDefault();

		(item).classList.toggle(FULLSCREEN_CLASSNAME);
		(item).parentNode?.classList.toggle(FULLSCREEN_PARENT_CLASSNAME);

		if (
			item.classList.contains(videoClassname) ||
			item.classList.contains(foregroundVideoClassname)
		) {
			const video = item.querySelector("video") as HTMLVideoElement;
			const isPlaying = getIsVideoPlaying(video);

			if (isPlaying) {
				item.classList.remove(PLAYING_CLASSNAME);
				video.currentTime = 0;
				video.pause();
				video.removeEventListener("timeupdate", onVideoProgress);
			} else if (!item.classList.contains(PLAYING_CLASSNAME)) {
				item.classList.add(PLAYING_CLASSNAME);
				video.play();
				video.addEventListener("ended", handleVideoEnd);
				video.addEventListener("timeupdate", onVideoProgress);
			}
		}
		fixZIndexIssue(item, "", true);
	};

	let mediaToAdd = (
		<img
			src={itemSrc}
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
					src={itemSrc}
					autoPlay={videoAutoPlay}
					loop={videoLoop}
					className={`${videoClassname} ${foregroundVideoClassname}`}
					onClick={onItemClick}
					reference={videoRef}
					progressBarRef={progressBarRef}
					progressBarOnClick={onProgressBarClick}
				>
					<OverlayText 
						titleText={videoOverlayText}
						styles={videoOverlayStyles}
					>
						{videoOverlayChildren}
					</OverlayText>
				</Video>
				;
				<svg className={`${videoClassname}-svg`}>
					<use xlinkHref={videoSvgXLinkHref}></use>
				</svg>
			</React.Fragment>
		);
	}

	const renderControls = (isVideo: RegExpMatchArray | null) => {
		if (!isVideo)
			return (
				<CloseControl
					xlinkHref={videoCloseControlSvgXLinkHref}
					videoRef={videoRef}
					containerRef={containerRef}
					classNamesToRemove={videoCloseControlClassesToRemove}
				/>
			);

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

				<CloseControl
					xlinkHref={videoCloseControlSvgXLinkHref}
					videoRef={videoRef}
					containerRef={containerRef}
					classNamesToRemove={videoCloseControlClassesToRemove}
					functionToRunOnClose={functionToRunOnClose}
				/>
			</React.Fragment>
		);
	};

	return (
		<article ref={containerRef} className={itemClassName}>
			{mediaToAdd}
			<p className={descriptionClassname}>{imageAlt}</p>
			{renderControls(isVideo)}
		</article>
	);
};

export default CarouselItem;
