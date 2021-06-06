import { removeClassFromAllChildren } from "../helpers";


const PauseControl = ({
	className = 'card__pause',
	xlinkHref,
	videoRef,
	containerRef = null,
	playingClassname,
	doneClassname,
	stoppedClassname,
	functionToGetContainer,
}) => {
  const handlePauseVideo = (e) => {
		e.stopPropagation();

		let container = containerRef && containerRef.current ? containerRef.current : null;
		
		if (!container && functionToGetContainer) container = functionToGetContainer(e);

		pauseVideo(videoRef.current, container);
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