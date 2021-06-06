import { attachProgressListener, getIsVideoPlaying } from "./utils";

const RestartControl = ({
	className = 'card__restart',
	xlinkHref,
	videoRef,
	progressBarRef,
	containerRef = null,
	playingClassname,
	doneClassname,
	stoppedClassname,
	functionToGetContainer,
}) => {
  let hasProgressEventListener = false;

	const handleRestartVideo = (e) => {
		e.stopPropagation();

		let container = containerRef && containerRef.current ? containerRef.current : null;
		
		if (!container && functionToGetContainer) container = functionToGetContainer(e);

		restartVideo(videoRef.current, container);
	}

	const restartVideo = (video, container) => {
		if (!video) return;
		video.currentTime = 0;
		if (!getIsVideoPlaying(video)) {
			video.play();
			container?.classList.add(playingClassname);
			attachProgressListener(video, hasProgressEventListener, handleVideoProgress);
		}
		
		if (!container) return;
		if (container.classList.contains(doneClassname)) video.addEventListener("ended", handleVideoEnd);
		container.classList.remove(doneClassname);
		container.classList.remove(stoppedClassname);
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
    <div onClick={handleRestartVideo} className={`${className}-parent`}>
      <svg className={`${className}`}>
        <use xlinkHref={xlinkHref}></use>
      </svg>
    </div>
  );
}

export default RestartControl;