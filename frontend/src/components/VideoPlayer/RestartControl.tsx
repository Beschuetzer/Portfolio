import { attachProgressListener, getIsVideoPlaying } from "./utils";
interface RestartControlProps {
	className?: string,
	xlinkHref: string,
	videoRef: any,
	progressBarRef: any,
	containerRef?: any,
	playingClassname: string,
	doneClassname: string,
	stoppedClassname: string,
	functionToGetContainer?: (e: any) => void,
}

const RestartControl: React.FC<RestartControlProps> = ({
	className = 'card__restart',
	xlinkHref,
	videoRef,
	progressBarRef,
	containerRef = null,
	playingClassname,
	doneClassname,
	stoppedClassname,
	functionToGetContainer = null,
}) => {
  let hasProgressEventListener = false;

	const handleRestartVideo = (e: Event) => {
		e.stopPropagation();

		let container = containerRef && containerRef.current ? containerRef.current : null;
		
		if (!container && functionToGetContainer) container = functionToGetContainer(e);

		restartVideo(videoRef.current, container);
	}

	const restartVideo = (video: HTMLVideoElement, container: HTMLElement) => {
		if (!video) return;
		video.currentTime = 0;
		if (!getIsVideoPlaying(video)) {
			video.play();
			container?.classList.add(playingClassname);
			attachProgressListener(video, hasProgressEventListener, handleVideoProgress as any);
		}
		
		if (!container) return;
		if (container.classList.contains(doneClassname)) video.addEventListener("ended", handleVideoEnd);
		container.classList.remove(doneClassname);
		container.classList.remove(stoppedClassname);
	}

  const handleVideoProgress = (e: Event) => {
		const video = videoRef.current;
		if (!video) return;
		const percent = video.currentTime / video.duration;
		progressBarRef.current.value = percent;
	}

  const handleVideoEnd = (e: Event) => {
		containerRef.current?.classList.add(doneClassname);
		containerRef.current?.classList.remove(playingClassname);
		const video = e.currentTarget;
		video?.removeEventListener("ended", handleVideoEnd);
	};

  return (
    <div onClick={(e: any) => handleRestartVideo(e)} className={`${className}-parent`}>
      <svg className={`${className}`}>
        <use xlinkHref={xlinkHref}></use>
      </svg>
    </div>
  );
}

export default RestartControl;