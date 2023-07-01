import React, { useCallback, useState, useEffect, MouseEventHandler, useRef } from 'react'
import { CLASSNAME__ITEM_VIEWER } from '../../../constants';
import { getClassname, getFormattedTimeString } from '../../../utils';
import { VideoTimeStrings } from '../../../types';
import { CarouselItemViewerToolbarProps } from '../toolbar/CarouselItemViewerToolbar';
import { useCarouselContext } from '../../../context';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';

type CarouselItemViewerProgressBarProps = {
    setTimeStrings: React.Dispatch<React.SetStateAction<VideoTimeStrings>>;
} & Pick<CarouselItemViewerToolbarProps, 'videoRef'>
    & Pick<CarouselItemViewerToolbarProps, 'setIsVideoPlaying'>;

const INITIAL_VALUE = 0;
export const CarouselItemViewerProgressBar = ({
    setIsVideoPlaying,
    setTimeStrings,
    videoRef,
}: CarouselItemViewerProgressBarProps) => {
    const { currentItem } = useCarouselContext();

    const isMouseDownRef = useRef(false);
    const [progressBarValue, setProgressBarValue] = useState(INITIAL_VALUE);
    const [seekWidth, setSeekWidth] = useState(INITIAL_VALUE);
    const { stylingLogic } = useBusinessLogic({ progressBarValue });

    const getPercent = useCallback((e: MouseEvent, progressBar: HTMLDivElement) => {
        if (!e || !progressBar) return 0;
        const clientX = e.clientX;
        const progressBarBoundingRect = progressBar.getBoundingClientRect();
        const progressBarLeftX = progressBarBoundingRect.left;
        const progressBarRightX = progressBarBoundingRect.right;
        const amountPastLeft = (clientX - progressBarLeftX);
        return amountPastLeft / (progressBarRightX - progressBarLeftX);
    }, [])

    const onMouseUp = useCallback((e: MouseEvent) => {
        console.log("mouse up");
        
        isMouseDownRef.current = false;
        setIsVideoPlaying && setIsVideoPlaying(true);
        if (videoRef?.current) {
            videoRef.current.currentTime = progressBarValue * videoRef.current.duration;
            videoRef?.current?.play();
        }
    }, [progressBarValue, setIsVideoPlaying, videoRef]);

    const onMouseDown = useCallback((e: MouseEvent) => {
        isMouseDownRef.current = true;
        setIsVideoPlaying && setIsVideoPlaying(false);
        videoRef?.current?.pause();

        const progressBar = e.currentTarget as HTMLDivElement;
        if (!progressBar) return;
        const percent = getPercent(e, progressBar);
        setProgressBarValue(percent);
        if (videoRef?.current) {
            const video = videoRef?.current;
            setSeekWidth(video.currentTime / video.duration);
            video.currentTime = percent * video.duration;
        }
    }, [getPercent, setIsVideoPlaying, videoRef]);

    const onMouseLeave = useCallback((e: MouseEvent) => {
        if (isMouseDownRef.current) {
            onMouseUp(e);
            return;
        };
        setSeekWidth(INITIAL_VALUE);
    }, [onMouseUp])

    const onMouseMove = useCallback((e: MouseEvent) => {
        const progressBar = e.currentTarget as HTMLDivElement;
        if (!progressBar) return;
        const percent = getPercent(e, progressBar);
        if (isMouseDownRef.current) {
            setProgressBarValue(percent)
        } else {
            setSeekWidth(percent);
        }
    }, [getPercent])

    useEffect(() => {
        const videoRefCopy = videoRef?.current;

        function onVideoTimeUpdate(e: Event) {
            const videoElement = e.currentTarget || e.target as any;
            if (!videoElement) return;
            const percent = videoElement.currentTime / videoElement.duration;
            if (percent >= 0 && percent <= 1) {
                setProgressBarValue(percent);
                updateTimeStrings(videoElement);
            }
        }

        function updateTimeStrings(video: HTMLVideoElement) {
            if (!video) return;
            setTimeStrings({
                currentTimeStr: getFormattedTimeString(video.currentTime || -1),
                durationStr: getFormattedTimeString(video.duration || -1),
            });
        }

        if (videoRef?.current) {
            videoRef.current.addEventListener('timeupdate', onVideoTimeUpdate);
        }

        return () => {
            if (videoRefCopy) {
                videoRefCopy.addEventListener('timeupdate', onVideoTimeUpdate);
            }
        }
    }, [setTimeStrings, videoRef])

    useEffect(() => {
        setProgressBarValue(INITIAL_VALUE);
    }, [currentItem])

    return (
        <div
            style={stylingLogic.carouselVideoProgressContainerStyle}
            className={getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-progress` })}
            onMouseDownCapture={onMouseDown as any}
            onMouseUp={onMouseUp as any}
            onMouseMoveCapture={onMouseMove as any}
            onMouseLeave={onMouseLeave as any}
        >
            <div style={stylingLogic.carouselVideoProgressBackgroundStyle} />
            <div style={stylingLogic.getCarouselVideoProgressSeekStyle(seekWidth)} />
            <div style={stylingLogic.getCarouselVideoProgressSeekDotStyle(progressBarValue)} />
            <div style={stylingLogic.carouselVideoProgressForegroundStyle} />
        </div>
    )
}

