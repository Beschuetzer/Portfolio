import React, { useRef } from 'react'
import { CarouselItemViewerProgressBarScreenshotPreviewProps } from './item-viewer/progress-bar/CarouselItemViewerProgressBarScreenshotViewer'
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { CarouselItemViewerToolbarProps } from './item-viewer/toolbar/CarouselItemViewerToolbar';
import { useCarouselContext } from '../context';
import { useSetVideoCurrentTime } from '../hooks/useSetVideoCurrentTime';

type CarouselVideoCurrentTimeViewerPropsProps = {
    isVideoPlaying: boolean;
    itemContainerHeight: string | number;
} &
    Pick<CarouselItemViewerProgressBarScreenshotPreviewProps, 'percent' | 'type' | 'srcMain'> &
    Pick<CarouselItemViewerToolbarProps, 'isProgressBarMouseDownRef'>
export const CarouselVideoCurrentTimeViewer = (props: CarouselVideoCurrentTimeViewerPropsProps) => {
    const {
        isProgressBarMouseDownRef,
        isVideoPlaying,
        itemContainerHeight,
        percent = 0,
        type,
    } = props;
    const { currentItem } = useCarouselContext();
    const { srcMain } = currentItem;
    const videoRef = useRef<HTMLVideoElement>();
    const { stylingLogic } = useBusinessLogic()
    useSetVideoCurrentTime({percent, video: videoRef?.current});

    return (
        <video
            style={stylingLogic.getCarouselVideoCurrentTimeViewerStyle(!!isProgressBarMouseDownRef?.current, itemContainerHeight)}
            ref={videoRef as any}
            autoPlay={false}
            muted={true}
            loop={false}
        >
            <source src={srcMain} type={`video/${type}`} />
        </video>
    )
}