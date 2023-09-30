import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { getFormattedTimeString, getIsMobile, getIsVideoPlaying, getPoint, stopPropagation } from '../../../utils/utils'
import { CarouselItemViewerCloseButton } from './CarouselItemViewerCloseButton'
import { CarouselItemViewerToolbarText } from './CarouselItemViewerToolbarText'
import { CarouselItemViewerProgressBar } from '../progress-bar/CarouselItemViewerProgressBar'
import { VideoTimeStrings } from '../../../types'
import { CarouselItemViewerNextButton } from './CarouselItemViewerNextButton'
import { CarouselItemViewerPauseButton } from './CarouselItemViewerPauseButton'
import { CarouselItemViewerPlayButton } from './CarouselItemViewerPlayButton'
import { CarouselItemViewerPreviousButton } from './CarouselItemViewerPreviousButton'
import { CarouselItemViewerSeekBackButton } from './CarouselItemViewerSeekBackButton'
import { CarouselItemViewerSeekForwardButton } from './CarouselItemViewerSeekForwardButton'
import { CarouselItemViewerToolbarPreview, ToolbarPreviewDirection } from './CarouselItemViewerToolbarPreview'
import { useKeyboardShortcuts } from '../../../hooks/useKeyboardShortcuts'
import {
    AUTO_HIDE_DISABLED_VALUE,
    AUTO_HIDE_VIDEO_TOOLBAR_DURATION_DEFAULT,
    CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL,
    CLASSNAME__GRABBING,
    CLASSNAME__ITEM_CONTAINER_NO_TOOLBAR,
    CLASSNAME__ITEM_VIEWER_TOOLBAR,
    CLASSNAME__TOOLBAR_CONTAINER,
    CLASSNAME__TOOLBAR_LEFT,
    CLASSNAME__TOOLBAR_RIGHT,
} from '../../../constants'
import { useUpdateTimeString } from '../../../hooks/useUpdateTimeStrings'
import { CarouselItemViewerFullscreenButton } from './CarouselItemViewerFullScreenButton'
import { useCarouselContext } from '../../../context'
import { useBusinessLogic } from '../../../hooks/useBusinessLogic'
import { useOnSwipe, StylingCase } from '../../../hooks/useOnSwipe'
import { getIsPointInsideElement } from '../../../utils/utils'
import { CarouselModal } from '../../modal/CarouselModal'

export type CarouselItemViewerToolbarProps = {
    currentVideoSection?: number;
    description: string;
    imageRef?: React.MutableRefObject<HTMLImageElement | undefined> | null;
    isProgressBarMouseDownRef?: React.MutableRefObject<boolean | undefined>;
    isVideo: boolean;
    itemContainerRef: React.MutableRefObject<HTMLDivElement | undefined> | null;
    onClose?: () => void;
    onNextItemClick?: () => void;
    onPreviousItemClick?: () => void;
    percent?: number;
    seekPercent?: number;
    setCurrentVideoSection?: React.Dispatch<React.SetStateAction<number>>;
    setPercent?: React.Dispatch<React.SetStateAction<number>>;
    setSeekPercent?: React.Dispatch<React.SetStateAction<number>>;
    toggleIsVideoPlaying?: (state?: boolean) => void;
    videoRef?: React.MutableRefObject<HTMLVideoElement | undefined> | null;
};

