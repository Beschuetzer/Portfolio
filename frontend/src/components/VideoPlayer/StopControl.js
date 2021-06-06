import { removeClassFromAllChildren } from "../helpers";

const StopControl = ({
	className = 'card__stop', 
	xlinkHref, 
	videoRef, 
	containerRef = null,
	playingClassname,
	doneClassname,
	stoppedClassname,
	functionToGetContainer = null,
}) => {
  const handleStopVideo = (e) => {
		e.stopPropagation();
		stopVideo(videoRef.current, e);
	}

	const stopVideo = (video, e) => {
		if (!video) return;
		video.currentTime = 0;

		let container = containerRef && containerRef.current ? containerRef.current : null;
		
		debugger;
		if (!container && functionToGetContainer) container = functionToGetContainer(e);
		pauseVideo(video, container);
	}

  const pauseVideo = (video, container) => {
		video?.pause();
		if (!container) return;
		container.classList.remove(doneClassname);
		container.classList.add(stoppedClassname);
		container.classList.remove(playingClassname);
		removeClassFromAllChildren(container, playingClassname)
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