import { RefObject } from "react";
import { Reference } from "../constants";
import { removeClassFromAllChildren } from "../utils";

interface PauseControlProps {
	className?: string 
	xlinkHref: string,
	playingClassname: string,
	doneClassname: string,
	stoppedClassname: string,
	videoRef: RefObject<HTMLElement>,
	containerRef?: RefObject<HTMLElement>,
	functionToGetContainer?: (e: MouseEvent) => HTMLElement | null,
}

const PauseControl: React.FC<PauseControlProps> = ({
	className = 'card__pause',
	xlinkHref,
	videoRef,
	containerRef = null,
	playingClassname,
	doneClassname,
	stoppedClassname,
	functionToGetContainer = null,
}) => {
  const handlePauseVideo = (e: MouseEvent) => {
		e.stopPropagation();

		let container = containerRef && containerRef.current ? containerRef.current : null;
		
		if (!container && functionToGetContainer) container = functionToGetContainer(e);

		pauseVideo((videoRef?.current) as HTMLVideoElement, container as HTMLElement);
	}

  const pauseVideo = (video: HTMLVideoElement, container: HTMLElement) => {
		video?.pause();
		if (!container) return;
		container.classList.remove(playingClassname);
		container.classList.remove(doneClassname);
		container.classList.add(stoppedClassname);
		removeClassFromAllChildren(container, playingClassname);
	}

  return (
    <div onClick={(e: any) => handlePauseVideo(e)} className={`${className}-parent`}>
      <svg className={`${className}`}>
        <use xlinkHref={xlinkHref}></use>
      </svg>
    </div>
  );
}

export default PauseControl;