export const CarouselItemViewerToolbar = forwardRef<HTMLElement, CarouselItemViewerToolbarProps>((props, ref) => {
    //#region Init
    const {
        currentVideoSection,
        description,
        imageRef,
        isProgressBarMouseDownRef,
        isVideo,
        itemContainerRef,
        onClose = () => null,
        onNextItemClick = () => null,
        onPreviousItemClick = () => null,
        percent = 0,
        seekPercent = 0,
        setCurrentVideoSection,
        toggleIsVideoPlaying = () => null,
        setPercent = () => null,
        setSeekPercent = () => null,
        videoRef,
    } = props;
    const { items, currentItemIndex, setCurrentItemIndex, currentItem, isFullscreenMode, hiddenInputRef } = useCarouselContext();
    const isProgressBarBeingHoveredRef = useRef<boolean>(false);
    const shouldHideTimoutRef = useRef<any>(-1);
    const previousButtonRef = useRef<any>(null);
    const nextButtonRef = useRef<any>(null);
    const closeButtonRef = useRef<any>(null);
    const fullscreenButtonRef = useRef<any>(null);
    const pauseButtonRef = useRef<any>(null);
    const playButtonRef = useRef<any>(null);
    const seekForwardButtonRef = useRef<any>(null);
    const seekBackwardButtonRef = useRef<any>(null);
    const showToolbarOnItemChangeTimeoutRef = useRef<any>();
    const innerRef = useRef<HTMLElement>(null);
    useImperativeHandle(ref, () => innerRef.current as any);
    const doNothing = () => null;

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
    const [showNextButtonPopup, setShowNextButtonPopup] = useState(false);
    const [showPreviousButtonPopup, setShowPreviousButtonPopup] = useState(false);

    const { optionsLogic, stylingLogic, toolbarActionsLogic, toolbarLogic } = useBusinessLogic();
    const isMobile = getIsMobile();
    useKeyboardShortcuts({
        keyboardShortcuts: [
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
        ],
        skipCondition: () => toolbarLogic.getShouldSkipKeyboardShortcuts()
    });
    useOnSwipe({
        element: itemContainerRef?.current as HTMLElement,
        maxClickThreshold: optionsLogic.itemViewerMaxClickThreshold,
        isDisabled: optionsLogic.isItemViewerSwipingDisabled,
        swipeHandlers: {
            left: {
                callback: (e: Event) => {
                    onPreviousItemClickLocal();
                },
                skipCallbackParentClassnames: [CLASSNAME__ITEM_VIEWER_TOOLBAR],
            },
            right: {
                callback: (e: Event) => {
                    onNextItemClickLocal();
                },
                skipCallbackParentClassnames: [CLASSNAME__ITEM_VIEWER_TOOLBAR],
            },
        },
        handleStyleChanges: (styleCase: StylingCase, element: HTMLElement) => {
            if (!element) return;
            if (styleCase === 'start') {
                document.body.classList.add(CLASSNAME__GRABBING);
                element.classList.add(CLASSNAME__GRABBING)
            } else {
                document.body.classList.remove(CLASSNAME__GRABBING);
                element.classList.remove(CLASSNAME__GRABBING)
            }
        }
    })
    useUpdateTimeString({ currentItemInInstance: currentItem, setTimeStrings, videoRef });

    const isVideoPlaying = getIsVideoPlaying(videoRef?.current);
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

    const hideToolbar = useCallback(() => {
        if (itemContainerRef?.current && !isMobile && !isProgressBarMouseDownRef?.current) {
            itemContainerRef.current.classList?.add(CLASSNAME__ITEM_CONTAINER_NO_TOOLBAR);
        }
    }, [isMobile, isProgressBarMouseDownRef, itemContainerRef])

    const showToolbar = useCallback(() => {
        if (itemContainerRef?.current) {
            itemContainerRef.current.classList?.remove(CLASSNAME__ITEM_CONTAINER_NO_TOOLBAR);
        }
    }, [itemContainerRef])

    const handleAutoHide = useCallback((e?: MouseEvent) => {
        clearTimeout(shouldHideTimoutRef.current);
        if (!optionsLogic.isToolbarInVideo) {
            showToolbar();
            return;
        }
        stopPropagation(e);
        document.body?.style?.removeProperty('cursor');

        if ((!isFullscreenMode && isVideo && !isVideoPlaying) || optionsLogic.autoHideToolbarDuration === AUTO_HIDE_DISABLED_VALUE) return;

        const point = getPoint(e);
        const isInsideVideo = getIsPointInsideElement(point, videoRef?.current);

        if (isInsideVideo) {
            showToolbar();

        }

        shouldHideTimoutRef.current = setTimeout(() => {
            hideToolbar();
            document.body.style?.setProperty('cursor', 'none', 'important');
            hiddenInputRef.current?.focus();
        }, optionsLogic.autoHideToolbarDuration);
    }, [
        hiddenInputRef,
        hideToolbar,
        isFullscreenMode,
        isVideo,
        isVideoPlaying,
        optionsLogic.autoHideToolbarDuration,
        optionsLogic.isToolbarInVideo,
        showToolbar,
        videoRef,
    ]);

    function handlePlayPauseUnited() {
        if (getIsVideoPlaying(videoRef?.current)) {
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
        if (videoRef?.current) {
            videoRef?.current.pause();
            toggleIsVideoPlaying(false);
        }
        handleAutoHide();
        toolbarActionsLogic.getPause().onActionCompleted();
    }, [videoRef, toggleIsVideoPlaying, handleAutoHide, toolbarActionsLogic]);

    const onPlayClick = useCallback(() => {
        if (videoRef?.current) {
            videoRef?.current.play();
            toggleIsVideoPlaying(true);
        }
        handleAutoHide();
        toolbarActionsLogic.getPlay().onActionCompleted();
    }, [videoRef, handleAutoHide, toolbarActionsLogic, toggleIsVideoPlaying]);

    const onSeekBackClick = useCallback(() => {
        if (videoRef?.current) {
            videoRef.current.currentTime -= optionsLogic.videoSeekAmount;
        }
        handleAutoHide();
        toolbarActionsLogic.getSeekBackwards().onActionCompleted();
    }, [videoRef, handleAutoHide, toolbarActionsLogic, optionsLogic.videoSeekAmount]);

    const onSeekForwardClick = useCallback(() => {
        if (videoRef?.current) {
            videoRef.current.currentTime += optionsLogic.videoSeekAmount;

            if (videoRef.current.currentTime >= videoRef.current.duration) {
                toggleIsVideoPlaying(false);
            }
        }
        handleAutoHide();
        toolbarActionsLogic.getSeekForwards().onActionCompleted();
    }, [videoRef, handleAutoHide, toolbarActionsLogic, optionsLogic.videoSeekAmount, toggleIsVideoPlaying])

    function onToolbarClick(e: MouseEvent) {
        e.stopPropagation();
    }

    const handleMouseLeave = useCallback((e: MouseEvent) => {
        clearTimeout(showToolbarOnItemChangeTimeoutRef.current);
        if (isFullscreenMode) return;
        const point = getPoint(e);
        const isInVideoBox = getIsPointInsideElement(point, (videoRef?.current || imageRef?.current) as HTMLElement);
        const isVideoPlaying = !!imageRef?.current ? true : getIsVideoPlaying(videoRef?.current);
        if (isInVideoBox || !isVideoPlaying) return;
        hideToolbar();
    }, [hideToolbar, isFullscreenMode, videoRef, imageRef])

    const handleMouseMove = useCallback((e: MouseEvent) => {
        clearTimeout(showToolbarOnItemChangeTimeoutRef.current);
        showToolbar();
    }, [showToolbar])
    //#endregion

    //#region Side Fx

    useEffect(() => {
        handleAutoHide();

        window.addEventListener('mousemove', handleAutoHide);
        window.addEventListener('click', handleAutoHide);

        return () => {
            window.removeEventListener('mousemove', handleAutoHide);
            window.removeEventListener('click', handleAutoHide);
            clearTimeout(shouldHideTimoutRef.current);
        }
    }, [handleAutoHide]);

    useEffect(() => {
        const videoRefCopy = videoRef?.current;
        const imageRefCopy = imageRef?.current;
        const innerRefCopy = innerRef?.current;
        if (optionsLogic.isToolbarInVideo) {
            videoRef?.current?.addEventListener('mousemove', handleMouseMove);
            videoRef?.current?.addEventListener('mouseleave', handleMouseLeave);
            imageRef?.current?.addEventListener('mousemove', handleMouseMove);
            imageRef?.current?.addEventListener('mouseleave', handleMouseLeave);
            innerRef?.current?.addEventListener('mousemove', handleMouseMove);
            innerRef?.current?.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            videoRefCopy?.removeEventListener('mousemove', handleMouseMove);
            videoRefCopy?.removeEventListener('mouseleave', handleMouseLeave);
            imageRefCopy?.removeEventListener('mousemove', handleMouseMove);
            imageRefCopy?.removeEventListener('mouseleave', handleMouseLeave);
            innerRefCopy?.removeEventListener('mousemove', handleMouseMove);
            innerRefCopy?.removeEventListener('mouseleave', handleMouseLeave);
        }
    }, [
        handleAutoHide,
        handleMouseLeave,
        handleMouseMove,
        hideToolbar,
        imageRef,
        isVideo,
        optionsLogic.isToolbarInVideo,
        showToolbar,
        videoRef
    ])

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

        function handleMouseEnterNextButton(e: MouseEvent) {
            setPreviewDirection(ToolbarPreviewDirection.next);
            handleDisplayPopup(true, setShowNextButtonPopup, e);
        }

        function handleMouseEnterPreviousButton(e: MouseEvent) {
            setPreviewDirection(ToolbarPreviewDirection.previous);
            handleDisplayPopup(true, setShowPreviousButtonPopup, e);
        }

        function handleMouseLeaveButton(e: MouseEvent) {
            setPreviewDirection(ToolbarPreviewDirection.none);
            handleDisplayPopup(false, setShowNextButtonPopup, e);
            handleDisplayPopup(false, setShowPreviousButtonPopup, e);
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
        nextButtonRef,
        pauseButtonRef,
        playButtonRef,
        previousButtonRef,
        seekBackwardButtonRef,
        seekForwardButtonRef,
    ]);

    //show the toolbar for SHOW_TOOLBAR_ON_ITEM_CHANGE_DURATION on item change then hide
    useEffect(() => {
        if (!optionsLogic.isToolbarInVideo) return;
        clearTimeout(showToolbarOnItemChangeTimeoutRef.current);
        showToolbar();

        if (isVideo && !isVideoPlaying) return;
        showToolbarOnItemChangeTimeoutRef.current = setTimeout(() => {
            hideToolbar();
        }, AUTO_HIDE_VIDEO_TOOLBAR_DURATION_DEFAULT)

        return () => {
            clearTimeout(showToolbarOnItemChangeTimeoutRef.current);
        }
    }, [currentItemIndex, hideToolbar, isVideo, isVideoPlaying, optionsLogic.isToolbarInVideo, showToolbar])
    //#endregion

    //#region JSX
    return (
        <div
            ref={innerRef as any}
            onClick={onToolbarClick as any}
            className={CLASSNAME__ITEM_VIEWER_TOOLBAR}
            style={stylingLogic.toolbarStyle}
        >
            {isVideo && !isFullscreenMode && optionsLogic.useDefaultVideoControls ? null : (
                <div
                    style={stylingLogic.toolbarOuterContainerStyle}
                >
                    {
                        videoRef ?
                            <CarouselItemViewerProgressBar
                                currentVideoSection={currentVideoSection === undefined ? CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL : currentVideoSection}
                                isMouseDownRef={isProgressBarMouseDownRef}
                                isProgressBarBeingHoveredRef={isProgressBarBeingHoveredRef}
                                percent={percent}
                                setCurrentVideoSection={setCurrentVideoSection || doNothing}
                                setTimeStrings={setTimeStrings}
                                setSeekPercent={setSeekPercent}
                                seekPercent={seekPercent}
                                setPercent={setPercent}
                                toggleIsVideoPlaying={toggleIsVideoPlaying}
                                videoRef={videoRef}
                            /> : null
                    }
                    <div
                        style={stylingLogic.toolbarInnerContainerStyle}
                        className={CLASSNAME__TOOLBAR_CONTAINER}
                    >
                        {videoRef ? (
                            <div className={CLASSNAME__TOOLBAR_LEFT}>
                                <CarouselItemViewerPlayButton
                                    actionName='Play'
                                    isShortcutVisible={showPlayButtonPopup && !isProgressBarMouseDownRef?.current}
                                    isVisible={!isVideoPlaying}
                                    onClick={onPlayClick}
                                    ref={playButtonRef}
                                    position='left'
                                />
                                <CarouselItemViewerPauseButton
                                    actionName='Pause'
                                    isShortcutVisible={showPauseButtonPopup && !isProgressBarMouseDownRef?.current}
                                    isVisible={isVideoPlaying}
                                    onClick={onPauseClick}
                                    ref={pauseButtonRef}
                                    position='left'
                                />
                                <CarouselItemViewerSeekBackButton
                                    actionName='Seek Back'
                                    isShortcutVisible={showSeekBackwardButtonPopup && !isProgressBarMouseDownRef?.current}
                                    onClick={onSeekBackClick}
                                    ref={seekBackwardButtonRef}
                                    position='left'
                                />
                                <CarouselItemViewerSeekForwardButton
                                    actionName='Seek Forward'
                                    isShortcutVisible={showSeekForwardButtonPopup && !isProgressBarMouseDownRef?.current}
                                    onClick={onSeekForwardClick}
                                    ref={seekForwardButtonRef}
                                    position='left'
                                />
                            </div>
                        ) : null}
                        <CarouselItemViewerToolbarText isVideo={isVideo} description={description || ''} timeStrings={timeStrings} />
                        <div className={CLASSNAME__TOOLBAR_RIGHT}>
                            <CarouselItemViewerPreviousButton
                                actionName='Previous'
                                isShortcutVisible={!optionsLogic.itemViewerPreviewIsVisible && showPreviousButtonPopup && !isProgressBarMouseDownRef?.current}
                                onClick={onPreviousItemClickLocal}
                                ref={previousButtonRef}
                            />
                            <CarouselItemViewerNextButton
                                actionName='Next'
                                isShortcutVisible={!optionsLogic.itemViewerPreviewIsVisible && showNextButtonPopup && !isProgressBarMouseDownRef?.current}
                                onClick={onNextItemClickLocal}
                                ref={nextButtonRef}
                            />
                            <CarouselItemViewerFullscreenButton
                                actionName='Fullscreen'
                                isShortcutVisible={!isFullscreenMode && showFullscreenButtonPopup && !isProgressBarMouseDownRef?.current}
                                onClick={() => null}
                                ref={fullscreenButtonRef}
                                videoRef={videoRef}
                                style={{
                                    paddingRight: 2,
                                }}
                            />
                            <CarouselItemViewerCloseButton
                                actionName='Exit'
                                isShortcutVisible={isFullscreenMode && showCloseButtonPopup && !isProgressBarMouseDownRef?.current}
                                onClick={onClose}
                                ref={closeButtonRef}
                                position='right'
                                videoRef={videoRef}
                            />
                        </div>
                    </div>
                    <CarouselItemViewerToolbarPreview
                        itemToShow={items[getPreviewItemIndex(ToolbarPreviewDirection.previous)]}
                        show={
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
                            previewDirection === ToolbarPreviewDirection.next
                        }
                        isLoaded={isNextItemPreviewLoaded}
                        setIsLoaded={setIsNextItemPreviewLoaded}
                        shortcuts={toolbarActionsLogic.getNextItem().keys}
                        actionName={"Next"}
                    />
                    {currentItem?.modal ? (
                        <CarouselModal
                            itemViewerToolbarRef={innerRef as any}
                            itemRef={isVideo ? videoRef as any : imageRef as any}
                            isVideoPlaying={isVideoPlaying}
                            isProgressBarMouseDownRef={isProgressBarMouseDownRef}
                            isProgressBarBeingHoveredRef={isProgressBarBeingHoveredRef}
                            shouldHideWhenMinimized={showPauseButtonPopup || showPlayButtonPopup || showSeekBackwardButtonPopup || showSeekForwardButtonPopup}
                            {...currentItem?.modal}
                        />
                    ) : null}
                </div>
            )}
        </div>
    )
    //#endregion
})