import React, {
  MouseEventHandler,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { getPercentOfProgressBar } from "../../helpers";

export const FOREGROUND_VIDEO_CLASSNAME = "fg-video";

interface VideoProps {
  className: string;
  src: string;
  type: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  reference?: any;
  progressBarRef?: any;
  progressBarClassname?: string;
  progressBarOnClick?: (e: any) => void;
  onClick?: (e: any) => void;
  children?: any;
}

export const Video = forwardRef<HTMLVideoElement, VideoProps>(
  (
    {
      className,
      src,
      type,
      autoPlay = true,
      muted = true,
      loop = true,
      onClick = null,
      progressBarRef = null,
      progressBarOnClick = null,
      progressBarClassname = "card__progress",
      children,
    },
    ref
  ) => {
    const [progressBarValue, setProgressBarValue] = useState(0);
    const innerRef = useRef<HTMLVideoElement>(null);
    useImperativeHandle(ref, () => innerRef.current as any);

    const onProgressBarClick = useCallback(
      (e: MouseEventHandler<HTMLProgressElement>) => {
        const clientX = (e as any).clientX;
        if (!progressBarRef.current) return;
        const percent = getPercentOfProgressBar(
          progressBarRef.current,
          clientX
        );
        const video = innerRef.current;
        if (video) {
          video.currentTime = percent * video.duration;
        }
        progressBarOnClick && progressBarOnClick(percent);
        setProgressBarValue(percent);
      },
      [progressBarOnClick, progressBarRef]
    );

    return (
      <React.Fragment>
        <div
          className={className}
          onClick={onClick ? (e: any) => onClick(e) : undefined}
        >
          <video
            ref={innerRef as any}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
          >
            <source src={src} type={`video/${type}`} />
          </video>
          {children ? (
            <div className={`${className}__children`}>{children}</div>
          ) : null}
        </div>
        <progress
          onClick={onProgressBarClick as any}
          ref={progressBarRef}
          value={progressBarValue}
          className={progressBarClassname}
        ></progress>
      </React.Fragment>
    );
  }
);
