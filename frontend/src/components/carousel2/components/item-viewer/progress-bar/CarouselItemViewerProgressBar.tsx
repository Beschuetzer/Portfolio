import React, { useCallback, useState, useEffect } from 'react'
import { CLASSNAME__ITEM_VIEWER } from '../../../constants';
import { getClassname, getFormattedTimeString } from '../../../utils';
import { VideoTimeStrings } from '../../../types';
import { CarouselItemViewerToolbarProps } from '../toolbar/CarouselItemViewerToolbar';
import { useCarouselContext } from '../../../context';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';

type CarouselItemViewerProgressBarProps = {
    setTimeStrings: React.Dispatch<React.SetStateAction<VideoTimeStrings>>;
} & Pick<CarouselItemViewerToolbarProps, 'videoRef'>;

const INITIAL_VALUE = 0;
export const CarouselItemViewerProgressBar = ({
    setTimeStrings,
    videoRef,
}: CarouselItemViewerProgressBarProps) => {
    const { currentItem } = useCarouselContext();

    const [progressBarValue, setProgressBarValue] = useState(INITIAL_VALUE);
    const { stylingLogic } = useBusinessLogic({ progressBarValue });

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
    }, [videoRef]);

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
            style={stylingLogic.carouselVideoProgressBackgroundStyle}
            className={getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-progress` })}
            onClick={onProgressBarClick as any}
        >
            <div style={stylingLogic.carouselVideoProgressForegroundStyle} />
        </div>
    )
}

