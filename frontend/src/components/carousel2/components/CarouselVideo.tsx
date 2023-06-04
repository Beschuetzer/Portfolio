import { useCallback, useEffect, useRef, useState } from 'react'
import { getClassname, tryPlayingVideo } from '../utils';
import { CarouselItemProps } from './CarouselItem'
import { CarouselVideoModal, CarouselVideoModalProps } from './CarouselVideoModal'
import { CarouselItemViewerToolbar, CarouselItemViewerToolbarProps } from './item-viewer/toolbar/CarouselItemViewerToolbar';
import { LoadingSpinner } from './LoadingSpinner';
import { CLASSNAME__HIDDEN, CURRENT_VIDEO_CURRENT_TIME_DEFAULT } from '../constants';
import { CarouselVideoCurrentStateIndicator } from './CarouselVideoCurrentStateIndicator';
import { useCarouselContext } from '../context';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { useRerenderOnExitFullscreenMode } from '../hooks/useRerenderOnExitFullscreenMode';

export type CarouselVideoProps = {
    /*
    * If true and muted is undefined or true, the video will start playing when it first comes into focus 
    * e.g. when user scrolls down to it or when the user clicks the thumbnail to load it
    */
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    objectFit?: React.CSSProperties["objectFit"];
    objectPosition?: React.CSSProperties["objectPosition"];
    overlayProps?: CarouselVideoModalProps;
};

export const CarouselVideo = (props: CarouselItemProps & Pick<CarouselItemViewerToolbarProps, 'itemContainerRef'>) => {
    //#region Init
    const {
        description,
        itemContainerRef,
        srcMain,
        video: videoProps,
    } = props;
    const { options, isFullscreenMode, currentVideoCurrentTime, setIsFullscreenMode, setCurrentVideoCurrentTime } = useCarouselContext();

    const { autoPlay, loop, muted } = videoProps || {};
    const [isVideoPlaying, setIsVideoPlaying] = useState(!!autoPlay || false);
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>();
    const itemViewerToolbarRef = useRef<HTMLElement>();
    const [hasClickedContainer, setHasClickedContainer] = useState(false);
    const type = srcMain?.slice(srcMain?.lastIndexOf('.') + 1);
    const { stylingLogic } = useBusinessLogic({ itemViewerToolbarRef });
    useRerenderOnExitFullscreenMode();
    //#endregion

    //#region Functions/Handlers
    const handleItemNavigation = useCallback(() => {
        setIsLoaded(false);
        setIsVideoPlaying(false);

        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        if (videoRef.current?.load) {
            videoRef.current.load();
        }
    }, [setIsLoaded, setIsVideoPlaying, videoRef]);

    function handleOnLoadedData() {
        setIsLoaded(true);
        setIsVideoPlaying(!!videoProps?.autoPlay);
    }

    const onVideoClick = useCallback((e: MouseEvent) => {
        if (e.detail === 2) {
            setIsFullscreenMode((current) => !current);
            setCurrentVideoCurrentTime(videoRef.current?.currentTime || CURRENT_VIDEO_CURRENT_TIME_DEFAULT);
        } else {
            setHasClickedContainer(true);
            setIsVideoPlaying((isPlaying) => !isPlaying);    
        }
    }, [setCurrentVideoCurrentTime, setIsFullscreenMode]);

    const tryPlaying = useCallback(() => {
        if (!hasClickedContainer) return;
        tryPlayingVideo(
            videoRef.current,
            () => setIsVideoPlaying(true),
            () => setIsVideoPlaying(false),
        )
    }, [setIsVideoPlaying, videoRef, hasClickedContainer])
    //#endregion

    //#region Side Fx
    useEffect(() => {
        async function handlePlayPause() {
            if (!isLoaded) return;
            if (videoRef.current) {
                if (!isVideoPlaying) {
                    videoRef.current.pause();
                } else {
                    tryPlaying();
                }
            }
        }

        handlePlayPause();
    }, [isVideoPlaying, videoRef, tryPlaying, isLoaded])

    //triggering a load event (https://stackoverflow.com/questions/41303012/updating-source-url-on-html5-video-with-react)
    useEffect(() => {
        setIsLoaded(false);
        if (videoRef.current?.load) {
            videoRef.current.load();
        }
        setIsVideoPlaying(!!videoProps?.autoPlay);
    }, [srcMain, videoRef, videoProps?.autoPlay])

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = currentVideoCurrentTime;
            if (isFullscreenMode) return;
            tryPlaying();
        }
    }, [currentVideoCurrentTime, isFullscreenMode, tryPlaying])

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
        }
    }, [])
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
                <video
                    draggable={false}
                    className={`${getClassname({ elementName: 'video' })} ${isLoaded ? '' : CLASSNAME__HIDDEN}`}
                    style={stylingLogic.carouselVideoStyle}
                    ref={videoRef as any}
                    autoPlay={!!autoPlay}
                    muted={!!muted}
                    loop={!!loop}
                    onClick={onVideoClick as any}
                    onLoadedData={handleOnLoadedData}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    onEnded={() => setIsVideoPlaying(false)}
                >
                    <source src={srcMain} type={`video/${type}`} />
                </video>
                {props.video?.overlayProps ? (
                    <CarouselVideoModal
                        videoRef={videoRef}
                        isVideoPlaying={isVideoPlaying}
                        {...props.video?.overlayProps}
                    />
                ) : null}
            </div>
            <CarouselItemViewerToolbar
                ref={itemViewerToolbarRef as any}
                setIsVideoPlaying={setIsVideoPlaying}
                isVideoPlaying={isVideoPlaying}
                isVideo={true}
                description={description || ''}
                videoRef={videoRef}
                itemContainerRef={itemContainerRef}
                onNextItemClick={handleItemNavigation}
                onPreviousItemClick={handleItemNavigation}
            />
        </>
    );
    //#endregion
}