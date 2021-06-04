import { 
	CARD_DONE_CLASSNAME,
	CARD_STOPPED_CLASSNAME,
	CARD_PLAYING_CLASSNAME,
} from "../constants";

const PauseControl = ({className = 'card__pause', xlinkHref, videoRef, cardRef = null}) => {
  const handlePauseVideo = (e) => {
		e.stopPropagation();
		pauseVideo(videoRef.current, cardRef ? cardRef.current : null);
	}

  const pauseVideo = (video, card) => {
		video?.pause();
		if (!card) return;
		card.classList.remove(CARD_DONE_CLASSNAME);
		card.classList.add(CARD_STOPPED_CLASSNAME);
		card.classList.remove(CARD_PLAYING_CLASSNAME);
	}

  return (
    <div onClick={handlePauseVideo} className={`${className}-parent`}>
      <svg className={`${className}`}>
        <use xlinkHref={xlinkHref}></use>
      </svg>
    </div>
  );
}

export default PauseControl;