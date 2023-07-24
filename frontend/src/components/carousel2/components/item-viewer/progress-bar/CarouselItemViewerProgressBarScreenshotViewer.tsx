import React, { useCallback, useLayoutEffect, useRef } from 'react'
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';
import { getFormattedTimeString } from '../../../utils';
import { useCarouselContext } from '../../../context';
import { CarouselItemViewerToolbarProps } from '../toolbar/CarouselItemViewerToolbar';
import { CLASSNAME__VIDEO_SCREENSHOT_VIEWER, CLASSNAME__VIDEO_SCREENSHOT_VIEWER_TEXT_CONTAINER } from '../../../constants';
import { PROGRESS_BAR_PERCENT_INITIAL_VALUE } from './CarouselItemViewerProgressBar';
import { CarouselItemProps } from '../../CarouselItem';

type CarouselItemViewerProgressBarScreenshotPreviewProps = {
    toolbarRef: React.MutableRefObject<HTMLDivElement>;
    type: string | undefined;
} & Pick<CarouselItemViewerToolbarProps, 'videoRef' | 'currentVideoSection' | 'percent'>
& Pick<CarouselItemProps, 'srcMain'>

export type TextTranslateOffset = {
    left: number;
    maxCursorLeftValue: number;
    minCursorLeftValue: number;
    right: number;
}

const IMAGE_DRAW_INTERVAL = 100;
const LAST_DRAW_INTERVAL = 100;
export const TEXT_TRANSLATION_AMOUNT_REF_INITIAL = 0;
export const CarouselVideoProgressBarScreenshotViewer = ({
    currentVideoSection,
    percent = 0,
    srcMain,
    toolbarRef,
    type,
    videoRef,
}: CarouselItemViewerProgressBarScreenshotPreviewProps) => {
    //#region Init
    const { currentItem } = useCarouselContext();
    const { sections } = currentItem?.video || {};

    const { stylingLogic } = useBusinessLogic({});
    const screenShotTextContainerRef = useRef<HTMLDivElement>();
    const textTranslateOffsetRef = useRef<TextTranslateOffset>({} as TextTranslateOffset);
    const textTranslationAmountRef = useRef<number>(TEXT_TRANSLATION_AMOUNT_REF_INITIAL);
    const lastDrawTimeRef = useRef<number>(0);
    const videoThumbnailRef = useRef<HTMLVideoElement>();
    const lastRenderTimeoutRef = useRef<any>();
    //#endregion

    //#region Functions/Handlers
    const drawSnapshot = useCallback((duration: number) => {
        if (!videoThumbnailRef?.current || percent === undefined || !isFinite(duration)) return;
        console.log({duration, percent});
        
        videoThumbnailRef.current.currentTime = percent * duration;
    }, [percent])

    const handleDrawSnapshot = useCallback(() => {
        if (videoThumbnailRef?.current && percent !== undefined) {
            clearTimeout(lastRenderTimeoutRef.current);
            const duration = videoThumbnailRef.current?.duration;

            lastRenderTimeoutRef.current = setTimeout(() => {
                console.log("last");
                drawSnapshot(duration);
            }, LAST_DRAW_INTERVAL)

            const now = Date.now();
            const hasEnoughTimePassed = Math.abs(now - lastDrawTimeRef.current) > IMAGE_DRAW_INTERVAL;
            if (!hasEnoughTimePassed || !isFinite(duration)) return;
            lastDrawTimeRef.current = now;
            drawSnapshot(duration);
        }
    }, [drawSnapshot, percent])
    //#endregion

    //#region Side FX
    useLayoutEffect(() => {
        if (textTranslateOffsetRef?.current !== undefined && textTranslateOffsetRef?.current !== undefined) {
            textTranslateOffsetRef.current = {} as TextTranslateOffset;
            textTranslationAmountRef.current = TEXT_TRANSLATION_AMOUNT_REF_INITIAL;
        }
        if (videoThumbnailRef.current?.load) {
            videoThumbnailRef.current.load();
        }
    }, [currentVideoSection, currentItem])

    useLayoutEffect(() => {
        handleDrawSnapshot();
    }, [handleDrawSnapshot])
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
                videoThumbnailRef.current,
                textTranslateOffsetRef
            )}
        >
            <video
                style={stylingLogic.carouselVideoProgressSeekThumbnailScreenShotStyle}
                ref={videoThumbnailRef as any}
                autoPlay={false}
                muted={true}
                loop={false}
            >
                <source src={srcMain} type={`video/${type}`} />
            </video>
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
                        videoThumbnailRef.current,
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