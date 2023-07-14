import React, { useRef } from 'react'
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';
import { getFormattedTimeString } from '../../../utils';
import { useCarouselContext } from '../../../context';
import { CarouselItemViewerToolbarProps } from '../toolbar/CarouselItemViewerToolbar';

type CarouselItemViewerProgressBarScreenshotPreviewProps = {
    toolbarRef: React.MutableRefObject<HTMLDivElement>;
} & Pick<CarouselItemViewerToolbarProps, 'videoRef' | 'currentVideoSection' | 'percent'>

export const CarouselVideoProgressBarScreenshotPreview = ({
    currentVideoSection,
    percent = 0,
    toolbarRef,
    videoRef,
}: CarouselItemViewerProgressBarScreenshotPreviewProps) => {
    const { currentItem } = useCarouselContext();
    const { sections } = currentItem?.video || {};

    const { stylingLogic } = useBusinessLogic({});
    const screenShotRef = useRef<HTMLCanvasElement>();

    return (
        <div
            style={stylingLogic.getCarouselVideoProgressSeekThumbnailContainerStyle(percent, toolbarRef.current)}
        >
            <canvas
                ref={screenShotRef as any}
                style={stylingLogic.carouselVideoProgressSeekThumbnailCanvasStyle}
            />
            <div
                style={stylingLogic.carouselVideoProgressSeekThumbnailTextStyle}
            >
                <div>
                    {currentVideoSection !== undefined ? sections?.[currentVideoSection]?.[0] : ''}
                </div>
                <div>
                    {videoRef?.current && !isNaN(percent * videoRef?.current?.duration) ? getFormattedTimeString(percent * videoRef?.current?.duration) : ''}
                </div>
            </div>
        </div>
    )
}