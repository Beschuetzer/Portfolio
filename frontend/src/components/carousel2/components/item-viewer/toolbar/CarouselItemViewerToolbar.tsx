import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CLASSNAME__ITEM_VIEWER, MOBILE_PIXEL_WIDTH } from '../../../constants'
import { getClassname, getFormattedTimeString } from '../../../utils'
import { CarouselItemViewerCloseButton } from './CarouselItemViewerCloseButton'
import { CURRENT_ITEM_INDEX_INITIAL, SEEK_AMOUNT_DEFAULT, useCarouselContext } from '../../../context'
import { CarouselItemViewerToolbarText } from './CarouselItemViewerToolbarText'
import { CarouselItemViewerProgressBar } from '../CarouselItemViewerProgressBar'
import { VideoTimeStrings } from '../../../types'
import { CarouselItemViewerNextButton } from './CarouselItemViewerNextButton'
import { CarouselItemViewerPauseButton } from './CarouselItemViewerPauseButton'
import { CarouselItemViewerPlayButton } from './CarouselItemViewerPlayButton'
import { CarouselItemViewerPreviousButton } from './CarouselItemViewerPreviousButton'
import { CarouselItemViewerSeekBackButton } from './CarouselItemViewerSeekBackButton'
import { CarouselItemViewerSeekForwardButton } from './CarouselItemViewerSeekForwardButton'
import { CarouselItemViewerToolbarPreview, ToolbarPreviewDirection } from './CarouselItemViewerToolbarPreview'

