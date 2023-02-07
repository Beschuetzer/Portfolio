import { attachProgressListener } from "./utils";

interface PlayControlProps {
	className?: string,
	xlinkHref: string, 
	videoRef: any, 
	containerRef?: any,
	playingClassname: string,
	doneClassname: string,
	stoppedClassname: string,
	handleVideoEnd?: (e: any) => void,
	handleVideoProgress?: (e: any) => void,
	functionToGetContainer?: (e: any) => void,
}

export const PlayControl: React.FC<PlayControlProps> = ({
	className = 'card__play', 
	xlinkHref, 
	videoRef, 
	containerRef = null,
	playingClassname,
	doneClassname,
	stoppedClassname,
	handleVideoEnd = null,
	handleVideoProgress = null,
	functionToGetContainer = null,
}) => {
  let hasProgressEventListener = false;

  const handlePlayVideo = (e: MouseEvent) => {
		let container = containerRef && containerRef.current ? containerRef.current : null;
		
		if (!container && functionToGetContainer) container = functionToGetContainer(e);

		if (container?.classList.contains(stoppedClassname))	e.stopPropagation();

		playVideo(videoRef.current, container);
	}

  const playVideo = (video: HTMLVideoElement, container: HTMLElement) => {
		hasProgressEventListener = attachProgressListener(video, hasProgressEventListener, (handleVideoProgress as any) ) as boolean;
		video.addEventListener("ended", (handleVideoEnd as any));

		if (container) {
			container.classList.remove(doneClassname);
			container.classList.add(playingClassname);
			container.classList.remove(stoppedClassname);
		}
		
		video.play();
	}

  return (
    <div onClick={(e:any) => handlePlayVideo(e)} className={`${className}-parent`}>
      <svg className={`${className}`}>
        <use xlinkHref={xlinkHref}></use>
      </svg>
    </div>
  );
}