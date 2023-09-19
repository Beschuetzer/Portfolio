import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { getClassname, getIsVideoPlaying } from '../utils';
import { CarouselItemProps } from './CarouselItem'
import { CarouselItemViewerToolbar, CarouselItemViewerToolbarProps } from './item-viewer/toolbar/CarouselItemViewerToolbar';
import { LoadingSpinner } from './LoadingSpinner';
import { CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL, CLASSNAME__HIDDEN, CLASSNAME__TOOLBAR_PROGRESS, CURRENT_VIDEO_CURRENT_TIME_DEFAULT, PROGRESS_BAR_PERCENT_INITIAL_VALUE } from '../constants';
import { CarouselVideoCurrentStateIndicator } from './CarouselVideoCurrentStateIndicator';
import { useCarouselContext } from '../context';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { useRerenderOnExitFullscreenMode } from '../hooks/useRerenderOnExitFullscreenMode';
import { useResetCarouselVideoCurrentSection } from '../hooks/useResetCarouselVideoCurrentSection';
import { CarouselVideoProgressBarScreenshotViewer } from './item-viewer/progress-bar/CarouselItemViewerProgressBarScreenshotViewer';
import { CarouselVideoCurrentTimeViewer } from './CarouselVideoCurrentTimeViewer';

/**
*Each section is comprised of a description string and a duration (in ms).
*Each section starts 1ms after the previous section ended.
*The last section goes to the end by default.
**/
export type CarouselVideoSection = [string, number] | [string, string];
export type CarouselVideoOptions = {
    /**
    * If `true` and `muted` is `undefined` or `true`, the video will start playing when it first comes into focus.
    * e.g. when user scrolls down to it or when the user clicks the thumbnail to load it.
    **/
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    objectFit?: React.CSSProperties["objectFit"];
    objectPosition?: React.CSSProperties["objectPosition"];
    sections?: CarouselVideoSection[];
};

