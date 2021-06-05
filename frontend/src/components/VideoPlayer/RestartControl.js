import { 
	CARD_DONE_CLASSNAME,
	CARD_STOPPED_CLASSNAME,
	CARD_PLAYING_CLASSNAME,
  attachProgressListener,
	getIsVideoPlaying,
} from "../constants";

const RestartControl = ({className = 'card__restart', xlinkHref, videoRef, progressBarRef, cardRef = null}) => {
  let hasProgressEventListener = false;

	const handleRestartVideo = (e) => {
		e.stopPropagation();
		restartVideo(videoRef.current, cardRef ? cardRef.current : null);
	}

	const restartVideo = (video, card) => {
		if (!video) return;
		video.currentTime = 0;
		if (!getIsVideoPlaying(video)) {
			video.play();
			card?.classList.add(CARD_PLAYING_CLASSNAME);
			attachProgressListener(video, hasProgressEventListener, handleVideoProgress);
		}
		
		if (!card) return;
		if (card.classList.contains(CARD_DONE_CLASSNAME)) video.addEventListener("ended", handleVideoEnd);
		card.classList.remove(CARD_DONE_CLASSNAME);
		card.classList.remove(CARD_STOPPED_CLASSNAME);
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
    <div onClick={handleRestartVideo} className={`${className}-parent`}>
      <svg className={`${className}`}>
        <use xlinkHref={xlinkHref}></use>
      </svg>
    </div>
  );
}

export default RestartControl;