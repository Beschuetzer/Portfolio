import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';
import { getFormattedTimeString } from '../../../utils';
import { useCarouselContext } from '../../../context';
import { CarouselItemViewerToolbarProps } from '../toolbar/CarouselItemViewerToolbar';
import { CLASSNAME__VIDEO_SCREENSHOT_VIEWER, CLASSNAME__VIDEO_SCREENSHOT_VIEWER_TEXT_CONTAINER } from '../../../constants';
import { PROGRESS_BAR_PERCENT_INITIAL_VALUE } from './CarouselItemViewerProgressBar';

type CarouselItemViewerProgressBarScreenshotPreviewProps = {
    toolbarRef: React.MutableRefObject<HTMLDivElement>;
    videoThumbnailRef: CarouselItemViewerToolbarProps['videoRef'];
} & Pick<CarouselItemViewerToolbarProps, 'videoRef' | 'currentVideoSection' | 'percent'>

export type TextTranslateOffset = {
    left: number;
    maxCursorLeftValue: number;
    minCursorLeftValue: number;
    right: number;
}

const DRAW_LAST_IMAGE_TIMEOUT_AMOUNT = 100;
export const TEXT_TRANSLATION_AMOUNT_REF_INITIAL = 0;
export const CarouselVideoProgressBarScreenshotViewer = ({
    currentVideoSection,
    percent = 0,
    toolbarRef,
    videoRef,
    videoThumbnailRef,
}: CarouselItemViewerProgressBarScreenshotPreviewProps) => {
    //#region Init
    const { currentItem } = useCarouselContext();
    const { sections } = currentItem?.video || {};

    const { stylingLogic } = useBusinessLogic({});
    // const [shouldRedraw, setShouldRedraw] = useState(false);
    const screenShotCanvasRef = useRef<HTMLCanvasElement>();
    const screenShotTextContainerRef = useRef<HTMLDivElement>();
    const textTranslateOffsetRef = useRef<TextTranslateOffset>({} as TextTranslateOffset);
    const textTranslationAmountRef = useRef<number>(TEXT_TRANSLATION_AMOUNT_REF_INITIAL);
    const lastDrawTimeRef = useRef<number>(0);
    //#endregion

    //#region Functions/Handlers
    const drawSnapshot = useCallback(() => {
        if (screenShotCanvasRef?.current && videoThumbnailRef?.current && percent !== undefined) {
            const now = Date.now();
            const hasEnoughTimePassed = Math.abs(now - lastDrawTimeRef.current) > DRAW_LAST_IMAGE_TIMEOUT_AMOUNT;
            if (!hasEnoughTimePassed) return;

            const duration = videoThumbnailRef.current?.duration;
            const boundingRect = videoThumbnailRef.current?.getBoundingClientRect();

            if (boundingRect && isFinite(duration)) {
                console.log({ percent, boundingRect, duration });


                lastDrawTimeRef.current = now;
                videoThumbnailRef.current.currentTime = percent * duration;
                screenShotCanvasRef.current?.getContext('2d')?.drawImage(
                    videoThumbnailRef.current,
                    0,
                    0,
                    boundingRect.width * 1.71, //why are these needed?
                    boundingRect.height * 1.516, //why are these needed?
                );
            }
        }
    }, [percent, videoThumbnailRef])
    //#endregion

    //#region Side FX
    useLayoutEffect(() => {
        if (textTranslateOffsetRef?.current !== undefined && textTranslateOffsetRef?.current !== undefined) {
            textTranslateOffsetRef.current = {} as TextTranslateOffset;
            textTranslationAmountRef.current = TEXT_TRANSLATION_AMOUNT_REF_INITIAL;
        }

    }, [currentVideoSection, currentItem])

    useLayoutEffect(() => {
        drawSnapshot();
    }, [drawSnapshot])
    //#endregion

    //#region JSX
    if (percent <= PROGRESS_BAR_PERCENT_INITIAL_VALUE) return null;
    return (
        <div
            className={CLASSNAME__VIDEO_SCREENSHOT_VIEWER}
            style={stylingLogic.getCarouselVideoProgressSeekThumbnailContainerStyle(
                percent,
                videoRef,
                toolbarRef.current,
                screenShotTextContainerRef.current?.querySelector('div'),
                screenShotCanvasRef.current,
                textTranslateOffsetRef
            )}
        >
            <canvas
                ref={screenShotCanvasRef as any}
                style={stylingLogic.carouselVideoProgressSeekThumbnailCanvasStyle}
            />

            <div
                ref={screenShotTextContainerRef as any}
                className={CLASSNAME__VIDEO_SCREENSHOT_VIEWER_TEXT_CONTAINER}
                style={stylingLogic.carouselVideoProgressSeekThumbnailTextContainerStyle}
            >
                <div
                    style={stylingLogic.getCarouselVideoProgressSeekThumbnailTextStyle(
                        percent,
                        videoRef,
                        screenShotTextContainerRef.current?.querySelector('div'),
                        screenShotCanvasRef.current,
                        textTranslateOffsetRef,
                        textTranslationAmountRef
                    )}
                >
                    {currentVideoSection !== undefined ? sections?.[currentVideoSection]?.[0] : ''}
                </div>
                <div>
                    {videoRef?.current && !isNaN(percent * videoRef?.current?.duration) ? getFormattedTimeString(percent * videoRef?.current?.duration) : ''}
                </div>
            </div>
        </div>
    )
    //#endregion
}