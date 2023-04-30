import React, { useCallback, useRef, useState, useEffect } from 'react'
import { CLASSNAME__ITEM_VIEWER } from '../../constants';
import { getClassname, getFormattedTimeString } from '../../utils';
import { VideoTimeStrings } from '../../types';
import { CarouselItemViewerToolbarProps } from './toolbar/CarouselItemViewerToolbar';
import { useCarouselInstanceContext } from '../CarouselInstanceProvider';
import { StylingLogic } from '../../business-logic/StylingLogic';
import { useCarouselContext } from '../../context';

type CarouselItemViewerProgressBarProps = {
    setTimeStrings: React.Dispatch<React.SetStateAction<VideoTimeStrings>>;
} & Pick<CarouselItemViewerToolbarProps, 'videoRef'>;

const INITIAL_VALUE = 0;
export const CarouselItemViewerProgressBar = ({
    setTimeStrings,
    videoRef,
}: CarouselItemViewerProgressBarProps) => {
    const { options: optionsLocal } = useCarouselContext();
    const { options: optionsGlobal, currentItemInInstance } = useCarouselInstanceContext();
    const options = { ...optionsLocal, ...optionsGlobal};  //for some reason some setting only appear in one or the other
    
    const [progressBarValue, setProgressBarValue] = useState(INITIAL_VALUE);
    const stylingLogic = new StylingLogic({ options, progressBarValue });

    const onProgressBarClick = useCallback((e: MouseEvent) => {
        const clientX = e.clientX;
        const progressBar = e.currentTarget as HTMLProgressElement;

        if (!progressBar) return;

        const progressBarBoundingRect = progressBar.getBoundingClientRect();
        const progressBarLeftX = progressBarBoundingRect.left;
        const progressBarRightX = progressBarBoundingRect.right;
        const amountPastLeft = (clientX - progressBarLeftX);
        const percent = amountPastLeft / (progressBarRightX - progressBarLeftX);

        setProgressBarValue(percent);
        if (videoRef?.current) {
            const video = videoRef?.current;
            video.currentTime = percent * video.duration;
        }
    }, [setProgressBarValue, videoRef]);

    useEffect(() => {
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
            if (videoRef?.current) {
                videoRef.current.addEventListener('timeupdate', onVideoTimeUpdate);
            }
        }
    }, [])

    useEffect(() => {
       setProgressBarValue(INITIAL_VALUE);
    }, [currentItemInInstance])

    return (
        <div
            style={stylingLogic.carouselVideoProgressBackgroundStyle}
            className={getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-progress` })}
            onClick={onProgressBarClick as any}
        >
            <div style={stylingLogic.carouselVideoProgressForegroundStyle} />
        </div>
    )
}

