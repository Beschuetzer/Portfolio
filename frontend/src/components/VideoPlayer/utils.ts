import { RefObject } from "react";

export const attachProgressListener = (video: HTMLVideoElement, hasProgressEventListener: boolean, handleVideoProgress: () => void) => {
  if(!video) return;
  if (!hasProgressEventListener) {
    video.addEventListener('timeupdate', handleVideoProgress);
    return true;
  } 
  return false;
}

export const getPercentOfProgressBar = (progressBar: HTMLProgressElement, clientX: number) => {
  const progressBarBoundingRect = progressBar.getBoundingClientRect();
  const progressBarLeftX = progressBarBoundingRect.left;
  const progressBarRightX = progressBarBoundingRect.right;
  const amountPastLeft = (clientX - progressBarLeftX);
  const percent = amountPastLeft / (progressBarRightX - progressBarLeftX);
  return percent;
}

export const closeVideo = (video: HTMLVideoElement) => {
  if (!video) return;
  video.pause();
  video.currentTime = 0;
};

export const getIsVideoPlaying = (video: HTMLVideoElement) => {
  return (
    video.currentTime > 0 &&
    !video.paused &&
    !video.ended &&
    video.readyState > 2
  );
};

export const handleVideoProgress = (videoRef: RefObject<HTMLVideoElement>, progressBarRef: RefObject<HTMLProgressElement>, e: Event) => {
  const video = videoRef.current;
  if (!video) return;
  const percent = video.currentTime / video.duration;
  ((progressBarRef as any)?.current as HTMLProgressElement).value = percent;
};