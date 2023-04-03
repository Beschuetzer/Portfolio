import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CLASSNAME__ITEM_VIEWER } from '../../constants'
import { getClassname, getFormattedTimeString } from '../../utils'
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
import { CarouselItemViewerProgressBar } from './CarouselItemViewerProgressBar'
import { VideoTimeStrings } from '../../types'

export type CarouselItemViewerToolbarProps = {
    description: string;
    videoContainerRef: React.MutableRefObject<HTMLDivElement | undefined>;
    videoRef: React.MutableRefObject<HTMLVideoElement | undefined>;
};

const CLASSNAME_INNER_CONTAINER = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-button-container` });
const CLASSNAME_TOOLBAR = `${getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar` })}`;
const CLASSNAME_TOOLBAR_LEFT = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-left` });
const CLASSNAME_TOOLBAR_MIDDLE = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-middle` });
const CLASSNAME_TOOLBAR_RIGHT = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-right` });
const CLASSNAME_VIDEO_CONTAINER_NO_TOOLBAR = getClassname({ elementName: `video-container--no-toolbar` });
export const CarouselItemViewerToolbar = ({
    description,
    videoRef,
    videoContainerRef,
}: CarouselItemViewerToolbarProps) => {
    //#region Init
    const { options } = useCarouselContext();
    const [isPlayingVideo, setIsPlayingVideo] = useState(true);
    const [isHidden, setIsHidden] = useState(false);
    const shouldHideTimoutRef = useRef<any>(-1);
    
    const mousePositionRef = useMousePosition();

    const [timeStrings, setTimeStrings] = useState<VideoTimeStrings>({
        durationStr: getFormattedTimeString((videoRef.current?.duration) || -1),
        currentTimeStr: getFormattedTimeString((videoRef.current?.currentTime) || -1),
    });
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
            <CarouselItemViewerProgressBar videoRef={videoRef} setTimeStrings={setTimeStrings}/>
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
                <CarouselItemViewerToolbarText description={description || ''} timeStrings={timeStrings} />
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