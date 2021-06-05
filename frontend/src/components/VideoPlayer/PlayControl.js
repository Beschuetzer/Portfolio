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
}) => {
  let hasProgressEventListener = false;

  const handlePlayVideo = (e) => {
		const container = containerRef?.current;
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