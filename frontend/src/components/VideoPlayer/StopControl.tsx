import { removeClassFromAllChildren } from "../helpers";

interface StopControlProps{
	className?: string,
	xlinkHref: string, 
	videoRef: any,
	containerRef?: any,
	playingClassname: string,
	doneClassname: string,
	stoppedClassname: string,
	functionToGetContainer?: (e: any) => void,
}

const StopControl: React.FC<StopControlProps> = ({
	className = 'card__stop', 
	xlinkHref, 
	videoRef, 
	containerRef = null,
	playingClassname,
	doneClassname,
	stoppedClassname,
	functionToGetContainer = null,
}) => {
  const handleStopVideo = (e: MouseEvent) => {
		e.stopPropagation();
		stopVideo(videoRef.current, e);
	}

	const stopVideo = (video: HTMLVideoElement, e: MouseEvent) => {
		if (!video) return;
		video.currentTime = 0;

		let container = containerRef && containerRef.current ? containerRef.current : null;
		
		if (!container && functionToGetContainer) container = functionToGetContainer(e);
		pauseVideo(video, container);
	}

  const pauseVideo = (video: HTMLVideoElement, container: HTMLElement) => {
		video?.pause();
		if (!container) return;
		container.classList.remove(doneClassname);
		container.classList.add(stoppedClassname);
		container.classList.remove(playingClassname);
		removeClassFromAllChildren(container, playingClassname)
	}

  return (
    <div onClick={(e: any) => handleStopVideo(e)} className={`${className}-parent`}>
      <svg className={`${className}`}>
        <use xlinkHref={xlinkHref}></use>
      </svg>
    </div>
  );
}

export default StopControl;