import React, { useLayoutEffect, useRef } from 'react'
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';
import { getFormattedTimeString } from '../../../utils/utils';
import { useCarouselContext } from '../../../context';
import { CarouselItemViewerToolbarProps } from '../toolbar/CarouselItemViewerToolbar';
import { CLASSNAME__VIDEO_SCREENSHOT_VIEWER, CLASSNAME__VIDEO_SCREENSHOT_VIEWER_TEXT_CONTAINER } from '../../../constants';
import { CarouselItemProps } from '../../CarouselItem';
import { useSetVideoCurrentTime } from '../../../hooks/useSetVideoCurrentTime';
import { resolveSrcMain } from '../../../utils/getCarouselVideo';

export type CarouselItemViewerProgressBarScreenshotPreviewProps = {
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


export const TEXT_TRANSLATION_AMOUNT_REF_INITIAL = 0;
const CarouselVideoProgressBarScreenshotViewer = (props: CarouselItemViewerProgressBarScreenshotPreviewProps) => {
    //#region Init
    const {
        currentVideoSection,
        percent = 0,
        srcMain,
        toolbarRef,
        type,
        videoRef,
    } = props;
    const { currentItem } = useCarouselContext();
    const { sections } = currentItem?.video || {};

    const { stylingLogic } = useBusinessLogic();
    const screenShotTextContainerRef = useRef<HTMLDivElement>();
    const textTranslateOffsetRef = useRef<TextTranslateOffset>({} as TextTranslateOffset);
    const textTranslationAmountRef = useRef<number>(TEXT_TRANSLATION_AMOUNT_REF_INITIAL);
    const videoThumbnailRef = useRef<HTMLVideoElement>();
    useSetVideoCurrentTime({percent, video: videoThumbnailRef?.current});
    //#endregion

    //#region Functions/Handlers
    //#endregion

    //#region Side FX
    useLayoutEffect(() => {
        if (textTranslateOffsetRef?.current !== undefined && textTranslateOffsetRef?.current !== undefined) {
            textTranslateOffsetRef.current = {} as TextTranslateOffset;
            textTranslationAmountRef.current = TEXT_TRANSLATION_AMOUNT_REF_INITIAL;
        }        
    }, [currentVideoSection, currentItem])
    //#endregion

    //#region JSX
    return (
        <div
            className={CLASSNAME__VIDEO_SCREENSHOT_VIEWER}
            style={stylingLogic.getCarouselVideoProgressScreenshotViewerContainerStyle(
                percent,
                videoRef,
                toolbarRef.current,
                screenShotTextContainerRef.current?.querySelector('div'),
                videoThumbnailRef.current,
                textTranslateOffsetRef
            )}
        >
            <video
                style={stylingLogic.carouselVideoProgressScreenshotViewerVideoStyle}
                ref={videoThumbnailRef as any}
                autoPlay={false}
                muted={true}
                loop={false}
            >
                <source src={resolveSrcMain(srcMain)} type={`video/${type}`} />
            </video>
            <div
                ref={screenShotTextContainerRef as any}
                className={CLASSNAME__VIDEO_SCREENSHOT_VIEWER_TEXT_CONTAINER}
                style={stylingLogic.carouselVideoProgressScreenshotViewerTextContainerStyle}
            >
                <div
                    style={stylingLogic.getCarouselVideoProgressScreenshotViewerTextStyle(
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

export const CarouselVideoProgressBarScreenshotViewerMemoized = React.memo(CarouselVideoProgressBarScreenshotViewer);