export type CarouselItemViewerToolbarProps = {
    description: string;
    itemContainerRef: React.MutableRefObject<HTMLDivElement | undefined> | null;
    isVideo: boolean;
    isVideoPlaying?: boolean;
    onClose?: () => void;
    setIsVideoPlaying?: React.Dispatch<React.SetStateAction<boolean>>;
    videoRef?: React.MutableRefObject<HTMLVideoElement | undefined> | null;
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
    isVideoPlaying,
    onClose = () => null,
    setIsVideoPlaying,
    videoRef,
}: CarouselItemViewerToolbarProps) => {
    //#region Init
    const { options, currentItems, currentItemIndex, setCurrentItemIndex } = useCarouselContext();
    const shouldHideTimoutRef = useRef<any>(-1);
    const previousButtonRef = useRef<any>(null);
    const nextButtonRef = useRef<any>(null);
    const [timeStrings, setTimeStrings] = useState<VideoTimeStrings>({
        durationStr: getFormattedTimeString((videoRef?.current?.duration) || -1),
        currentTimeStr: getFormattedTimeString((videoRef?.current?.currentTime) || -1),
    });
    const [previewDirection, setPreviewDirection] = useState(ToolbarPreviewDirection.next);
    const isMobile = window.innerWidth <= MOBILE_PIXEL_WIDTH;
    //#endregion

    //#region Functions/handlers
    function getPreviewItemIndex(direction: ToolbarPreviewDirection) {
        if (direction === ToolbarPreviewDirection.next) {
            if (currentItemIndex >= (currentItems.length - 1)) return 0;
            return currentItemIndex + 1;
        } else {
            if (currentItemIndex <= 0) return currentItems.length - 1;
            return currentItemIndex - 1;
        }
    }

    const handleAutoHide = useCallback(() => {
        if (currentItemIndex === CURRENT_ITEM_INDEX_INITIAL) return;
        if (itemContainerRef?.current) {
            itemContainerRef.current.classList?.remove(CLASSNAME_ITEM_CONTAINER_NO_TOOLBAR);
        }

        if (!!options?.itemViewer?.autoHideToolbarDuration && options.itemViewer.autoHideToolbarDuration > 0) {
            clearTimeout(shouldHideTimoutRef.current);
            shouldHideTimoutRef.current = setTimeout(() => {

                if (itemContainerRef?.current && !isMobile) {
                    itemContainerRef.current.classList?.add(CLASSNAME_ITEM_CONTAINER_NO_TOOLBAR);
                }
            }, options.itemViewer.autoHideToolbarDuration);
        }
    }, [currentItemIndex, CURRENT_ITEM_INDEX_INITIAL, itemContainerRef, options, shouldHideTimoutRef, CLASSNAME_ITEM_CONTAINER_NO_TOOLBAR]);

    const onNextItemClick = useCallback(() => {
        const newIndex = currentItemIndex === currentItems.length - 1 ? 0 : currentItemIndex + 1;
        setCurrentItemIndex(newIndex);
        handleAutoHide();
    }, [currentItemIndex, currentItems, setCurrentItemIndex, handleAutoHide])

    const onPreviousItemClick = useCallback(() => {
        const newIndex = currentItemIndex === 0 ? currentItems.length - 1 : currentItemIndex - 1;
        setCurrentItemIndex(newIndex);
        handleAutoHide();
    }, [currentItemIndex, currentItems, setCurrentItemIndex])

    const onPauseClick = useCallback(() => {
        if (videoRef?.current && setIsVideoPlaying) {
            setIsVideoPlaying((prev) => !prev);
            videoRef?.current.pause();
        }
        handleAutoHide();
    }, [setIsVideoPlaying]);

    const onPlayClick = useCallback(() => {
        if (videoRef?.current && setIsVideoPlaying) {
            setIsVideoPlaying((prev) => !prev);
            videoRef?.current.play();
        }
        handleAutoHide();
    }, [setIsVideoPlaying]);

    const onSeekBackClick = useCallback(() => {
        if (videoRef?.current) {
            videoRef.current.currentTime -= (options.itemViewer?.seekAmount || SEEK_AMOUNT_DEFAULT) / 1000;
        }
        handleAutoHide();
    }, [setIsVideoPlaying, options, SEEK_AMOUNT_DEFAULT]);

    const onSeekForwardClick = useCallback(() => {
        if (videoRef?.current) {
            videoRef.current.currentTime += (options.itemViewer?.seekAmount || SEEK_AMOUNT_DEFAULT) / 1000;
        }
        handleAutoHide();
    }, [setIsVideoPlaying, options, SEEK_AMOUNT_DEFAULT])

    function onToolbarClick(e: MouseEvent) {
        e.stopPropagation();
    }
    //#endregion

    //#region Side Fx
    useEffect(() => {
        handleAutoHide();
        function handleMouseEnterNextButton() {
            setPreviewDirection(ToolbarPreviewDirection.next);
        }

        function handleMouseEnterPreviousButton() {
            setPreviewDirection(ToolbarPreviewDirection.previous);
        }

        function handleMouseLeaveButton() {
            setPreviewDirection(ToolbarPreviewDirection.none);
        }

        function handleVideoEnd() {
            setIsVideoPlaying && setIsVideoPlaying(false);
        }

        window.addEventListener('mousemove', handleAutoHide);
        window.addEventListener('click', handleAutoHide);

        if (videoRef?.current) {
            videoRef.current.addEventListener('ended', handleVideoEnd);
        }

        if (nextButtonRef?.current) {
            nextButtonRef.current.addEventListener('mouseenter', handleMouseEnterNextButton);
            nextButtonRef.current.addEventListener('mouseleave', handleMouseLeaveButton);
        }

        if (previousButtonRef?.current) {
            previousButtonRef.current.addEventListener('mouseenter', handleMouseEnterPreviousButton);
            previousButtonRef.current.addEventListener('mouseleave', handleMouseLeaveButton);
        }

        return () => {
            window.removeEventListener('mousemove', handleAutoHide);
            window.removeEventListener('click', handleAutoHide);
            if (videoRef?.current) {
                videoRef.current.removeEventListener('ended', handleVideoEnd);
            }

            if (nextButtonRef?.current) {
                nextButtonRef.current.removeEventListener('mouseenter', handleMouseEnterNextButton);
                nextButtonRef.current.removeEventListener('mouseleave', handleMouseLeaveButton);
            }

            if (previousButtonRef?.current) {
                previousButtonRef.current.removeEventListener('mouseenter', handleMouseEnterPreviousButton);
                previousButtonRef.current.removeEventListener('mouseleave', handleMouseLeaveButton);
            }
        }
    }, [handleAutoHide]);
    //#endregion

    //#region JSX
    return (
        <div onClick={onToolbarClick as any} className={CLASSNAME_TOOLBAR}>
            {videoRef ? <CarouselItemViewerProgressBar videoRef={videoRef} setTimeStrings={setTimeStrings} /> : null}
            <div className={CLASSNAME_INNER_CONTAINER}>
                {videoRef ? (
                    <div className={CLASSNAME_TOOLBAR_LEFT}>
                        {isVideoPlaying ?
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
                    <CarouselItemViewerPreviousButton ref={previousButtonRef} onClick={onPreviousItemClick} />
                    <CarouselItemViewerNextButton ref={nextButtonRef} onClick={onNextItemClick} />
                    <CarouselItemViewerCloseButton onClick={onClose}/>
                </div>
            </div>
            <CarouselItemViewerToolbarPreview 
                itemToShow={currentItems[getPreviewItemIndex(ToolbarPreviewDirection.previous)]} 
                show={previewDirection === ToolbarPreviewDirection.previous} 
                direction={previewDirection} 
            />
            <CarouselItemViewerToolbarPreview 
                itemToShow={currentItems[getPreviewItemIndex(ToolbarPreviewDirection.next)]} 
                show={previewDirection === ToolbarPreviewDirection.next} 
                direction={previewDirection} 
            />
        </div>
    )
    //#endregion
}