export const CarouselVideo = (props: CarouselItemProps & Pick<CarouselItemViewerToolbarProps, 'itemContainerRef'>) => {
    //#region Init
    const {
        description,
        itemContainerRef,
        srcMain,
        video: videoProps,
    } = props;
    const { options, currentItemIndex, currentVideoCurrentTime, isFullscreenMode, setIsFullscreenMode, setCurrentVideoCurrentTime } = useCarouselContext();

    const { autoPlay, loop, muted } = videoProps || {};
    const [isLoaded, setIsLoaded] = useState(false);
    const [percent, setPercent] = useState(PROGRESS_BAR_PERCENT_INITIAL_VALUE);
    const [seekPercent, setSeekPercent] = useState(PROGRESS_BAR_PERCENT_INITIAL_VALUE);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [currentVideoSection, setCurrentVideoSection] = useState(CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL);
    const videoRef = useRef<HTMLVideoElement>();
    const itemViewerToolbarRef = useRef<HTMLElement>();
    const isProgressBarMouseDownRef = useRef(false);
    const type = useMemo(() => srcMain?.slice(srcMain?.lastIndexOf('.') + 1), [srcMain]);
    const { stylingLogic, optionsLogic } = useBusinessLogic({ itemViewerToolbarRef });
    useRerenderOnExitFullscreenMode();
    useResetCarouselVideoCurrentSection({
        element: itemContainerRef?.current,
        progressBarElement: itemContainerRef?.current?.querySelector(`.${CLASSNAME__TOOLBAR_PROGRESS}`),
        currentSection: currentVideoSection,
        setCurrentSection: setCurrentVideoSection,
        isMouseDownRef: isProgressBarMouseDownRef,
    });
    //#endregion

    //#region Functions/Handlers
    const handleItemNavigation = useCallback(() => {
        setIsLoaded(false);

        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        if (videoRef.current?.load) {
            videoRef.current.load();
        }
    }, [setIsLoaded, videoRef]);

    const handleOnLoadedData = useCallback(() => {
        setIsLoaded(true);
        setIsVideoPlaying(false);
    }, [])

    const onVideoClick = useCallback((e: MouseEvent) => {
        if (optionsLogic.useDefaultVideoControls) {
            if (videoRef.current) {
                //note: this doesn't seem to work when in fullscreen mode
                setIsVideoPlaying(current => !current)
            }
            return;
        }

        if (e.detail === 2) {
            setIsFullscreenMode((current) => !current);
            setCurrentVideoCurrentTime(videoRef.current?.currentTime || CURRENT_VIDEO_CURRENT_TIME_DEFAULT);
        }
        if (videoRef.current) {
            if (getIsVideoPlaying(videoRef.current)) {
                videoRef.current?.pause();
                setIsVideoPlaying(false);
            } else {
                videoRef.current?.play();
                setIsVideoPlaying(true);
            }
        }
    }, [optionsLogic.useDefaultVideoControls, setCurrentVideoCurrentTime, setIsFullscreenMode]);
    //#endregion

    //#region Side Fx
    //Ensuring percent is valid value
    useLayoutEffect(() => {
        if (percent > 1) {
            setPercent(1);
        } else if (percent < 0) {
            setPercent(0);
        }
    }, [percent])

    //triggering a load event (https://stackoverflow.com/questions/41303012/updating-source-url-on-html5-video-with-react)
    useEffect(() => {
        setIsLoaded(false);
        if (videoRef.current?.load) {
            videoRef.current.load();
        }
    }, [currentItemIndex, srcMain, videoRef, videoProps?.autoPlay])

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = currentVideoCurrentTime;
        }
    }, [currentVideoCurrentTime])

    useEffect(() => {
        function handleFullscreenChange(e: Event) {
            if (!isFullscreenMode) return;
            if (videoRef.current) {
                if (getIsVideoPlaying(videoRef.current)) {
                    videoRef.current?.pause();
                    setIsVideoPlaying(false);
                } else {
                    videoRef.current?.play();
                    setIsVideoPlaying(true);
                }
            }
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        }
    }, [isFullscreenMode])
    //#endregion

    //#region JSX   
    return (
        <>
            <div style={stylingLogic.carouselVideoContainerStyle}>
                <CarouselVideoCurrentStateIndicator isVideoPlaying={isVideoPlaying} />
                <LoadingSpinner
                    type='ring'
                    show={!isLoaded}
                    description={description}
                    {...options?.styling?.itemViewer?.loadingSpinner}
                />
                <CarouselVideoCurrentTimeViewer
                    isProgressBarMouseDownRef={isProgressBarMouseDownRef}
                    isVideoPlaying={isVideoPlaying}
                    percent={percent}
                    srcMain={srcMain}
                    type={type}
                />
                <video
                    controls={optionsLogic.useDefaultVideoControls}
                    draggable={false}
                    className={`${getClassname({ elementName: 'video' })} ${isLoaded ? '' : CLASSNAME__HIDDEN}`}
                    style={stylingLogic.getCarouselVideoStyle(!!isProgressBarMouseDownRef.current)}
                    ref={videoRef as any}
                    autoPlay={!!autoPlay}
                    muted={!!muted}
                    loop={!!loop}
                    onClick={onVideoClick as any}
                    onLoadedData={handleOnLoadedData}
                    onPlay={() => setIsVideoPlaying(true)}
                    onEnded={() => setIsVideoPlaying(false)}
                >
                    <source src={srcMain} type={`video/${type}`} />
                    Your browser does not support the HTML5 video tag. Try using a different browser.
                </video>
            </div>
            <CarouselItemViewerToolbar
                currentVideoSection={currentVideoSection}
                description={description || ''}
                isProgressBarMouseDownRef={isProgressBarMouseDownRef}
                isVideo={true}
                itemContainerRef={itemContainerRef}
                onNextItemClick={handleItemNavigation}
                onPreviousItemClick={handleItemNavigation}
                ref={itemViewerToolbarRef as any}
                percent={percent}
                setPercent={setPercent}
                seekPercent={seekPercent}
                setCurrentVideoSection={setCurrentVideoSection}
                setIsVideoPlaying={setIsVideoPlaying}
                setSeekPercent={setSeekPercent}
                videoRef={videoRef}
            />
            <CarouselVideoProgressBarScreenshotViewer
                currentVideoSection={currentVideoSection}
                percent={isProgressBarMouseDownRef.current ? percent : seekPercent}
                toolbarRef={itemViewerToolbarRef as any}
                videoRef={videoRef}
                srcMain={srcMain}
                type={type}
            />
        </>
    );
    //#endregion
}