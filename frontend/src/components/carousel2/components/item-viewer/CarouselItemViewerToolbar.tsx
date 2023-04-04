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
import { SEEK_AMOUNT_DEFAULT, useCarouselContext } from '../../context'
import { CarouselItemViewerToolbarText } from './CarouselItemViewerToolbarText'
import { CarouselItemViewerProgressBar } from './CarouselItemViewerProgressBar'
import { VideoTimeStrings } from '../../types'

export type CarouselItemViewerToolbarProps = {
    description: string;
    itemContainerRef: React.MutableRefObject<HTMLDivElement | undefined> | null;
    isVideo: boolean;
    videoRef: React.MutableRefObject<HTMLVideoElement | undefined> | null;
};

const CLASSNAME_INNER_CONTAINER = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-container` });
const CLASSNAME_TOOLBAR = `${getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar` })}`;
const CLASSNAME_TOOLBAR_LEFT = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-left` });
const CLASSNAME_TOOLBAR_RIGHT = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-right` });
const CLASSNAME_ITEM_CONTAINER_NO_TOOLBAR = getClassname({ elementName: `item-container--no-toolbar` });
export const CarouselItemViewerToolbar = ({
    description,
    isVideo,
    itemContainerRef,
    videoRef,
}: CarouselItemViewerToolbarProps) => {
    //#region Init
    const { options, currentItems, currentItemIndex, setCurrentItemIndex } = useCarouselContext();
    const [isPlayingVideo, setIsPlayingVideo] = useState(true);
    const [isHidden, setIsHidden] = useState(false);
    const shouldHideTimoutRef = useRef<any>(-1);

    const mousePositionRef = useMousePosition();

    const [timeStrings, setTimeStrings] = useState<VideoTimeStrings>({
        durationStr: getFormattedTimeString((videoRef?.current?.duration) || -1),
        currentTimeStr: getFormattedTimeString((videoRef?.current?.currentTime) || -1),
    });
    //#endregion

    //#region Functions/handlers
    const onNextItemClick = useCallback(() => {
        const newIndex = currentItemIndex === currentItems.length - 1 ? 0 : currentItemIndex + 1;
        setCurrentItemIndex(newIndex);
    }, [currentItemIndex, currentItems, setCurrentItemIndex])

    const onPreviousItemClick = useCallback(() => {
        const newIndex = currentItemIndex === 0 ? currentItems.length - 1 : currentItemIndex - 1;
        setCurrentItemIndex(newIndex);
    }, [currentItemIndex, currentItems, setCurrentItemIndex])

    const onPauseClick = useCallback(() => {
        if (videoRef?.current) {
            setIsPlayingVideo((prev) => !prev);
            videoRef?.current.pause();
        }
    }, [setIsPlayingVideo]);

    const onPlayClick = useCallback(() => {
        if (videoRef?.current) {
            setIsPlayingVideo((prev) => !prev);
            videoRef?.current.play();
        }
    }, [setIsPlayingVideo]);

    const onSeekBackClick = useCallback(() => {
        if (videoRef?.current) {
            videoRef.current.currentTime -= (options.video?.seekAmount || SEEK_AMOUNT_DEFAULT) / 1000;
        }
    }, [setIsPlayingVideo, options, SEEK_AMOUNT_DEFAULT]);

    const onSeekForwardClick = useCallback(() => {
        if (videoRef?.current) {
            videoRef.current.currentTime += (options.video?.seekAmount || SEEK_AMOUNT_DEFAULT) / 1000;
        }
    }, [setIsPlayingVideo, options, SEEK_AMOUNT_DEFAULT])
    //#endregion

    //#region Side Fx
    //Auto-hide after 5sec
    useEffect(() => {
        function handleHide() {
            setIsHidden(false);

            if (itemContainerRef?.current) {
                //todo: hide cursor? itemContainerRef.current.classList.remove(`${CLASSNAME__ROOT}--cursor-none`);
                itemContainerRef.current.classList?.remove(CLASSNAME_ITEM_CONTAINER_NO_TOOLBAR);
            }

            if (!!options?.video?.autoHideToolbarDuration && options.video.autoHideToolbarDuration > 0) {
                clearTimeout(shouldHideTimoutRef.current);
                shouldHideTimoutRef.current = setTimeout(() => {
                    setIsHidden(true);
                    console.log({itemContainerRef})

                    if (itemContainerRef?.current) {
                        itemContainerRef.current.classList?.add(CLASSNAME_ITEM_CONTAINER_NO_TOOLBAR);
                    }

                    //todo: hide cursor too?
                    // const isInsideVideoContainer = getIsPointInsideElement(mousePositionRef.current, itemContainerRef.current);
                    // if (isInsideVideoContainer) {
                    //     console.log("none");

                    //     setTimeout(() => {
                    //         if (itemContainerRef.current) {
                    //             itemContainerRef.current.classList.add(`${CLASSNAME__ROOT}--cursor-none`);
                    //         }
                    //     }, 1)
                    // }
                }, options.video.autoHideToolbarDuration);
            }

        }

        // function handleMouseMove(e: any) {
        // onProgressBarClick(e);
        // }

        window.addEventListener('mousemove', handleHide);
        window.addEventListener('click', handleHide);
        // if (progressBarRef.current) {
        //     progressBarRef.current.addEventListener('mousemove', handleMouseMove);
        // }
        return () => {
            // if (progressBarRef.current) {
            //     progressBarRef.current.removeEventListener('mousemove', handleMouseMove);
            // }
            window.removeEventListener('mousemove', handleHide);
            window.removeEventListener('click', handleHide);
        }
    }, []);
    //#endregion

    //#region JSX

    return (
        <div className={CLASSNAME_TOOLBAR}>
            {videoRef ? <CarouselItemViewerProgressBar videoRef={videoRef} setTimeStrings={setTimeStrings} /> : null}
            <div className={CLASSNAME_INNER_CONTAINER}>
                {videoRef ? (
                    <div className={CLASSNAME_TOOLBAR_LEFT}>
                        {isPlayingVideo ?
                            <CarouselItemViewerPauseButton onClick={onPauseClick} />
                            :
                            <CarouselItemViewerPlayButton onClick={onPlayClick} />
                        }
                        <CarouselItemViewerSeekBackButton onClick={onSeekBackClick} />
                        <CarouselItemViewerSeekForwardButton onClick={onSeekForwardClick} />

                    </div>
                ) : null}
                <CarouselItemViewerToolbarText isVideo={isVideo} description={description || ''} timeStrings={timeStrings} />
                <div className={CLASSNAME_TOOLBAR_RIGHT}>
                    <CarouselItemViewerPreviousButton onClick={onPreviousItemClick} />
                    <CarouselItemViewerNextButton onClick={onNextItemClick} />
                    <CarouselItemViewerCloseButton />
                </div>
            </div>
        </div>
    )
    //#endregion
}