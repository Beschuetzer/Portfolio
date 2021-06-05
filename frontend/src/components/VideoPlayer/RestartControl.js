import { 
  attachProgressListener,
	getIsVideoPlaying,
} from "../constants";

const RestartControl = ({
	className = 'card__restart',
	xlinkHref,
	videoRef,
	progressBarRef,
	cardRef = null,
	playingClassname,
	doneClassname,
	stoppedClassname,
}) => {
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
			card?.classList.add(playingClassname);
			attachProgressListener(video, hasProgressEventListener, handleVideoProgress);
		}
		
		if (!card) return;
		if (card.classList.contains(doneClassname)) video.addEventListener("ended", handleVideoEnd);
		card.classList.remove(doneClassname);
		card.classList.remove(stoppedClassname);
	}

  const handleVideoProgress = (e) => {
		const video = videoRef.current;
		if (!video) return;
		const percent = video.currentTime / video.duration;
		progressBarRef.current.value = percent;
	}

  const handleVideoEnd = (e) => {
		cardRef.current?.classList.add(doneClassname);
		cardRef.current?.classList.remove(playingClassname);
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