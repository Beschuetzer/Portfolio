import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CLASSNAME__ITEM_VIEWER, CLASSNAME__ROOT } from '../../constants'
import { getClassname, getIsPointInsideElement } from '../../utils'
import { CarouselItemViewerCloseButton } from './CarouselItemViewerCloseButton'
import { CarouselItemViewerNextButton } from './CarouselItemViewerNextButton'
import { CarouselItemViewerPauseButton } from './CarouselItemViewerPauseButton'
import { CarouselItemViewerPlayButton } from './CarouselItemViewerPlayButton'
import { CarouselItemViewerPreviousButton } from './CarouselItemViewerPreviousButton'
import { CarouselItemViewerSeekBackButton } from './CarouselItemViewerSeekBackButton'
import { CarouselItemViewerSeekForwardButton } from './CarouselItemViewerSeekForwardButton'
import { log } from 'console'
import { useMousePosition } from '../../hooks/useMousePosition'

type CarouselItemViewerToolbarProps = {
    videoRef: React.RefObject<HTMLVideoElement>;
    videoContainerRef: React.RefObject<HTMLDivElement>;
}

const AUTO_HIDE_DURATION = 2500;
const CLASSNAME_INNER_CONTAINER = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-button-container` });
const CLASSNAME_TOOLBAR = `${getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar` })}`;
const CLASSNAME_TOOLBAR_LEFT = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-left` });
const CLASSNAME_TOOLBAR_MIDDLE = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-middle` });
const CLASSNAME_TOOLBAR_RIGHT = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-right` });
const CLASSNAME_VIDEO_CONTAINER_NO_TOOLBAR = getClassname({ elementName: `video-container--no-toolbar` });
export const CarouselItemViewerToolbar = ({
    videoRef,
    videoContainerRef,
}: CarouselItemViewerToolbarProps) => {
    //#region Init
    const [progressBarValue, setProgressBarValue] = useState(0);
    const [isPlayingVideo, setIsPlayingVideo] = useState(true);
    const [isHidden, setIsHidden] = useState(false);
    const shouldHideTimoutRef = useRef<any>(-1);
    const progressBarRef = useRef<HTMLProgressElement>(null);
    const mousePositionRef = useMousePosition();
    //#endregion

    //#region Functions/handlers
    const onProgressBarClick = useCallback((e: MouseEvent) => {
        const clientX = e.clientX;
        const progressBar = e.currentTarget as HTMLProgressElement;
        console.log({ progressBar, e });

        if (!progressBar) return;

        const progressBarBoundingRect = progressBar.getBoundingClientRect();
        const progressBarLeftX = progressBarBoundingRect.left;
        const progressBarRightX = progressBarBoundingRect.right;
        const amountPastLeft = (clientX - progressBarLeftX);
        const percent = amountPastLeft / (progressBarRightX - progressBarLeftX);

        console.log({ percent });
        setProgressBarValue(percent);

        //todo: what needs to happen here if anything?
        const video = videoRef.current;
        // if (!video) return;
        // video.currentTime = percent * video.duration;
        // if ((video as any).parentNode.classList.contains(DONE_CLASSNAME)) {
        // 	(video as any).parentNode.classList.remove(DONE_CLASSNAME);
        // 	(video as any).parentNode.classList.add(STOPPED_CLASSNAME);
        // }
    }, [setProgressBarValue]);
    //#endregion

    //#region Side Fx
    //Auto-hide after 5sec
    useEffect(() => {
        function handleHide() {
            setIsHidden(false);

            if (videoContainerRef?.current) {
                //todo: hide cursor? videoContainerRef.current.classList.remove(`${CLASSNAME__ROOT}--cursor-none`);
                videoContainerRef.current.classList?.remove(CLASSNAME_VIDEO_CONTAINER_NO_TOOLBAR);
            }

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
            }, AUTO_HIDE_DURATION);
        }

        function handleMouseMove(e: any) {
            // onProgressBarClick(e);
        }

        window.addEventListener('mousemove', handleHide);
        if (progressBarRef.current) {
            progressBarRef.current.addEventListener('mousemove', handleMouseMove);
        }
        return () => {
            if (progressBarRef.current) {
                progressBarRef.current.removeEventListener('mousemove', handleMouseMove);
            }
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
                        <CarouselItemViewerPlayButton />
                        :
                        <CarouselItemViewerPauseButton />
                    }
                    <CarouselItemViewerSeekBackButton />
                    <CarouselItemViewerSeekForwardButton />

                </div>
                <div className={CLASSNAME_TOOLBAR_MIDDLE}>
                    <span>0:00 / 2:42:32</span>
                    <span>Description here...</span>
                </div>
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