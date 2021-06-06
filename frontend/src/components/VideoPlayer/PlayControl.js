import { attachProgressListener } from "./utils";

const PlayControl = ({
	className = 'card__play', 
	xlinkHref, 
	videoRef, 
	progressBarRef, 
	containerRef = null,
	playingClassname,
	doneClassname,
	stoppedClassname,
	handleVideoEnd,
	handleVideoProgress,
	functionToGetContainer,
}) => {
  let hasProgressEventListener = false;

  const handlePlayVideo = (e) => {

		let container = containerRef && containerRef.current ? containerRef.current : null;
		
		if (!container && functionToGetContainer) container = functionToGetContainer(e);

		if (container?.classList.contains(stoppedClassname))	e.stopPropagation();

		playVideo(videoRef.current, container);
	}

  const playVideo = (video, container) => {
		hasProgressEventListener = attachProgressListener(video, hasProgressEventListener, handleVideoProgress );
		video.addEventListener("ended", handleVideoEnd);

		if (container) {
			container.classList.remove(doneClassname);
			container.classList.add(playingClassname);
			container.classList.remove(stoppedClassname);
		}
		
		video.play();
	}

  return (
    <div onClick={handlePlayVideo} className={`${className}-parent`}>
      <svg className={`${className}`}>
        <use xlinkHref={xlinkHref}></use>
      </svg>
    </div>
  );
}

export default PlayControl;