import React from "react";
import { useRef } from "react";
import { connect } from 'react-redux';

import { 
	CARD_MOUSE_LEAVE_INDEX_SWITCH_DURATION, 
	MOBILE_BREAK_POINT_WIDTH,
} from "./constants";
import Video from "../components/Video";
import { capitalize } from "../helpers";

const Card = ({ title, cardName, fileType = "svg", children, video, viewPortWidth, isMobile }) => {
	const videoRef = useRef();
	const cardRef = useRef();
	const checkboxRef = useRef();
	const progressBarRef = useRef();
	let hasProgressEventListener = false;

	const getCardCoordinates = (card, cardDimensions) => {

		let cardLeftOriginal = cardDimensions.left;
		let cardRightOriginal = cardDimensions.right;
		let cardTopOriginal = cardDimensions.top;
		let cardBottomOriginal = cardDimensions.bottom;
		let cardCenterXOriginal =	(cardRightOriginal - cardLeftOriginal) / 2 + cardLeftOriginal;
		let cardCenterYOriginal = (cardBottomOriginal - cardTopOriginal) / 2 + cardTopOriginal;

		if (viewPortWidth > MOBILE_BREAK_POINT_WIDTH) {
			cardLeftOriginal = cardDimensions.left + (cardDimensions.width * 1) / 6;
			cardRightOriginal = cardDimensions.right - (cardDimensions.width * 1) / 6;

			cardTopOriginal = cardDimensions.top + (cardDimensions.height * 1) / 6;
			cardBottomOriginal = cardDimensions.bottom - (cardDimensions.height * 1) / 6;

			cardCenterXOriginal = (cardRightOriginal - cardLeftOriginal) / 2 + cardLeftOriginal;
			cardCenterYOriginal = (cardBottomOriginal - cardTopOriginal) / 2 + cardTopOriginal;
		}

		const transformOrigin = getComputedStyle(card)['transformOrigin'];
		const split = transformOrigin.split(' ');
		const yCornerOffset = isMobile ? 1.75 : 1.85;
		const xCornerOffset = 1.1675;
		const cardScaleOnHoverAmount = 3 / 2;
		const yTransformOffset = parseFloat(split[0]);
		const xTransformOffset = parseFloat(split[1]);
		const xValueToMatch = cardDimensions.width / cardScaleOnHoverAmount;
		const yValueToMatch = cardDimensions.height / cardScaleOnHoverAmount;
		const xCondition = Math.abs(yTransformOffset - xValueToMatch) < 1;
		const yCondition = Math.abs(xTransformOffset - yValueToMatch) < 1;
		const xConditionHalf = Math.abs(yTransformOffset * 2 - xValueToMatch) < 1;
		const yConditionHalf = Math.abs(xTransformOffset * 2 - yValueToMatch) < 1;

		const isTransformOriginTopLeft = xTransformOffset === 0 && yTransformOffset === 0;
		const isTransformOriginTopRight = xTransformOffset === 0 && xCondition;
		const isTransformOriginBottomLeft = yCondition && yTransformOffset === 0;
		const isTransformOriginBottomRight = yCondition && xCondition;
		const isTransformOriginTop = xTransformOffset === 0 && xConditionHalf ;
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
			cardCenterYOriginal = cardCenterYOriginal + (cardDimensions.height / cardScaleOnHoverAmount / yCornerOffset);
		}
		else if (isTransformOriginBottomLeft || isTransformOriginBottomRight) {
			cardCenterYOriginal = cardCenterYOriginal - (cardDimensions.height / cardScaleOnHoverAmount / yCornerOffset);
		}

		if (isTransformOriginTopLeft || isTransformOriginBottomLeft) {
			cardCenterXOriginal = cardCenterXOriginal + (cardDimensions.width * xCornerOffset);
		} 
		else if (isTransformOriginTopRight || isTransformOriginBottomRight) {
			cardCenterXOriginal = cardCenterXOriginal - (cardDimensions.width * xCornerOffset);
		} 

		else if (isTransformOriginTop) cardCenterYOriginal += yTransformOffset * cardScaleOnHoverAmount;
		else if (isTransformOriginBottom) cardCenterYOriginal -= yTransformOffset * cardScaleOnHoverAmount;
		else if (isTransformOriginLeft) cardCenterXOriginal += xTransformOffset * cardScaleOnHoverAmount;
		else if (isTransformOriginRight) cardCenterXOriginal -= xTransformOffset * cardScaleOnHoverAmount;
		
		// cardCenterXOriginal += xOffset;

		return {
			cardCenterXOriginal,
			cardCenterYOriginal,
		}
	}

	const centerCard = (card) => {
		if (!card) return;
		
		const cardDimensions = card.getBoundingClientRect();

		const {
			cardCenterXOriginal,
			cardCenterYOriginal,
		} = getCardCoordinates(card, cardDimensions);

		const sectionDimensions = card.parentNode.getBoundingClientRect();

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

	const attachProgressListener = (video) => {
		if(!video) return;
		if (!hasProgressEventListener) {
			video.addEventListener('timeupdate', handleVideoProgress);
			hasProgressEventListener = true;
		} 
	}

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
		attachProgressListener(video);
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
		if (!video) return;
		video.currentTime = 0;
		pauseVideo(video, cardRef.current);
	}

	const restartVideo = (video, card) => {
		if (!video) return;
		video.currentTime = 0;
		if (!getIsVideoPlaying(video)) {
			video.play();
			attachProgressListener(video);
		}
		
		if (!card) return;
		if (card.classList.contains('card--done')) video.addEventListener("ended", handleVideoEnd);
		card.classList.remove('card--done');
		card.classList.remove("card--stopped");
	}

	const handleRestartVideo = (e) => {
		e.stopPropagation();
		restartVideo(videoRef.current, cardRef.current);
	}

	const handleCloseVideo = (e) => {
		e.stopPropagation();
		closeVideo(videoRef.current, cardRef.current);
	};

	const handleVideoProgress = (e) => {
		const video = videoRef.current;
		if (!video) return;
		const percent = video.currentTime / video.duration;
		progressBarRef.current.value = percent;
	}

	const handleVideoEnd = (e) => {
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
		e.stopPropagation();
		const card = cardRef.current;
		const video = videoRef?.current;
		if (card?.classList.contains("card--done") || card?.classList.contains('card--open')) return;
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

			<div onClick={handleStopVideo} className="card__stop-parent">
				<svg className="card__stop">
					<use xlinkHref="/sprite.svg#icon-stop"></use>
				</svg>
			</div>

			<div onClick={handlePauseVideo} className="card__pause-parent">
				<svg className="card__pause">
					<use xlinkHref="/sprite.svg#icon-pause"></use>
				</svg>
			</div>
		
			<div onClick={handleRestartVideo} className="card__restart-parent">
				<svg className="card__restart">
					<use xlinkHref="/sprite.svg#icon-restart"></use>
				</svg>
			</div>

			<img
				className="card__image"
				alt={capitalize(cardName.replace("-", " "))}
				src={`/${cardName}.${fileType}`}
			/>
			<div className="card__content">
				<div onClick={handleCloseVideo} className="card__close-parent">
					<svg className="card__close">
						<use xlinkHref="/sprite.svg#icon-close"></use>
					</svg>
				</div>

				<div onClick={handlePlayVideo} className="card__play-parent">
					<svg className="card__play">
						<use xlinkHref="/sprite.svg#icon-play"></use>
        	</svg>
				</div>

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
				<progress ref={progressBarRef} value='0' className="card__progress">
				</progress>
			</div>
		</article>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		viewPortWidth: state.general.viewPortWidth,
		isMobile: state.general.isMobile,
	}
}

export default connect(mapStateToProps, {

})(Card);
