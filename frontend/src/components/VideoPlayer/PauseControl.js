import { removeClassFromAllChildren } from "../constants";


const PauseControl = ({
	className = 'card__pause',
	xlinkHref,
	videoRef,
	containerRef = null,
	playingClassname,
	doneClassname,
	stoppedClassname,
}) => {
  const handlePauseVideo = (e) => {
		e.stopPropagation();
		pauseVideo(videoRef.current, containerRef ? containerRef.current : null);
	}

  const pauseVideo = (video, container) => {
		video?.pause();
		if (!container) return;
		container.classList.remove(playingClassname);
		container.classList.remove(doneClassname);
		container.classList.add(stoppedClassname);
		removeClassFromAllChildren(container, playingClassname);
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