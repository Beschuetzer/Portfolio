import { 
  attachProgressListener,
} from "../constants";

const PlayControl = ({
	className = 'card__play', 
	xlinkHref, 
	videoRef, 
	progressBarRef, 
	containerRef = null,
	playingClassname,
	doneClassname,
	stoppedClassname,
}) => {
  let hasProgressEventListener = false;

  const handlePlayVideo = (e) => {
		const card = containerRef.current;
		if (card?.classList.contains(stoppedClassname))	e.stopPropagation();
		playVideo(videoRef.current, card);
	}

  const playVideo = (video, card) => {
		hasProgressEventListener = attachProgressListener(video, hasProgressEventListener, handleVideoProgress );
		video.addEventListener("ended", handleVideoEnd);
		card.classList.remove(doneClassname);
		card.classList.add(playingClassname);
		card.classList.remove(stoppedClassname);
		video.play();
	}

  const handleVideoProgress = (e) => {
		const video = videoRef.current;
		if (!video) return;
		const percent = video.currentTime / video.duration;
		progressBarRef.current.value = percent;
	}

  const handleVideoEnd = (e) => {
		containerRef.current?.classList.add(doneClassname);
		containerRef.current?.classList.remove(playingClassname);
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