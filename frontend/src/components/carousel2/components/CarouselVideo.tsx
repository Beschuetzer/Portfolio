import React, { useRef, useState } from 'react'
import { getClassname } from '../utils';
import { CarouselItemProps } from './CarouselItem'
import { CarouselVideoOverlay } from './CarouselVideoOverlay'
import { CarouselItemViewerToolbar } from './item-viewer/CarouselItemViewerToolbar';

export type CarouselVideoProps = {
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    overlayProps: CarouselVideoOverlay;
}

export const CarouselVideo = (props: CarouselItemProps) => {
    //#region Init
    const {
        description,
        srcMain,
        videoProps,
    } = props;
    const { autoPlay, loop, muted } = videoProps || {};
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>();
    const videoContainerRef = useRef<HTMLDivElement>();
    const type = srcMain?.slice(srcMain?.lastIndexOf('.') + 1);
    //#endregion

    //#region Functions/Handlers
    //#endregion

    //#region SideFx
    //#endregion

    //#region JSX    
    return (
        <div ref={videoContainerRef as any} className={getClassname({ elementName: 'item-container' })}>
            <>
                <video
                    className={getClassname({ elementName: 'video' })}
                    ref={videoRef as any}
                    autoPlay={!!autoPlay}
                    muted={!!muted}
                    loop={!!loop}>
                    <source src={props.srcMain} type={`video/${type}`}
                />
                </video>
                <CarouselVideoOverlay 
                    isVideoPlaying={isVideoPlaying}
                    {...props.videoProps?.overlayProps} 
                />
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