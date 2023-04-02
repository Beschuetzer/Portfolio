import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CLASSNAME__ITEM_VIEWER } from '../../constants'
import { getClassname } from '../../utils'
import { CarouselItemViewerCloseButton } from './CarouselItemViewerCloseButton'
import { CarouselItemViewerNextButton } from './CarouselItemViewerNextButton'
import { CarouselItemViewerPauseButton } from './CarouselItemViewerPauseButton'
import { CarouselItemViewerPlayButton } from './CarouselItemViewerPlayButton'
import { CarouselItemViewerPreviousButton } from './CarouselItemViewerPreviousButton'
import { CarouselItemViewerSeekBackButton } from './CarouselItemViewerSeekBackButton'
import { CarouselItemViewerSeekForwardButton } from './CarouselItemViewerSeekForwardButton'
import { useMousePosition } from '../../hooks/useMousePosition'
import { useCarouselContext } from '../../context'
import { CarouselItemViewerToolbarText, CarouselItemViewerToolbarTextProps } from './CarouselItemViewerToolbarText'

type CarouselItemViewerToolbarProps = {
    videoContainerRef: React.RefObject<HTMLDivElement>;
} & CarouselItemViewerToolbarTextProps;

const CLASSNAME_INNER_CONTAINER = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-button-container` });
const CLASSNAME_TOOLBAR = `${getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar` })}`;
const CLASSNAME_TOOLBAR_LEFT = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-left` });
const CLASSNAME_TOOLBAR_RIGHT = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-right` });
const CLASSNAME_VIDEO_CONTAINER_NO_TOOLBAR = getClassname({ elementName: `video-container--no-toolbar` });
export const CarouselItemViewerToolbar = ({
    description,
    videoRef,
    videoContainerRef,
}: CarouselItemViewerToolbarProps) => {
    //#region Init
    const { options } = useCarouselContext();
    const [progressBarValue, setProgressBarValue] = useState(0);
    const [isPlayingVideo, setIsPlayingVideo] = useState(true);
    const [isHidden, setIsHidden] = useState(false);
    const shouldHideTimoutRef = useRef<any>(-1);
    const progressBarRef = useRef<HTMLProgressElement>(null);
    const mousePositionRef = useMousePosition();
    //#endregion

    //#region Functions/handlers
    const onPauseClick = useCallback(() => {
        if (videoRef.current) {
            setIsPlayingVideo((prev) => !prev);
            videoRef.current.pause();
        }
    }, [setIsPlayingVideo]);

    const onPlayClick = useCallback(() => {
        if (videoRef.current) {
            setIsPlayingVideo((prev) => !prev);
            videoRef.current.play();
        }
    }, [setIsPlayingVideo]);

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
        if (videoRef.current) {
            const video = videoRef.current;
            video.currentTime = percent * video.duration;
        }
    }, [setProgressBarValue]);
    //#endregion

    //#region Side Fx
    useEffect(() => {
        function onVideoTimeUpdate(e: Event) {
            const videoElement = e.currentTarget || e.target as any;
            if (!videoElement) return;
            const percent = videoElement.currentTime / videoElement.duration;
            if (percent >= 0 && percent <= 1) {
                setProgressBarValue(percent);
            }
        }

        if (videoRef.current) {
            videoRef.current.addEventListener('timeupdate', onVideoTimeUpdate);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.addEventListener('timeupdate', onVideoTimeUpdate);
            }
        }
    })

    //Auto-hide after 5sec
    useEffect(() => {
        function handleHide() {
            setIsHidden(false);

            if (videoContainerRef?.current) {
                //todo: hide cursor? videoContainerRef.current.classList.remove(`${CLASSNAME__ROOT}--cursor-none`);
                videoContainerRef.current.classList?.remove(CLASSNAME_VIDEO_CONTAINER_NO_TOOLBAR);
            }

            if (!!options?.autoHideToolbarDuration && options.autoHideToolbarDuration > 0) {
                clearTimeout(shouldHideTimoutRef.current);
                shouldHideTimoutRef.current = setTimeout(() => {
                    setIsHidden(true);
                    if (videoContainerRef?.current) {
                        videoContainerRef.current.classList?.add(CLASSNAME_VIDEO_CONTAINER_NO_TOOLBAR);
                    }

                    //todo: hide cursor too?
                    // const isInsideVideoContainer = getIsPointInsideElement(mousePositionRef.current, videoContainerRef.current);
                    // if (isInsideVideoContainer) {
                    //     console.log("none");

                    //     setTimeout(() => {
                    //         if (videoContainerRef.current) {
                    //             videoContainerRef.current.classList.add(`${CLASSNAME__ROOT}--cursor-none`);
                    //         }
                    //     }, 1)
                    // }
                }, options.autoHideToolbarDuration);
            }

        }

        // function handleMouseMove(e: any) {
        // onProgressBarClick(e);
        // }

        window.addEventListener('mousemove', handleHide);
        // if (progressBarRef.current) {
        //     progressBarRef.current.addEventListener('mousemove', handleMouseMove);
        // }
        return () => {
            // if (progressBarRef.current) {
            //     progressBarRef.current.removeEventListener('mousemove', handleMouseMove);
            // }
            window.removeEventListener('mousemove', handleHide);
        }
    }, []);
    //#endregion

    //#region JSX

    return (
        <div className={CLASSNAME_TOOLBAR}>
            <progress
                ref={progressBarRef}
                className={getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-progress` })}
                onClick={onProgressBarClick as any}
                value={progressBarValue}
            />
            <div className={CLASSNAME_INNER_CONTAINER}>
                <div className={CLASSNAME_TOOLBAR_LEFT}>
                    {isPlayingVideo ?
                        <CarouselItemViewerPauseButton onClick={onPauseClick} />
                        :
                        <CarouselItemViewerPlayButton onClick={onPlayClick} />
                    }
                    <CarouselItemViewerSeekBackButton />
                    <CarouselItemViewerSeekForwardButton />

                </div>
                <CarouselItemViewerToolbarText description={description || ''} videoRef={videoRef} />
                <div className={CLASSNAME_TOOLBAR_RIGHT}>
                    <CarouselItemViewerPreviousButton />
                    <CarouselItemViewerNextButton />
                    <CarouselItemViewerCloseButton />
                </div>
            </div>
        </div>
    )
    //#endregion
}