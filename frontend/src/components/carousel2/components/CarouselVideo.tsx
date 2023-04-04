import React, { useRef } from 'react'
import { getClassname } from '../utils';
import { CarouselItemProps } from './CarouselItem'
import { CarouselVideoOverlay as CarouselVideoOverlay, CarouselVideoOverlayProps } from './CarouselVideoOverlay'
import { CarouselItemViewerToolbar } from './item-viewer/CarouselItemViewerToolbar';

export type CarouselVideoProps = {
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    overlayProps: CarouselVideoOverlayProps;
}

export const CarouselVideo = (props: CarouselItemProps) => {
    //#region Init
    const {
        description,
        srcMain,
        videoProps,
    } = props;
    const { autoPlay, loop, muted } = videoProps || {};
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
                    onChange={(e) => console.log(e)}
                    />
                </video>
                <CarouselVideoOverlay {...props.videoProps?.overlayProps} />
                <CarouselItemViewerToolbar 
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