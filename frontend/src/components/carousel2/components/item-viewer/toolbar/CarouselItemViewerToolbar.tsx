import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getClassname, getFormattedTimeString, tryPlayingVideo } from '../../../utils'
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
import { ToolbarLogic } from '../../../business-logic/ToolbarLogic'
import { useKeyboardShortcuts } from '../../../hooks/useKeyboardShortcuts'
import { ToolbarActionsLogic } from '../../../business-logic/ToolbarActionsLogic'
import { StylingLogic } from '../../../business-logic/StylingLogic'
import { ItemDisplayLocationLogic } from '../../../business-logic/ItemDisplayLocationLogic'
import { CLASSNAME__ITEM_VIEWER, MOBILE_PIXEL_WIDTH } from '../../../constants'
import { useUpdateTimeString } from '../../../hooks/useUpdateTimeStrings'
import { CarouselItemViewerFullscreenButton } from './CarouselItemViewerFullScreenButton'

export type CarouselItemViewerToolbarProps = {
    description: string;
    itemContainerRef: React.MutableRefObject<HTMLDivElement | undefined> | null;
    isProgressBarClickRef?: React.MutableRefObject<boolean>;
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

export const CarouselItemViewerToolbar = ({
    description,
    isVideo,
    itemContainerRef,
    isProgressBarClickRef,
    isVideoPlaying,
    onClose = () => null,
    onNextItemClick = () => null,
    onPreviousItemClick = () => null,
    setIsVideoPlaying,
    videoRef,
}: CarouselItemViewerToolbarProps) => {
    //#region Init
    const { options, items, currentItemIndex, setCurrentItemIndex, itemViewerToolbarRef, currentItem } = useCarouselContext();

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

    const itemDisplayLocationLogic = new ItemDisplayLocationLogic({ options, currentItem, currentItemIndex });
    const actionsLogic = new ToolbarActionsLogic(options, itemDisplayLocationLogic);
    const stylingLogic = new StylingLogic({ options, itemDisplayLocationLogic });
    const toolbarLogic = new ToolbarLogic(items);
    const isMobile = window.innerWidth <= MOBILE_PIXEL_WIDTH;

    useKeyboardShortcuts([
        {
            keys: actionsLogic.getPlay().keys,
            action: actionsLogic.isPauseSeparate ? handleKeyboardPlay : handlePlayPauseUnited,
        },
        {
            keys: actionsLogic.getPause().keys,
            action: handleKeyboardPause,
        },
        {
            keys: actionsLogic.getSeekBackwards().keys,
            action: handleKeyboardSeekBackward,
        },
        {
            keys: actionsLogic.getSeekForwards().keys,
            action: handleKeyboardSeekForward,
        },
        {
            keys: actionsLogic.getNextItem().keys,
            action: () => onNextItemClickLocal(),
        },
        {
            keys: actionsLogic.getPreviousItem().keys,
            action: () => onPreviousItemClickLocal(),
        },
    ], () => toolbarLogic.getShouldSkipKeyboardShortcuts());
    useUpdateTimeString(currentItem, setTimeStrings, videoRef);
    //#endregion

    //#region Functions/handlers
    function getPreviewItemIndex(direction: ToolbarPreviewDirection) {
        if (direction === ToolbarPreviewDirection.next) {
            if (currentItemIndex >= (items.length - 1)) return 0;
            return currentItemIndex + 1;
        } else {
            if (currentItemIndex <= 0) return items.length - 1;
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
        actionsLogic.getNextItem().onActionCompleted();
    }, [currentItemIndex, items, setCurrentItemIndex, resetPreviewItems, handleAutoHide, onNextItemClick, actionsLogic])

    const onPreviousItemClickLocal = useCallback(() => {
        if (items.length <= 1) return;
        const newIndex = currentItemIndex === 0 ? items.length - 1 : currentItemIndex - 1;
        setCurrentItemIndex(newIndex);
        resetPreviewItems();
        onPreviousItemClick && onPreviousItemClick();
        handleAutoHide();
        actionsLogic.getPreviousItem().onActionCompleted();
    }, [currentItemIndex, items, setCurrentItemIndex, resetPreviewItems, handleAutoHide, onPreviousItemClick, actionsLogic])

    const onPauseClick = useCallback(() => {
        if (videoRef?.current && setIsVideoPlaying) {
            setIsVideoPlaying(false);
            videoRef?.current.pause();
        }
        handleAutoHide();
        actionsLogic.getPause().onActionCompleted();
    }, [setIsVideoPlaying, videoRef]);

    const onPlayClick = useCallback(() => {
        if (videoRef?.current && setIsVideoPlaying) {
            tryPlayingVideo(
                videoRef.current,
                () => setIsVideoPlaying(true),
                () => setIsVideoPlaying(false),
            )
        }
        handleAutoHide();
        actionsLogic.getPlay().onActionCompleted();
    }, [setIsVideoPlaying, videoRef]);

    const onSeekBackClick = useCallback(() => {
        if (videoRef?.current) {
            videoRef.current.pause();
            videoRef.current.currentTime -= (options?.itemViewer?.seekAmount || SEEK_AMOUNT_DEFAULT) / 1000;
        }
        handleAutoHide();
        actionsLogic.getSeekBackwards().onActionCompleted();
    }, [setIsVideoPlaying, options, SEEK_AMOUNT_DEFAULT, videoRef]);

    const onSeekForwardClick = useCallback(() => {
        if (videoRef?.current) {
            videoRef.current.pause();
            videoRef.current.currentTime += (options?.itemViewer?.seekAmount || SEEK_AMOUNT_DEFAULT) / 1000;
        }
        handleAutoHide();
        actionsLogic.getSeekForwards().onActionCompleted();
    }, [setIsVideoPlaying, options, SEEK_AMOUNT_DEFAULT, videoRef])

    function onToolbarClick(e: MouseEvent) {
        e.stopPropagation();
    }

    function resetPreviewItems() {
        setIsNextItemPreviewLoaded(false);
        setIsPreviousItemPreviewLoaded(false);
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

        function handleDisplayPopup(shouldShowPopup: boolean, showPopupSetter: React.Dispatch<React.SetStateAction<boolean>>) {
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
            if (closeButtonRef?.current) {
                closeButtonRef.current.removeEventListener('mouseenter', boundDisplayCloseButton);
                closeButtonRef.current.removeEventListener('mouseleave', boundHideCloseButton);
            }

            if (fullscreenButtonRef?.current) {
                fullscreenButtonRef.current.removeEventListener('mouseenter', boundDisplayFullscreenButton);
                fullscreenButtonRef.current.removeEventListener('mouseleave', boundHideFullscreenButton);
            }

            if (nextButtonRef?.current) {
                nextButtonRef.current.removeEventListener('mouseenter', handleMouseEnterNextButton);
                nextButtonRef.current.removeEventListener('mouseleave', handleMouseLeaveButton);
            }

            if (pauseButtonRef?.current) {
                pauseButtonRef.current.removeEventListener('mouseenter', boundDisplayPauseButton);
                pauseButtonRef.current.removeEventListener('mouseleave', boundHidePauseButton);
            }

            if (playButtonRef?.current) {
                playButtonRef.current.removeEventListener('mouseenter', boundDisplayPlayButton);
                playButtonRef.current.removeEventListener('mouseleave', boundHidePlayButton);
            }

            if (previousButtonRef?.current) {
                previousButtonRef.current.removeEventListener('mouseenter', handleMouseEnterPreviousButton);
                previousButtonRef.current.removeEventListener('mouseleave', handleMouseLeaveButton);
            }

            if (seekBackwardButtonRef?.current) {
                seekBackwardButtonRef.current.removeEventListener('mouseenter', boundDisplaySeekBackwardButton);
                seekBackwardButtonRef.current.removeEventListener('mouseleave', boundHideSeekBackwardButton);
            }

            if (seekForwardButtonRef?.current) {
                seekForwardButtonRef.current.removeEventListener('mouseenter', boundDisplaySeekForwardButton);
                seekForwardButtonRef.current.removeEventListener('mouseleave', boundHideSeekForwardButton);
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
        <div ref={itemViewerToolbarRef as any} onClick={onToolbarClick as any} className={CLASSNAME_TOOLBAR} style={stylingLogic.toolbarStyle}>
            {videoRef ?
                <CarouselItemViewerProgressBar
                    isProgressBarClickRef={isProgressBarClickRef}
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
                                shortcutPosition='left'
                            />
                        ) : (
                            <CarouselItemViewerPlayButton
                                actionName='Play'
                                isShortcutVisible={showPlayButtonPopup}
                                onClick={onPlayClick}
                                options={options}
                                ref={playButtonRef}
                                shortcutPosition='left'
                            />
                        )}
                        <CarouselItemViewerSeekBackButton
                            actionName='Seek Back'
                            isShortcutVisible={showSeekBackwardButtonPopup}
                            onClick={onSeekBackClick}
                            options={options}
                            ref={seekBackwardButtonRef}
                            shortcutPosition='left'
                        />
                        <CarouselItemViewerSeekForwardButton
                            actionName='Seek Forward'
                            isShortcutVisible={showSeekForwardButtonPopup}
                            onClick={onSeekForwardClick}
                            options={options}
                            ref={seekForwardButtonRef}
                            shortcutPosition='left'
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
                        shortcutPosition='right'
                    />
                    {itemDisplayLocationLogic.isFullscreenButtonVisible ? (
                        <CarouselItemViewerFullscreenButton
                            actionName='Fullscreen'
                            isShortcutVisible={showFullscreenButtonPopup}
                            onClick={() => null}
                            options={options}
                            ref={fullscreenButtonRef}
                        />
                    ) : (
                        <CarouselItemViewerCloseButton
                            actionName='Exit'
                            isShortcutVisible={showCloseButtonPopup}
                            onClick={onClose}
                            options={options}
                            ref={closeButtonRef}
                            shortcutPosition='right'
                        />
                    )}
                </div>
            </div>
            <CarouselItemViewerToolbarPreview
                itemToShow={items[getPreviewItemIndex(ToolbarPreviewDirection.previous)]}
                show={
                    !itemDisplayLocationLogic.isFullscreenButtonVisible &&
                    previewDirection === ToolbarPreviewDirection.previous
                }
                isLoaded={isPreviousItemPreviewLoaded}
                setIsLoaded={setIsPreviousItemPreviewLoaded}
                shortcuts={actionsLogic.getPreviousItem().keys}
                actionName={"Previous"}
            />
            <CarouselItemViewerToolbarPreview
                itemToShow={items[getPreviewItemIndex(ToolbarPreviewDirection.next)]}
                show={
                    !itemDisplayLocationLogic.isFullscreenButtonVisible &&
                    previewDirection === ToolbarPreviewDirection.next
                }
                isLoaded={isNextItemPreviewLoaded}
                setIsLoaded={setIsNextItemPreviewLoaded}
                shortcuts={actionsLogic.getNextItem().keys}
                actionName={"Next"}
            />
        </div>
    )
    //#endregion
}