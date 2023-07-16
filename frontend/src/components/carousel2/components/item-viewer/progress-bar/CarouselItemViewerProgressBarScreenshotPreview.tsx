import React, { useRef } from 'react'
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';
import { getFormattedTimeString } from '../../../utils';
import { useCarouselContext } from '../../../context';
import { CarouselItemViewerToolbarProps } from '../toolbar/CarouselItemViewerToolbar';
import { CLASSNAME__VIDEO_SCREENSHOT_VIEWER, CLASSNAME__VIDEO_SCREENSHOT_VIEWER_TEXT_CONTAINER } from '../../../constants';
import { PROGRESS_BAR_PERCENT_INITIAL_VALUE } from './CarouselItemViewerProgressBar';

type CarouselItemViewerProgressBarScreenshotPreviewProps = {
    toolbarRef: React.MutableRefObject<HTMLDivElement>;
} & Pick<CarouselItemViewerToolbarProps, 'videoRef' | 'currentVideoSection' | 'percent'>

export const CarouselVideoProgressBarScreenshotViewer = ({
    currentVideoSection,
    percent = 0,
    toolbarRef,
    videoRef,
}: CarouselItemViewerProgressBarScreenshotPreviewProps) => {
    const { currentItem } = useCarouselContext();
    const { sections } = currentItem?.video || {};

    const { stylingLogic } = useBusinessLogic({});
    const screenShotCanvasRef = useRef<HTMLCanvasElement>();
    const screenShotTextContainerRef = useRef<HTMLDivElement>();

    if (percent <= PROGRESS_BAR_PERCENT_INITIAL_VALUE) return null;
    return (
        <div
            className={CLASSNAME__VIDEO_SCREENSHOT_VIEWER}
            style={stylingLogic.getCarouselVideoProgressSeekThumbnailContainerStyle(
                percent, toolbarRef.current, screenShotTextContainerRef.current?.querySelector('div'), screenShotCanvasRef.current
            )}
        >
            <canvas
                ref={screenShotCanvasRef as any}
                style={stylingLogic.carouselVideoProgressSeekThumbnailCanvasStyle}
            />

            <div
                ref={screenShotTextContainerRef as any}
                className={CLASSNAME__VIDEO_SCREENSHOT_VIEWER_TEXT_CONTAINER}
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