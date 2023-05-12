import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { getClassname, getFormattedTimeString, stopPropagation, tryPlayingVideo } from '../../../utils'
import { CarouselItemViewerCloseButton } from './CarouselItemViewerCloseButton'
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
import { useKeyboardShortcuts } from '../../../hooks/useKeyboardShortcuts'
import { AUTO_HIDE_DISABLED_VALUE, AUTO_HIDE_VIDEO_TOOLBAR_DURATION_DEFAULT, CLASSNAME__ITEM_VIEWER, MOBILE_PIXEL_WIDTH, SEEK_AMOUNT_DEFAULT } from '../../../constants'
import { useUpdateTimeString } from '../../../hooks/useUpdateTimeStrings'
import { CarouselItemViewerFullscreenButton } from './CarouselItemViewerFullScreenButton'
import { useCarouselContext } from '../../../context'
import { useBusinessLogic } from '../../../hooks/useBusinessLogic'

export type CarouselItemViewerToolbarProps = {
    description: string;
    itemContainerRef: React.MutableRefObject<HTMLDivElement | undefined> | null;
    isVideo: boolean;
    isVideoPlaying?: boolean;
    onClose?: () => void;
    onNextItemClick?: () => void;
    onPreviousItemClick?: () => void;
    setIsVideoPlaying?: React.Dispatch<React.SetStateAction<boolean>>;
    videoRef?: React.MutableRefObject<HTMLVideoElement | undefined> | null;
};

const CLASSNAME_INNER_CONTAINER = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-container` });
const CLASSNAME_TOOLBAR = `${getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar` })}`;
const CLASSNAME_TOOLBAR_LEFT = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-left` });
const CLASSNAME_TOOLBAR_RIGHT = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-right` });
const CLASSNAME_ITEM_CONTAINER_NO_TOOLBAR = getClassname({ elementName: `item-container--no-toolbar` });

