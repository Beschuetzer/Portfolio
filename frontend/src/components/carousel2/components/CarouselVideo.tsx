import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { getClassname, getIsVideoPlaying } from '../utils/utils';
import { CarouselItemProps } from './CarouselItem'
import { CarouselItemViewerToolbar, CarouselItemViewerToolbarProps } from './item-viewer/toolbar/CarouselItemViewerToolbar';
import { LoadingSpinner } from './LoadingSpinner';
import { CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL, CLASSNAME__HIDDEN, CLASSNAME__TOOLBAR_PROGRESS, CURRENT_VIDEO_CURRENT_TIME_DEFAULT, PROGRESS_BAR_PERCENT_INITIAL_VALUE } from '../constants';
import { CarouselVideoCurrentStateIndicator } from './CarouselVideoCurrentStateIndicator';
import { useCarouselContext } from '../context';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { useRerenderOnExitFullscreenMode } from '../hooks/useRerenderOnExitFullscreenMode';
import { useResetCarouselVideoCurrentSection } from '../hooks/useResetCarouselVideoCurrentSection';
import { CarouselVideoProgressBarScreenshotViewerMemoized } from './item-viewer/progress-bar/CarouselItemViewerProgressBarScreenshotViewer';
import { CarouselVideoCurrentTimeViewer } from './CarouselVideoCurrentTimeViewer';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useSectionToValueMapping } from '../hooks/useSectionToValueMapping';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CarouselLayoutOptions, CarouselItemDisplayLocation } from '../types';
import { resolveSrcMain } from '../utils/getCarouselVideo';

/**
*A video item can be composed of a low resolution and high resolution video.  This is isn't necessary, but can optimize load times for th
**/
export type CarouselVideo = {
    /**
    *This version will be used when the video is fullscreen if given.  If no {@link CarouselVideo.loRes low resolution} version is given,
    this will be used when {@link CarouselLayoutOptions.itemDisplayLocation itemDisplayLocation} is not {@link CarouselItemDisplayLocation none}.
    **/
    hiRes?: string;
    /**
    *This version will be used in fullscreen mode if no {@link CarouselVideo.hiRes high resolution} version is given.
    *This version will be preferred when {@link CarouselLayoutOptions.itemDisplayLocation itemDisplayLocation} is not {@link CarouselItemDisplayLocation none}.
    *
    * As the resolution of a video increase (specified by {@link CarouselItemProps.srcMain srcMain}), the performance of the preview may get choppy.
    * This manifests in two ways: 1) the previews don't update as frequently and 2) the smoothness of rendering the previewer is dimished.
    * Passing in a lower resolution version of the video here will fix this.
    * See this {@link https://www.veed.io/tools/video-compressor/mp4-compressor compressor} for a free video compression option.
    **/
    loRes?: string;
}
/**
*The first value is the description of the section and second value is either the duration or the start time (respectively).
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

    /**
    *Each section is comprised of a description string and a duration (in ms).
    *Each section starts 1ms after the previous section ended.
    *See {@link useSectionToValueMapping useSectionToValueMapping} for details.
    *@example
    *When using strings, the first item always starts at zero, so it can be omitted.
    *sections: [
    *    ['Starting Section'], //starts at 0 and goes to 1 minute 59 seconds and 999 milliseconds
    *    ['Section Two', "02:00"], //starts at 2 seconds and goes to 6 minutes 59 seconds and 999 milliseconds
    *    ['Section Three', "07:00"], //starts at 7 seconds and ends at 1 minute 18 seconds and 999 milliseconds
    *    ['Section Four', "01:19:00"], //starts at 1 minute and 19 seconds and goes to the end
    *]
    *
    *When using numbers, the value specifies the length of the section rather than the start time.
    *The last item may be omittted since it will start after the previous sections end and end at the end of the video.
    *sections: [
    *    ['Starting Section', 2000], //section is 2 seconds long (starts at 0 and ends at 2 seconds)
    *    ['Section Two', 5000], //section is 5 seconds long (starts at the previous section's end - 1 millisecond and lasts 5 seconds, so would stop at 7 seconds in this case)
    *    ['Section Three'], //section fills up the remaining space (starts at 7 seconds and 1 millesecond and goes to end of video)
    *]
    **/
    sections?: CarouselVideoSection[];
};

