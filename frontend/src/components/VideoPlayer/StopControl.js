
const StopControl = ({
	className = 'card__stop', 
	xlinkHref, 
	videoRef, 
	cardRef = null,
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
		pauseVideo(video, cardRef ? cardRef.current : null);
	}

  const pauseVideo = (video, card) => {
		video?.pause();
		if (!card) return;
		card.classList.remove(doneClassname);
		card.classList.add(stoppedClassname);
		card.classList.remove(playingClassname);
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