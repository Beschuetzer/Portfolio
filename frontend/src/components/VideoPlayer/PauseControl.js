

const PauseControl = ({
	className = 'card__pause',
	xlinkHref,
	videoRef,
	cardRef = null,
	playingClassname,
	doneClassname,
	stoppedClassname,
}) => {
  const handlePauseVideo = (e) => {
		e.stopPropagation();
		pauseVideo(videoRef.current, cardRef ? cardRef.current : null);
	}

  const pauseVideo = (video, card) => {
		video?.pause();
		if (!card) return;
		card.classList.remove(playingClassname);
		card.classList.remove(doneClassname);
		card.classList.add(stoppedClassname);
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