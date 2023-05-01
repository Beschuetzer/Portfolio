import { useCallback, useEffect, useRef, useState } from 'react'
import { getClassname, tryPlayingVideo } from '../utils';
import { CarouselItemProps } from './CarouselItem'
import { CarouselVideoModal } from './CarouselVideoModal'
import { CarouselItemViewerToolbar } from './item-viewer/toolbar/CarouselItemViewerToolbar';
import { LoadingSpinner } from './LoadingSpinner';
import { CLASSNAME__HIDDEN } from '../constants';
import { CarouselVideoCurrentStateIndicator } from './CarouselVideoCurrentStateIndicator';
import { CarouselItemViewerContainer } from './item-viewer/toolbar/CarouselItemViewerContainer';
import { useCarouselInstanceContext } from './CarouselInstanceProvider';
import { StylingLogic } from '../business-logic/StylingLogic';

export type CarouselVideoProps = {
    /*
    * If true, the video will start playing when it first comes into focus 
    * e.g. when user scrolls down to it or when the user clicks the thumbnail to load it
    */
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    objectFit?: React.CSSProperties["objectFit"];
    objectPosition?: React.CSSProperties["objectPosition"];
    overlayProps?: CarouselVideoModal;
}

export const CarouselVideo = (props: CarouselItemProps) => {
    //#region Init
    const {
        description,
        srcMain,
        video: videoProps,
    } = props;
    const { options, itemViewerToolbarRef, currentItemInInstance } = useCarouselInstanceContext();
    const { autoPlay, loop, muted } = videoProps || {};
    const [isVideoPlaying, setIsVideoPlaying] = useState(!!autoPlay || false);
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>();
    const isProgressBarClickRef = useRef(false);
    const itemContainerRef = useRef<HTMLDivElement>();
    const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
    const type = srcMain?.slice(srcMain?.lastIndexOf('.') + 1);
    const stylingLogic = new StylingLogic({ options, itemViewerToolbarRef, currentItemInInstance });
    //#endregion

    //#region Functions/Handlers
    const handleItemNavigation = useCallback(() => {
        setIsLoaded(false);
        setIsVideoPlaying(false);

        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [setIsLoaded, setIsVideoPlaying, videoRef]);

    function handleOnLoadedData() {
        console.log("handleOnLoadedData");

        setIsLoaded(true);
        if (autoPlay) {
            tryPlaying();
        }
    }

    const onContainerClick = useCallback(() => {
        console.log("onContainerClick");
        setHasEnteredViewport(true);
        setIsVideoPlaying((isPlaying) => !isPlaying);
    }, [setIsVideoPlaying]);

    
    const tryPlaying = useCallback(() => {
        if (!hasEnteredViewport) return;
        console.log("tryPlaying");
        tryPlayingVideo(
            videoRef.current,
            () => setIsVideoPlaying(true),
            () => setIsVideoPlaying(false),
        )
    }, [tryPlayingVideo, setIsVideoPlaying, videoRef, hasEnteredViewport])
    //#endregion

    //#region Side Fx
    useEffect(() => {
        async function handlePlayPause() {
            if (videoRef.current) {
            console.log("handlePlayPause and isPlaying: " + isVideoPlaying);
            console.log({isProgressBarClickRef: isProgressBarClickRef.current});
            if (isProgressBarClickRef.current) {
                isProgressBarClickRef.current = false;
                tryPlaying();
                return;
            }
            if (!isVideoPlaying) {
                    videoRef.current.pause();
                } else {
                    tryPlaying();
                }
            }
        }

        handlePlayPause();
    }, [isVideoPlaying, videoRef, tryPlaying])

    //triggering a load event (https://stackoverflow.com/questions/41303012/updating-source-url-on-html5-video-with-react)
    useEffect(() => {
        console.log("triggering load event");
        setIsLoaded(false);
        if (videoRef.current?.load) {
            videoRef.current.load();
        }
        setIsVideoPlaying(!!videoProps?.autoPlay);
    }, [srcMain, videoRef])

    //track whether video is in user's view
    useEffect(() => {
        console.log("handleScroll");
        function handleScroll() {
            if (!videoRef.current) return;

            const OFFSET_AMOUNT = window.innerHeight / 8;
            const videoBoundingRect = videoRef.current.getBoundingClientRect();
            const viewPortMiddle =  window.innerHeight / 2;
            const videoMiddle = videoBoundingRect.top + (videoBoundingRect.height / 2);
            const isVideoAroundCenterOfViewport = Math.abs(videoMiddle - viewPortMiddle) <= OFFSET_AMOUNT;
            if (isVideoAroundCenterOfViewport) {
                setHasEnteredViewport(true);
            }
        }

        function handleVideoEnd() {
            setIsVideoPlaying(false);
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }

        handleScroll(); //check on load if is in viewport
        window.addEventListener('scroll', handleScroll);

        if (videoRef?.current) {
            videoRef.current.addEventListener('ended', handleVideoEnd);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (videoRef?.current) {
                videoRef.current.removeEventListener('ended', handleVideoEnd);
            }
        }
    }, [])

    //start playing video when when visible
    useEffect(() => {
        if (!autoPlay) return;
        console.log("start playing video when visible");
        tryPlaying();
    }, [hasEnteredViewport, autoPlay])
    //#endregion

    //#region JSX   
    return (
        <CarouselItemViewerContainer ref={itemContainerRef} onClick={onContainerClick}>
            <div style={stylingLogic.carouselVideoContainerStyle}>
                <CarouselVideoCurrentStateIndicator isVideoPlaying={isVideoPlaying} />
                <LoadingSpinner
                    type='ring'
                    show={!isLoaded}
                    description={description}
                    {...options?.styling?.itemViewer?.loadingSpinner}
                />
                <video
                    className={`${getClassname({ elementName: 'video' })} ${isLoaded ? '' : CLASSNAME__HIDDEN}`}
                    style={stylingLogic.carouselVideoStyle}
                    ref={videoRef as any}
                    autoPlay={!!autoPlay}
                    muted={!!muted}
                    loop={!!loop}
                    onLoadedData={handleOnLoadedData}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
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
                isProgressBarClickRef={isProgressBarClickRef}
                setIsVideoPlaying={setIsVideoPlaying}
                isVideoPlaying={isVideoPlaying}
                isVideo={true}
                description={description || ''}
                videoRef={videoRef}
                itemContainerRef={itemContainerRef}
                onNextItemClick={handleItemNavigation}
                onPreviousItemClick={handleItemNavigation}
            />
        </CarouselItemViewerContainer>
    );
    //#endregion
}