
const StopControl = ({
	className = 'card__stop', 
	xlinkHref, 
	videoRef, 
	containerRef = null,
	playingClassname,
	doneClassname,
	stoppedClassname,
}) => {
  const handleStopVideo = (e) => {
		e.stopPropagation();
		stopVideo(videoRef.current);
	}

	const stopVideo = (video) => {
		if (!video) return;
		video.currentTime = 0;
		pauseVideo(video, containerRef ? containerRef.current : null);
	}

  const pauseVideo = (video, container) => {
		video?.pause();
		if (!container) return;
		container.classList.remove(doneClassname);
		container.classList.add(stoppedClassname);
		container.classList.remove(playingClassname);
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