import React, { MouseEventHandler, ReactChildren } from "react";
import { useRef } from "react";
import { connect, RootStateOrAny } from "react-redux";

import { MOBILE_BREAK_POINT_WIDTH, ANIMATION_DURATION, Reference } from "../constants";
import { setIsCardVideoOpen } from "../../actions";

import Video, { FOREGROUND_VIDEO_CLASSNAME } from "../VideoPlayer/Video";
import { capitalize } from "../../helpers";
import PauseControl from "../VideoPlayer/PauseControl";
import StopControl from "../VideoPlayer/StopControl";
import PlayControl from "../VideoPlayer/PlayControl";
import RestartControl from "../VideoPlayer/RestartControl";
import CloseControl from "../VideoPlayer/CloseControl";
import {
	adjustCardYPosition,
	CARD_DEFAULT_CLASSNAME,
	CARD_DONE_CLASSNAME,
	CARD_OPEN_CLASSNAME,
	CARD_PLAYING_CLASSNAME,
	CARD_STOPPED_CLASSNAME,
	centerCard,
	changeSectionTitle,
	closeCard,
	getCardCoordinates,
	getFeaturesBridgeSectionTitles,
	getGapAmount,
} from "./utils";
import {
	bridgeSections,
	BRIDGE_BACKDROP_CLASSNAME,
	BRIDGE_SECTION_TITLES_CLASSNAME,
} from "../../pages/examples/bridge/utils";
import {
	attachProgressListener,
	closeVideo,
	getIsVideoPlaying,
	getPercentOfProgressBar,
} from "../VideoPlayer/utils";
import { scrollToSection } from "../helpers";

interface CardProps {
	title: string;
	cardName: string;
	fileType: string;
	children: ReactChildren;
	video: string;
	viewPortWidth: number;
	isMobile: boolean;
	headerHeight: number;
	setIsCardVideoOpen: (value: boolean) => void;
}

const Card: React.FC<CardProps> = ({
	title,
	cardName,
	fileType = "svg",
	children,
	video,
	viewPortWidth,
	isMobile,
	headerHeight,
	setIsCardVideoOpen,
}) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const cardRef = useRef<HTMLElement>(null);
	const progressBarRef = useRef<HTMLProgressElement>(null);
	let hasProgressEventListener = false;

	const openCard = (
		video: HTMLVideoElement,
		card: HTMLElement,
		backdrop: HTMLElement,
		initialCardDimensions: ClientRect,
	) => {
		if (!card) return;
	
		const cardDimensions = card.getBoundingClientRect();
		centerCard(card, cardDimensions, initialCardDimensions, viewPortWidth, isMobile);
	
		const isVideoPlaying = getIsVideoPlaying(video);
		if (!video) return;
		if (isVideoPlaying || card.classList.contains(CARD_OPEN_CLASSNAME))
			return closeCard(video, card, titleRef as Reference, setIsCardVideoOpen);
		else {
			playVideo(video, card);
			card.classList.add(CARD_OPEN_CLASSNAME);
		}
	
		setTimeout(() => {
			adjustCardYPosition(video);
			backdrop?.classList.remove("visible");
			card.classList.remove("z-index-highest");
		}, ANIMATION_DURATION / 2);
	
		setIsCardVideoOpen(true);
	};

	const playVideo = (video: HTMLVideoElement, card: HTMLElement) => {
		hasProgressEventListener = attachProgressListener(
			video,
			hasProgressEventListener,
			(handleVideoProgress as any),
		)!;
		video.addEventListener("ended", handleVideoEnd);
		card.classList.remove(CARD_DONE_CLASSNAME);
		card.classList.add(CARD_PLAYING_CLASSNAME);
		card.classList.remove(CARD_STOPPED_CLASSNAME);
		video.play();
	};

	const handleVideoProgress = (e: Event) => {
		const video = videoRef.current;
		if (!video) return;
		const percent = video.currentTime / video.duration;
		((progressBarRef as any).current as HTMLProgressElement).value = percent;
	};

	const handleVideoEnd = (e: Event) => {
		cardRef.current?.classList.add(CARD_DONE_CLASSNAME);
		cardRef.current?.classList.remove(CARD_PLAYING_CLASSNAME);
		const video = e.currentTarget;
		if (video) video.removeEventListener("ended", handleVideoEnd);
	};

	const handleCardClick = (e: MouseEventHandler<HTMLElement>) => {
		const clickedCard = cardRef.current as HTMLElement;
		clickedCard?.classList.add("z-index-highest");
		const initialCardSize = clickedCard?.getBoundingClientRect();
		const bridgeBackdrop = document.querySelector(
			`.${BRIDGE_BACKDROP_CLASSNAME}`,
		) as HTMLElement;
		bridgeBackdrop?.classList.add("visible");

		(e as any).stopPropagation();
		const video = videoRef?.current as HTMLVideoElement;
		if (
			clickedCard?.classList.contains(CARD_DONE_CLASSNAME) ||
			clickedCard?.classList.contains(CARD_OPEN_CLASSNAME)
		)
			return;

		setTimeout(() => {
			changeSectionTitle(titleRef);
			openCard(video, clickedCard, bridgeBackdrop, initialCardSize);
			scrollToSection(
				document.querySelector(`#${bridgeSections[1].toLowerCase()}`),
				headerHeight,
			);
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

	const handleProgressBarClick = (e: MouseEventHandler<HTMLElement>) => {
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
	};

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
						["z-index-highest", cardRef.current],
					]}
					functionToRunOnClose={() => changeSectionTitle(titleRef, false)}
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
					progressBarOnClick={handleProgressBarClick}
				>
					<div className="card__children">
						{/* <svg className="card__children-toggler">
              <use xlinkHref="/sprite.svg#icon-angle-double-down"></use>
            </svg> */}
						{children}
					</div>
				</Video>
			</div>
		</article>
	);
};

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		viewPortWidth: state.general.viewPortWidth,
		isMobile: state.general.isMobile,
		headerHeight: state.general.headerHeight,
	};
};

export default connect(mapStateToProps, {
	setIsCardVideoOpen,
})(Card);
