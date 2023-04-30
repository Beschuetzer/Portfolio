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
    const itemContainerRef = useRef<HTMLDivElement>();
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
        setIsLoaded(true);
        if (autoPlay) {
            tryPlaying();
        }
    }

    const onContainerClick = useCallback(() => {
        setIsVideoPlaying((isPlaying) => !isPlaying);
    }, [setIsVideoPlaying]);

    
    const tryPlaying = useCallback(() => {
        tryPlayingVideo(
            videoRef.current,
            () => setIsVideoPlaying(true),
            () => setIsVideoPlaying(false),
        )
    }, [tryPlayingVideo, setIsVideoPlaying, videoRef])
    //#endregion

    //#region Side Fx
    useEffect(() => {
        async function handlePlayPause() {
            if (videoRef.current) {
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
        setIsLoaded(false);
        if (videoRef.current?.load) {
            videoRef.current.load();
        }
        setIsVideoPlaying(!!videoProps?.autoPlay);
    }, [srcMain, videoRef])
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