import React from "react";
import { useRef } from "react";

import { CARD_MOUSE_LEAVE_INDEX_SWITCH_DURATION } from "./constants";
import Video from "../components/Video";
import { capitalize } from "../helpers";

const Card = ({ title, cardName, fileType = "svg", children, video }) => {
	const videoRef = useRef();
	const cardRef = useRef();
	const checkboxRef = useRef();

	const centerCard = (card) => {
		if (!card) return;

		const sectionDimensions = card.parentNode.getBoundingClientRect();
		const cardDimensions = card.getBoundingClientRect();

		const cardLeftOriginal =
			cardDimensions.left + (cardDimensions.width * 1) / 6;
		const cardRightOriginal =
			cardDimensions.right - (cardDimensions.width * 1) / 6;

		const cardTopOriginal =
			cardDimensions.top + (cardDimensions.height * 1) / 6;
		const cardBottomOriginal =
			cardDimensions.bottom - (cardDimensions.height * 1) / 6;

		const cardCenterXOriginal =
			(cardRightOriginal - cardLeftOriginal) / 2 + cardLeftOriginal;
		const cardCenterYOriginal =
			(cardBottomOriginal - cardTopOriginal) / 2 + cardTopOriginal;

		const containerCenterX =
			(sectionDimensions.right - sectionDimensions.left) / 2 +
			sectionDimensions.left;
		const containerCenterY =
			(sectionDimensions.bottom - sectionDimensions.top) / 2 +
			sectionDimensions.top;

		let translateLeftAmount = Math.abs(cardCenterXOriginal - containerCenterX);
		let translateUpAmount = Math.abs(cardCenterYOriginal - containerCenterY);

		const cardOriginalWidth = (cardDimensions.width * 2) / 3;
		const cardOriginalHeight = (cardDimensions.height * 2) / 3;
		const scaleXFactor = sectionDimensions.width / cardOriginalWidth;
		const scaleYFactor = sectionDimensions.height / cardOriginalHeight;

		if (cardCenterXOriginal < containerCenterX)
			translateLeftAmount = -translateLeftAmount;

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

	const getIsVideoPlaying = (video) => {
		return (
			video.currentTime > 0 &&
			!video.paused &&
			!video.ended &&
			video.readyState > 2
		);
	};

	const toggleCheckbox = () => {
		const checkbox = checkboxRef.current;
		if (!checkbox) checkbox.checked = false;
		checkbox.checked = !checkbox.checked;
	};

	const closeVideo = (video, card) => {
		console.log('close------------------------------------------------');
		const checkbox = checkboxRef.current;
		checkbox.checked = false;

		video.pause();
		video.currentTime = 0;
		if (!card) return;
		card.classList.remove("card--open");
		card.classList.remove("card--done");
		card.classList.remove("card--stopped");
	};

	const openCard = (video, card) => {
		console.log('open card------------------------------------------------');
		centerCard(card);
		// playVideo(video, card);
		const isVideoPlaying = getIsVideoPlaying(video);
		if (!video) return;
		if (isVideoPlaying || card.classList.contains('card--open'))	closeVideo(video, card)
		else {
			playVideo(video, card)
			card.classList.add("card--open");
		}
	}

	const playVideo = (video, card) => {
		console.log('play------------------------------------------------');
		video.addEventListener("ended", handleVideoEnd);
		card.classList.remove("card--done");
		card.classList.remove("card--stopped");
		video.play();
	}

	const pauseVideo = (video, card) => {
		video?.pause();
		if (!card) return;
		card.classList.remove("card--done");
		card.classList.add("card--stopped");
	}

	const stopVideo = (video) => {
		console.log('stop------------------------------------------------');
		if (!video) return;
		video.currentTime = 0;
		pauseVideo(video, cardRef.current);
	}

	const restartVideo = (video, card) => {
		console.log('restart------------------------------------------------');
		if (!video) return;
		video.currentTime = 0;
		if (!getIsVideoPlaying(video)) {
			video.play();
		}
		
		if (!card) return;
		if (card.classList.contains('card--done')) video.addEventListener("ended", handleVideoEnd);
		card.classList.remove('card--done');
	}

	const handleRestartVideo = (e) => {
		e.stopPropagation();
		restartVideo(videoRef.current, cardRef.current);
	}

	const handleCloseVideo = (e) => {
		console.log("close------------------------------------------------");
		e.stopPropagation();
		closeVideo(videoRef.current, cardRef.current);
	};

	const handleVideoEnd = (e) => {
		console.log("end------------------------------------------------");
		cardRef.current?.classList.add("card--done");
		const video = e.currentTarget;
		video.removeEventListener("ended", handleVideoEnd);
	};

	const handlePlayVideo = (e) => {
		const card = cardRef.current;
		if (card?.classList.contains('card--stopped'))	e.stopPropagation();
		playVideo(videoRef.current, card);
	}

	const handlePauseVideo = (e) => {
		e.stopPropagation();
		pauseVideo(videoRef.current, cardRef.current);
	}

	const handleStopVideo = (e) => {
		e.stopPropagation();
		stopVideo(videoRef.current);
	}

	const handleCardClick = (e) => {
		console.log("open------------------------------------------------");
		e.stopPropagation();
		const card = cardRef.current;
		const video = videoRef?.current;
		if (card?.classList.contains("card--done")) return;
		toggleCheckbox();
		openCard(video, card);
	};

	const handleMouseEnter = (e) => {
		e.currentTarget?.classList.add("z-index-content");
	};

	const handleMouseLeave = (e) => {
		const target = e.currentTarget;
		setTimeout(() => {
			target?.classList.remove("z-index-content");
		}, CARD_MOUSE_LEAVE_INDEX_SWITCH_DURATION);
	};

	return (
		<article
			ref={cardRef}
			onMouseLeave={handleMouseLeave}
			onMouseEnter={handleMouseEnter}
			onClick={handleCardClick}
			className="card card--hoverable">
			<input ref={checkboxRef} className="card__checkbox" type="checkbox" />
			<svg onClick={handleStopVideo} className="card__stop">
				<use xlinkHref="/sprite.svg#icon-stop"></use>
			</svg>
			<svg onClick={handlePauseVideo} className="card__pause">
				<use xlinkHref="/sprite.svg#icon-pause"></use>
			</svg>
			<svg onClick={handleRestartVideo} className="card__restart">
				<use xlinkHref="/sprite.svg#icon-restart"></use>
			</svg>
			<img
				className="card__image"
				alt={capitalize(cardName.replace("-", " "))}
				src={`/${cardName}.${fileType}`}
			/>
			<div className="card__content">
        <svg onClick={handleCloseVideo} className="card__close">
          <use xlinkHref="/sprite.svg#icon-close"></use>
        </svg>
        <svg onClick={handlePlayVideo} className="card__play">
          <use xlinkHref="/sprite.svg#icon-play"></use>
        </svg>
				<h4 className="card__title">{title}</h4>
				<Video
					className="fg-video"
					type="mp4"
					src={video}
					autoPlay={false}
					loop={false}
					reference={videoRef}
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

export default Card;