export type CarouselVideoProps = {
    isVideoPlaying: boolean;
    isVideoStateChangeInitiatedInternallyRef: React.MutableRefObject<boolean>;
    setIsVideoPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CarouselVideo = (props: CarouselVideoProps & CarouselItemProps & Pick<CarouselItemViewerToolbarProps, 'itemContainerRef'>) => {
    //#region Init
    const {
        description,
        isVideoPlaying,
        isVideoStateChangeInitiatedInternallyRef,
        itemContainerRef,
        setIsVideoPlaying,
        srcMain,
        video: videoProps,
    } = props;
    const { options, currentItemIndex, currentVideoCurrentTime, isFullscreenMode, setCurrentVideoCurrentTime, itemContainerHeight } = useCarouselContext();
    const { autoPlay = false, loop = false, muted = true } = videoProps || {};
    const [isLoaded, setIsLoaded] = useState(false);
    const [percent, setPercent] = useState(PROGRESS_BAR_PERCENT_INITIAL_VALUE);
    const [seekPercent, setSeekPercent] = useState(PROGRESS_BAR_PERCENT_INITIAL_VALUE);
    const [currentVideoSection, setCurrentVideoSection] = useState(CAROUSEL_VIDEO_CURRENT_SECTION_INITIAL);
    const videoRef = useRef<HTMLVideoElement>();
    const itemViewerToolbarRef = useRef<HTMLElement>();
    const isProgressBarMouseDownRef = useRef(false);
    const srcMainToUse = resolveSrcMain(srcMain, true);
    const type = useMemo(() => srcMainToUse?.slice(srcMainToUse?.lastIndexOf('.') + 1), [srcMainToUse]);
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
    const toggleIsVideoPlaying = useCallback((state?: boolean) => {
        isVideoStateChangeInitiatedInternallyRef.current = true;
        if (state) {
            setIsVideoPlaying(state);
        } else {
            setIsVideoPlaying((current) => current);
        }
    }, [isVideoStateChangeInitiatedInternallyRef, setIsVideoPlaying]);

    const playVideo = useCallback(() => {
        if (videoRef.current) {
            if (getIsVideoPlaying(videoRef.current)) {
                videoRef.current?.pause();
                toggleIsVideoPlaying(false);
            } else {
                videoRef.current?.play();
                toggleIsVideoPlaying(true);
            }
        }
    }, [toggleIsVideoPlaying])

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
        toggleIsVideoPlaying(false);
    }, [toggleIsVideoPlaying])
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
        setCurrentVideoCurrentTime(CURRENT_VIDEO_CURRENT_TIME_DEFAULT);
        if (videoRef.current?.load) {
            videoRef.current.load();
        }
    }, [currentItemIndex, srcMain, videoRef, videoProps?.autoPlay, setCurrentVideoCurrentTime])

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = currentVideoCurrentTime;
        }
    }, [currentVideoCurrentTime])

    useEffect(() => {
        function handleFullscreenChange(e: Event) {
            setCurrentVideoCurrentTime(videoRef.current?.currentTime || CURRENT_VIDEO_CURRENT_TIME_DEFAULT);
            if (!isFullscreenMode) return;
            playVideo();
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
    }, [isFullscreenMode, playVideo, setCurrentVideoCurrentTime, setIsVideoPlaying])

    useEffect(() => {
        if (isVideoStateChangeInitiatedInternallyRef.current) return;
        playVideo();
    }, [isVideoPlaying, isVideoStateChangeInitiatedInternallyRef, playVideo])
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
                    itemContainerHeight={itemContainerHeight}
                    percent={percent}
                    srcMain={srcMain}
                    type={type}
                />
                <video
                    controls={optionsLogic.useDefaultVideoControls}
                    draggable={false}
                    className={`${getClassname({ elementName: 'video' })} ${isLoaded ? '' : CLASSNAME__HIDDEN}`}
                    style={stylingLogic.getCarouselVideoStyle(!!isProgressBarMouseDownRef.current, itemContainerHeight)}
                    ref={videoRef as any}
                    autoPlay={autoPlay}
                    muted={muted}
                    loop={loop}
                    onLoadedData={handleOnLoadedData}
                    onPlay={() => toggleIsVideoPlaying(true)}
                    onEnded={() => toggleIsVideoPlaying(false)}
                >
                    <source src={srcMainToUse} type={`video/${type}`} />
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
                toggleIsVideoPlaying={toggleIsVideoPlaying}
                setSeekPercent={setSeekPercent}
                videoRef={videoRef}
            />
            <CarouselVideoProgressBarScreenshotViewerMemoized
                currentVideoSection={currentVideoSection}
                percent={isProgressBarMouseDownRef.current ? percent : seekPercent}
                srcMain={srcMain}
                toolbarRef={itemViewerToolbarRef as any}
                type={type}
                videoRef={videoRef}
            />
        </>
    );
    //#endregion
}