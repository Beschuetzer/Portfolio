import React from 'react';
import { 
	CARD_DONE_CLASSNAME,
	CARD_STOPPED_CLASSNAME,
	CARD_PLAYING_CLASSNAME,
  attachProgressListener,
} from "../constants";

const PlayControl = ({className, xlinkHref, videoRef, progressBarRef, cardRef = null}) => {
  let hasProgressEventListener = false;

  const handlePlayVideo = (e) => {
		const card = cardRef.current;
		if (card?.classList.contains(CARD_STOPPED_CLASSNAME))	e.stopPropagation();
		playVideo(videoRef.current, card);
	}

  const playVideo = (video, card) => {
		hasProgressEventListener = attachProgressListener(video, hasProgressEventListener, handleVideoProgress );
		video.addEventListener("ended", handleVideoEnd);
		card.classList.remove(CARD_DONE_CLASSNAME);
		card.classList.add(CARD_PLAYING_CLASSNAME);
		card.classList.remove(CARD_STOPPED_CLASSNAME);
		video.play();
	}

  const handleVideoProgress = (e) => {
		const video = videoRef.current;
		if (!video) return;
		const percent = video.currentTime / video.duration;
		progressBarRef.current.value = percent;
	}

  const handleVideoEnd = (e) => {
		cardRef.current?.classList.add(CARD_DONE_CLASSNAME);
		cardRef.current?.classList.remove(CARD_PLAYING_CLASSNAME);
		const video = e.currentTarget;
		video.removeEventListener("ended", handleVideoEnd);
	};

  return (
    <div onClick={handlePlayVideo} className={`${className}-parent`}>
      <svg className={`${className}`}>
        <use xlinkHref={xlinkHref}></use>
      </svg>
    </div>
  );
}

export default PlayControl;