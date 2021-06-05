import React, { useRef } from "react";

import { getIsVideoPlaying, getPercentOfProgressBar } from "../constants";
import PlayControl from "../VideoPlayer/PlayControl";
import StopControl from "../VideoPlayer/StopControl";
import PauseControl from "../VideoPlayer/PauseControl";
import RestartControl from "../VideoPlayer/RestartControl";
import CloseControl from "../VideoPlayer/CloseControl";
import Video from "../VideoPlayer/Video";

const CarouselItem = ({
	descriptionClassname,
	itemClassName,
	imageClassname,
	videoClassname,
	foregroundVideoClassname,
	imgAlt,
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
	videoCloseControlClassesToRemove,
	videoExtentions = ['.mp4'],
}) => {
	const videoRef = useRef();
	const containerRef = useRef();
	const progressBarRef = useRef();
	const FULLSCREEN_CLASSNAME = "full-screen";
	const FULLSCREEN_PARENT_CLASSNAME = "carousel__item--full-screen";
	const isVideo = itemSrc.match(getRegexStringFromStringArray(videoExtentions)); 

	//TODO: finish regex string generator function from filename exts.
	function getRegexStringFromStringArray(fileExtensions) {
		//figure out how to create a regex that matches file types that end in any number of different file formats (generate the regex string from an array of string file extensions)
		return /.+\.mp4$/i;
	}

	const onVideoProgress = (e) => {
		const video = e.target;
		const item = video.parentNode;
		if (!video || !item) return;

		const percent = video.currentTime / video.duration;
		progressBarRef.current.value = percent;
	};

	const onProgressBarClick = (e) => {
		const clientX = e.clientX;
		const progressBar = e.currentTarget;
		if (!progressBar) return;

		const percent = getPercentOfProgressBar(progressBar, clientX);

		const video = videoRef.current;
		if (!video) return;
		video.currentTime = percent * video.duration;
	};

	const onItemClick = (e) => {
		const item = e.currentTarget;
		if (!item) return;
		e.preventDefault();

		item.classList.toggle(FULLSCREEN_CLASSNAME);
		item.parentNode?.classList.toggle(FULLSCREEN_PARENT_CLASSNAME);

		if (
			item.classList.contains(videoClassname) ||
			item.classList.contains(foregroundVideoClassname)
		) {
			const video = item.querySelector("video");
			const isPlaying = getIsVideoPlaying(video);
			if (isPlaying) {
				video.currentTime = 0;
				video.pause();
				video.removeEventListener("timeupdate", onVideoProgress);
			} else {
				video.play();
				video.addEventListener("timeupdate", onVideoProgress);
			}
		}
	};

	let mediaToAdd = (
		<img
			src={itemSrc}
			className={`${imageClassname}`}
			alt={imgAlt}
			onClick={onItemClick}
		/>
	);

	//TODO: come ack to this line:
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
				/>
				;
				<svg className={`${videoClassname}-svg`}>
					<use xlinkHref={videoSvgXLinkHref}></use>
				</svg>
			</React.Fragment>
		);
	}

	return (
		<article ref={containerRef} className={itemClassName}>
			{mediaToAdd}
			<p className={descriptionClassname}>{imgAlt}</p>

			<PlayControl
				xlinkHref={videoPlayControlSvgXLinkHref}
				videoRef={videoRef}
				progressBarRef={progressBarRef}
			/>

			<StopControl
				xlinkHref={videoStopControlSvgXLinkHref}
				videoRef={videoRef}
			/>

			<PauseControl
				xlinkHref={videoPauseControlSvgXLinkHref}
				videoRef={videoRef}
			/>

			<RestartControl
				xlinkHref={videoRestartControlSvgXLinkHref}
				videoRef={videoRef}
				progressBarRef={progressBarRef}
			/>

			<CloseControl
				xlinkHref={videoCloseControlSvgXLinkHref}
				videoRef={videoRef}
				classNamesToRemove={videoCloseControlClassesToRemove}
				containerRef={containerRef}
			/>
		</article>
	);
};

export default CarouselItem;