export const CarouselItemViewerToolbar = forwardRef<HTMLElement, CarouselItemViewerToolbarProps>(({
    description,
    isVideo,
    itemContainerRef,
    isVideoPlaying,
    onClose = () => null,
    onNextItemClick = () => null,
    onPreviousItemClick = () => null,
    setIsVideoPlaying,
    videoRef,
}, ref) => {
    //#region Init
    const { options, items, currentItemIndex, setCurrentItemIndex, currentItem, isFullscreenMode } = useCarouselContext();
    const shouldHideTimoutRef = useRef<any>(-1);
    const previousButtonRef = useRef<any>(null);
    const nextButtonRef = useRef<any>(null);
    const closeButtonRef = useRef<any>(null);
    const fullscreenButtonRef = useRef<any>(null);
    const pauseButtonRef = useRef<any>(null);
    const playButtonRef = useRef<any>(null);
    const seekForwardButtonRef = useRef<any>(null);
    const seekBackwardButtonRef = useRef<any>(null);

    const [timeStrings, setTimeStrings] = useState<VideoTimeStrings>({
        durationStr: getFormattedTimeString((videoRef?.current?.duration) || -1),
        currentTimeStr: getFormattedTimeString((videoRef?.current?.currentTime) || -1),
    });
    const [previewDirection, setPreviewDirection] = useState(ToolbarPreviewDirection.none);
    const [isPreviousItemPreviewLoaded, setIsPreviousItemPreviewLoaded] = useState(false);
    const [isNextItemPreviewLoaded, setIsNextItemPreviewLoaded] = useState(false);

    const [showCloseButtonPopup, setShowCloseButtonPopup] = useState(false);
    const [showFullscreenButtonPopup, setShowFullscreenButtonPopup] = useState(false);
    const [showPauseButtonPopup, setShowPauseButtonPopup] = useState(false);
    const [showPlayButtonPopup, setShowPlayButtonPopup] = useState(false);
    const [showSeekForwardButtonPopup, setShowSeekForwardButtonPopup] = useState(false);
    const [showSeekBackwardButtonPopup, setShowSeekBackwardButtonPopup] = useState(false);

    const { stylingLogic, toolbarActionsLogic, toolbarLogic } = useBusinessLogic({});
    const isMobile = window.innerWidth <= MOBILE_PIXEL_WIDTH;

    useKeyboardShortcuts([
        {
            keys: toolbarActionsLogic.getPlay().keys,
            action: toolbarActionsLogic.isPauseSeparate ? handleKeyboardPlay : handlePlayPauseUnited,
        },
        {
            keys: toolbarActionsLogic.getPause().keys,
            action: handleKeyboardPause,
        },
        {
            keys: toolbarActionsLogic.getSeekBackwards().keys,
            action: handleKeyboardSeekBackward,
        },
        {
            keys: toolbarActionsLogic.getSeekForwards().keys,
            action: handleKeyboardSeekForward,
        },
        {
            keys: toolbarActionsLogic.getNextItem().keys,
            action: () => onNextItemClickLocal(),
        },
        {
            keys: toolbarActionsLogic.getPreviousItem().keys,
            action: () => onPreviousItemClickLocal(),
        },
    ], () => toolbarLogic.getShouldSkipKeyboardShortcuts());
    useUpdateTimeString(currentItem, setTimeStrings, videoRef);
    //#endregion

    //#region Functions/handlers
    const resetPreviewItems = useCallback(() => {
        setIsNextItemPreviewLoaded(false);
        setIsPreviousItemPreviewLoaded(false);
    }, [])

    function getPreviewItemIndex(direction: ToolbarPreviewDirection) {
        if (direction === ToolbarPreviewDirection.next) {
            if (currentItemIndex >= (items.length - 1)) return 0;
            return currentItemIndex + 1;
        } else {
            if (currentItemIndex <= 0) return items.length - 1;
            return currentItemIndex - 1;
        }
    }

    const handleAutoHide = useCallback((e?: MouseEvent) => {
        stopPropagation(e);
        clearTimeout(shouldHideTimoutRef.current);

        if (!isFullscreenMode || options?.itemViewer?.autoHideToolbarDuration === AUTO_HIDE_DISABLED_VALUE) return;
        if (itemContainerRef?.current) {
            itemContainerRef.current.classList?.remove(CLASSNAME_ITEM_CONTAINER_NO_TOOLBAR);
        }

        shouldHideTimoutRef.current = setTimeout(() => {
            if (itemContainerRef?.current && !isMobile) {
                itemContainerRef.current.classList?.add(CLASSNAME_ITEM_CONTAINER_NO_TOOLBAR);
            }
        }, options?.itemViewer?.autoHideToolbarDuration || AUTO_HIDE_VIDEO_TOOLBAR_DURATION_DEFAULT);
    }, [
        isMobile,
        isFullscreenMode,
        itemContainerRef,
        options,
        shouldHideTimoutRef,
    ]);

    function handlePlayPauseUnited() {
        if (isVideoPlaying) {
            onPauseClick();
        } else {
            onPlayClick();
        }
    }

    function handleKeyboardPause() {
        onPauseClick();
    }

    function handleKeyboardPlay() {
        onPlayClick();
    }

    function handleKeyboardSeekBackward() {
        onSeekBackClick();
    }

    function handleKeyboardSeekForward() {
        onSeekForwardClick();
    }

    const onNextItemClickLocal = useCallback(() => {
        if (items.length <= 1) return;
        const newIndex = currentItemIndex === items.length - 1 ? 0 : currentItemIndex + 1;
        setCurrentItemIndex(newIndex);
        resetPreviewItems();
        onNextItemClick && onNextItemClick();
        handleAutoHide();
        toolbarActionsLogic.getNextItem().onActionCompleted();
    }, [currentItemIndex, items, setCurrentItemIndex, resetPreviewItems, handleAutoHide, onNextItemClick, toolbarActionsLogic])

    const onPreviousItemClickLocal = useCallback(() => {
        if (items.length <= 1) return;
        const newIndex = currentItemIndex === 0 ? items.length - 1 : currentItemIndex - 1;
        setCurrentItemIndex(newIndex);
        resetPreviewItems();
        onPreviousItemClick && onPreviousItemClick();
        handleAutoHide();
        toolbarActionsLogic.getPreviousItem().onActionCompleted();
    }, [currentItemIndex, items, setCurrentItemIndex, resetPreviewItems, handleAutoHide, onPreviousItemClick, toolbarActionsLogic])

    const onPauseClick = useCallback(() => {
        if (videoRef?.current && setIsVideoPlaying) {
            setIsVideoPlaying(false);
            videoRef?.current.pause();
        }
        handleAutoHide();
        toolbarActionsLogic.getPause().onActionCompleted();
    }, [setIsVideoPlaying, videoRef, handleAutoHide, toolbarActionsLogic]);

    const onPlayClick = useCallback(() => {
        if (videoRef?.current && setIsVideoPlaying) {
            tryPlayingVideo(
                videoRef.current,
                () => setIsVideoPlaying(true),
                () => setIsVideoPlaying(false),
            )
        }
        handleAutoHide();
        toolbarActionsLogic.getPlay().onActionCompleted();
    }, [setIsVideoPlaying, videoRef, handleAutoHide, toolbarActionsLogic]);

    const onSeekBackClick = useCallback(() => {
        if (videoRef?.current) {
            videoRef.current.currentTime -= (options?.itemViewer?.seekAmount || SEEK_AMOUNT_DEFAULT) / 1000;
        }
        handleAutoHide();
        toolbarActionsLogic.getSeekBackwards().onActionCompleted();
    }, [options, videoRef, handleAutoHide, toolbarActionsLogic]);

    const onSeekForwardClick = useCallback(() => {
        if (videoRef?.current) {
            videoRef.current.currentTime += (options?.itemViewer?.seekAmount || SEEK_AMOUNT_DEFAULT) / 1000;
        }
        handleAutoHide();
        toolbarActionsLogic.getSeekForwards().onActionCompleted();
    }, [options, videoRef, handleAutoHide, toolbarActionsLogic])

    function onToolbarClick(e: MouseEvent) {
        e.stopPropagation();
    }

    //#endregion

    //#region Side Fx
    useEffect(() => {
        handleAutoHide();

        window.addEventListener('mousemove', handleAutoHide);
        window.addEventListener('click', handleAutoHide);

        return () => {
            window.removeEventListener('mousemove', handleAutoHide);
            window.removeEventListener('click', handleAutoHide);
        }
    }, [handleAutoHide]);

    //handling events for buttons
    useEffect(() => {
        const closeButtonRefCopy = closeButtonRef.current;
        const fullScreenButtonRefCopy = fullscreenButtonRef.current;
        const nextButtonRefCopy = nextButtonRef.current;
        const pauseButtonRefCopy = pauseButtonRef.current;
        const playButtonRefCopy = playButtonRef.current;
        const previousButtonRefCopy = previousButtonRef.current;
        const seekBackwardButtonRefCopy = seekBackwardButtonRef.current;
        const seekForwardButtonRefCopy = seekForwardButtonRef.current;

        const boundDisplayCloseButton = handleDisplayPopup.bind(null, true, setShowCloseButtonPopup);
        const boundHideCloseButton = handleDisplayPopup.bind(null, false, setShowCloseButtonPopup);
        const boundDisplayFullscreenButton = handleDisplayPopup.bind(null, true, setShowFullscreenButtonPopup);
        const boundHideFullscreenButton = handleDisplayPopup.bind(null, false, setShowFullscreenButtonPopup);
        const boundDisplayPauseButton = handleDisplayPopup.bind(null, true, setShowPauseButtonPopup);
        const boundHidePauseButton = handleDisplayPopup.bind(null, false, setShowPauseButtonPopup);
        const boundDisplayPlayButton = handleDisplayPopup.bind(null, true, setShowPlayButtonPopup);
        const boundHidePlayButton = handleDisplayPopup.bind(null, false, setShowPlayButtonPopup);
        const boundDisplaySeekForwardButton = handleDisplayPopup.bind(null, true, setShowSeekForwardButtonPopup);
        const boundHideSeekForwardButton = handleDisplayPopup.bind(null, false, setShowSeekForwardButtonPopup);
        const boundDisplaySeekBackwardButton = handleDisplayPopup.bind(null, true, setShowSeekBackwardButtonPopup);
        const boundHideSeekBackwardButton = handleDisplayPopup.bind(null, false, setShowSeekBackwardButtonPopup);

        function handleDisplayPopup(shouldShowPopup: boolean, showPopupSetter: React.Dispatch<React.SetStateAction<boolean>>, e: MouseEvent) {
            stopPropagation(e);
            showPopupSetter(shouldShowPopup);
        }

        function handleMouseEnterNextButton() {
            setPreviewDirection(ToolbarPreviewDirection.next);
        }

        function handleMouseEnterPreviousButton() {
            setPreviewDirection(ToolbarPreviewDirection.previous);
        }

        function handleMouseLeaveButton() {
            setPreviewDirection(ToolbarPreviewDirection.none);
        }

        if (closeButtonRef?.current) {
            closeButtonRef.current.addEventListener('mouseenter', boundDisplayCloseButton);
            closeButtonRef.current.addEventListener('mouseleave', boundHideCloseButton);
        }

        if (fullscreenButtonRef?.current) {
            fullscreenButtonRef.current.addEventListener('mouseenter', boundDisplayFullscreenButton);
            fullscreenButtonRef.current.addEventListener('mouseleave', boundHideFullscreenButton);
        }

        if (nextButtonRef?.current) {
            nextButtonRef.current.addEventListener('mouseenter', handleMouseEnterNextButton);
            nextButtonRef.current.addEventListener('mouseleave', handleMouseLeaveButton);
        }

        if (pauseButtonRef?.current) {
            pauseButtonRef.current.addEventListener('mouseenter', boundDisplayPauseButton);
            pauseButtonRef.current.addEventListener('mouseleave', boundHidePauseButton);
        }

        if (playButtonRef?.current) {
            playButtonRef.current.addEventListener('mouseenter', boundDisplayPlayButton);
            playButtonRef.current.addEventListener('mouseleave', boundHidePlayButton);
        }

        if (previousButtonRef?.current) {
            previousButtonRef.current.addEventListener('mouseenter', handleMouseEnterPreviousButton);
            previousButtonRef.current.addEventListener('mouseleave', handleMouseLeaveButton);
        }

        if (seekBackwardButtonRef?.current) {
            seekBackwardButtonRef.current.addEventListener('mouseenter', boundDisplaySeekBackwardButton);
            seekBackwardButtonRef.current.addEventListener('mouseleave', boundHideSeekBackwardButton);
        }

        if (seekForwardButtonRef?.current) {
            seekForwardButtonRef.current.addEventListener('mouseenter', boundDisplaySeekForwardButton);
            seekForwardButtonRef.current.addEventListener('mouseleave', boundHideSeekForwardButton);
        }
        return () => {
            if (closeButtonRefCopy) {
                closeButtonRefCopy.removeEventListener('mouseenter', boundDisplayCloseButton);
                closeButtonRefCopy.removeEventListener('mouseleave', boundHideCloseButton);
            }

            if (fullScreenButtonRefCopy) {
                fullScreenButtonRefCopy.removeEventListener('mouseenter', boundDisplayFullscreenButton);
                fullScreenButtonRefCopy.removeEventListener('mouseleave', boundHideFullscreenButton);
            }

            if (nextButtonRefCopy) {
                nextButtonRefCopy.removeEventListener('mouseenter', handleMouseEnterNextButton);
                nextButtonRefCopy.removeEventListener('mouseleave', handleMouseLeaveButton);
            }

            if (pauseButtonRefCopy) {
                pauseButtonRefCopy.removeEventListener('mouseenter', boundDisplayPauseButton);
                pauseButtonRefCopy.removeEventListener('mouseleave', boundHidePauseButton);
            }

            if (playButtonRefCopy) {
                playButtonRefCopy.removeEventListener('mouseenter', boundDisplayPlayButton);
                playButtonRefCopy.removeEventListener('mouseleave', boundHidePlayButton);
            }

            if (previousButtonRefCopy) {
                previousButtonRefCopy.removeEventListener('mouseenter', handleMouseEnterPreviousButton);
                previousButtonRefCopy.removeEventListener('mouseleave', handleMouseLeaveButton);
            }

            if (seekBackwardButtonRefCopy) {
                seekBackwardButtonRefCopy.removeEventListener('mouseenter', boundDisplaySeekBackwardButton);
                seekBackwardButtonRefCopy.removeEventListener('mouseleave', boundHideSeekBackwardButton);
            }

            if (seekForwardButtonRefCopy) {
                seekForwardButtonRefCopy.removeEventListener('mouseenter', boundDisplaySeekForwardButton);
                seekForwardButtonRefCopy.removeEventListener('mouseleave', boundHideSeekForwardButton);
            }
        }
    }, [
        closeButtonRef,
        currentItemIndex,
        fullscreenButtonRef,
        isVideoPlaying,
        nextButtonRef,
        pauseButtonRef,
        playButtonRef,
        previousButtonRef,
        seekBackwardButtonRef,
        seekForwardButtonRef,
    ]);
    //#endregion

    //#region JSX
    return (
        <div ref={ref as any} onClick={onToolbarClick as any} className={CLASSNAME_TOOLBAR} style={stylingLogic.toolbarStyle}>
            {videoRef ?
                <CarouselItemViewerProgressBar
                    videoRef={videoRef}
                    setTimeStrings={setTimeStrings}
                /> : null
            }
            <div className={CLASSNAME_INNER_CONTAINER}>
                {videoRef ? (
                    <div className={CLASSNAME_TOOLBAR_LEFT}>
                        {isVideoPlaying ? (
                            <CarouselItemViewerPauseButton
                                actionName='Pause'
                                isShortcutVisible={showPauseButtonPopup}
                                onClick={onPauseClick}
                                options={options}
                                ref={pauseButtonRef}
                                position='left'
                            />
                        ) : (
                            <CarouselItemViewerPlayButton
                                actionName='Play'
                                isShortcutVisible={showPlayButtonPopup}
                                onClick={onPlayClick}
                                options={options}
                                ref={playButtonRef}
                                position='left'
                            />
                        )}
                        <CarouselItemViewerSeekBackButton
                            actionName='Seek Back'
                            isShortcutVisible={showSeekBackwardButtonPopup}
                            onClick={onSeekBackClick}
                            options={options}
                            ref={seekBackwardButtonRef}
                            position='left'
                        />
                        <CarouselItemViewerSeekForwardButton
                            actionName='Seek Forward'
                            isShortcutVisible={showSeekForwardButtonPopup}
                            onClick={onSeekForwardClick}
                            options={options}
                            ref={seekForwardButtonRef}
                            position='left'
                        />
                    </div>
                ) : null}
                <CarouselItemViewerToolbarText isVideo={isVideo} description={description || ''} timeStrings={timeStrings} />
                <div className={CLASSNAME_TOOLBAR_RIGHT}>
                    <CarouselItemViewerPreviousButton
                        actionName='Previous'
                        onClick={onPreviousItemClickLocal}
                        options={options}
                        ref={previousButtonRef}
                    />
                    <CarouselItemViewerNextButton
                        actionName='Next'
                        onClick={onNextItemClickLocal}
                        options={options}
                        ref={nextButtonRef}
                        position='right'
                    />
                    <CarouselItemViewerFullscreenButton
                        actionName='Fullscreen'
                        isShortcutVisible={!isFullscreenMode && showFullscreenButtonPopup}
                        onClick={() => null}
                        options={options}
                        ref={fullscreenButtonRef}
                    />
                    <CarouselItemViewerCloseButton
                        actionName='Exit'
                        isShortcutVisible={isFullscreenMode && showCloseButtonPopup}
                        onClick={onClose}
                        options={options}
                        ref={closeButtonRef}
                        position='right'
                    />
                </div>
            </div>
            <CarouselItemViewerToolbarPreview
                itemToShow={items[getPreviewItemIndex(ToolbarPreviewDirection.previous)]}
                show={
                    isFullscreenMode &&
                    previewDirection === ToolbarPreviewDirection.previous
                }
                isLoaded={isPreviousItemPreviewLoaded}
                setIsLoaded={setIsPreviousItemPreviewLoaded}
                shortcuts={toolbarActionsLogic.getPreviousItem().keys}
                actionName={"Previous"}
            />
            <CarouselItemViewerToolbarPreview
                itemToShow={items[getPreviewItemIndex(ToolbarPreviewDirection.next)]}
                show={
                    isFullscreenMode &&
                    previewDirection === ToolbarPreviewDirection.next
                }
                isLoaded={isNextItemPreviewLoaded}
                setIsLoaded={setIsNextItemPreviewLoaded}
                shortcuts={toolbarActionsLogic.getNextItem().keys}
                actionName={"Next"}
            />
        </div>
    )
    //#endregion
})