import { useEffect, useRef, useState } from 'react'
import { getClassname } from '../utils';
import { CarouselItemProps } from './CarouselItem'
import { CarouselVideoOverlay } from './CarouselVideoOverlay'
import { CarouselItemViewerToolbar } from './item-viewer/toolbar/CarouselItemViewerToolbar';
import { LoadingSpinner } from './LoadingSpinner';

export type CarouselVideoProps = {
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    overlayProps?: CarouselVideoOverlay;
}

export const CarouselVideo = (props: CarouselItemProps) => {
    //#region Init
    const {
        description,
        srcMain,
        video: videoProps,
    } = props;
    const { autoPlay, loop, muted } = videoProps || {};
    const [isVideoPlaying, setIsVideoPlaying] = useState(!!autoPlay || false);
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>();
    const videoContainerRef = useRef<HTMLDivElement>();
    const type = srcMain?.slice(srcMain?.lastIndexOf('.') + 1);
    //#endregion

    //#region Functions/Handlers
    function onVideoClick() {
        if (videoRef.current) {
            if (isVideoPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
        setIsVideoPlaying((isPlaying) => !isPlaying);
    }
    //#endregion

    //#region SideFx
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.onloadeddata = () => {
                setIsLoaded(true);
            }
        }
    }, [])

    //#endregion

    //#region JSX    
    return (
        <div
            ref={videoContainerRef as any}
            className={getClassname({ elementName: 'item-container' })}
            onClick={onVideoClick}
        >
            <>
                {!isLoaded && isVideoPlaying ? <LoadingSpinner type='spinner' show={true} description={description} /> : null}
                <video
                    className={getClassname({ elementName: 'video' })}
                    ref={videoRef as any}
                    autoPlay={!!autoPlay}
                    muted={!!muted}
                    loop={!!loop}>
                    <source src={props.srcMain} type={`video/${type}`}
                    />
                </video>
                {props.video?.overlayProps ? (
                    <CarouselVideoOverlay
                        isVideoPlaying={isVideoPlaying}
                        {...props.video?.overlayProps}
                    />
                ) : null}
                <CarouselItemViewerToolbar
                    setIsVideoPlaying={setIsVideoPlaying}
                    isVideoPlaying={isVideoPlaying}
                    isVideo={true}
                    description={description || ''}
                    videoRef={videoRef}
                    itemContainerRef={videoContainerRef}
                />
            </>
        </div>
    );
    //#endregion
}