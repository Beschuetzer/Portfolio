import { 
	CARD_DONE_CLASSNAME,
	CARD_STOPPED_CLASSNAME,
	CARD_PLAYING_CLASSNAME,
} from "../constants";

const StopControl = ({className = 'card__stop', xlinkHref, videoRef, cardRef = null}) => {
  const handleStopVideo = (e) => {
		e.stopPropagation();
		stopVideo(videoRef.current);
	}

	const stopVideo = (video) => {
		if (!video) return;
		video.currentTime = 0;
		pauseVideo(video, cardRef ? cardRef.current : null);
	}

  const pauseVideo = (video, card) => {
		video?.pause();
		if (!card) return;
		card.classList.remove(CARD_DONE_CLASSNAME);
		card.classList.add(CARD_STOPPED_CLASSNAME);
		card.classList.remove(CARD_PLAYING_CLASSNAME);
	}

  return (
    <div onClick={handleStopVideo} className={`${className}-parent`}>
      <svg className={`${className}`}>
        <use xlinkHref={xlinkHref}></use>
      </svg>
    </div>
  );
}

export default StopControl;