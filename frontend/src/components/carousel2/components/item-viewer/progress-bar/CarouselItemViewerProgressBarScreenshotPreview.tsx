import React, { useRef } from 'react'
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';
import { getFormattedTimeString } from '../../../utils';
import { useCarouselContext } from '../../../context';
import { CarouselItemViewerToolbarProps } from '../toolbar/CarouselItemViewerToolbar';

type CarouselItemViewerProgressBarScreenshotPreviewProps = {
    seekPercent: number;
    toolbarRef: React.MutableRefObject<HTMLDivElement>;
} & Pick<CarouselItemViewerToolbarProps, 'videoRef' | 'currentVideoSection'>

export const CarouselVideoProgressBarScreenshotPreview = ({
    currentVideoSection,
    seekPercent,
    toolbarRef,
    videoRef,
}: CarouselItemViewerProgressBarScreenshotPreviewProps) => {
    const { currentItem } = useCarouselContext();
    const { sections } = currentItem?.video || {};

    const { stylingLogic } = useBusinessLogic({});
    const screenShotRef = useRef<HTMLCanvasElement>();

    return (
        <div
            style={stylingLogic.getCarouselVideoProgressSeekThumbnailContainerStyle(seekPercent, toolbarRef.current)}
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
                    {videoRef?.current && !isNaN(seekPercent * videoRef?.current?.duration) ? getFormattedTimeString(seekPercent * videoRef?.current?.duration) : ''}
                </div>
            </div>
        </div>
    )
}