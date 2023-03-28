import React, { useRef, useState } from 'react'
import { CarouselItemProps } from './CarouselItem'
import { CarouselVideoOverlay as CarouselVideoOverlay, CarouselVideoOverlayProps } from './CarouselVideoOverlay'
import { CssStyles } from './types';
import { getClassname } from './utils';

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
        srcThumbnail,
        videoProps,
    } = props;
    console.log({props});
    
    const { autoPlay, loop, muted } = videoProps || {};
    const videoRef = useRef<HTMLVideoElement>(null);
    const type = srcMain?.slice(srcMain?.lastIndexOf('.') + 1);

    //todo: this may not work
    const [progressBarValue, setProgressBarValue] = useState(0);
    //#endregion

    //#region Functions/Handlers
    function getPercentOfProgressBar(progressBar: HTMLProgressElement, clientX: number) {
        const progressBarBoundingRect = progressBar.getBoundingClientRect();
        const progressBarLeftX = progressBarBoundingRect.left;
        const progressBarRightX = progressBarBoundingRect.right;
        const amountPastLeft = (clientX - progressBarLeftX);
        const percent = amountPastLeft / (progressBarRightX - progressBarLeftX);
        return percent;
    }

    function onProgressBarClick(e: MouseEvent) {
        const clientX = e.clientX;
		const progressBar = e.currentTarget as HTMLProgressElement;
		if (!progressBar) return;

		const progressBarBoundingRect = progressBar.getBoundingClientRect();
        const progressBarLeftX = progressBarBoundingRect.left;
        const progressBarRightX = progressBarBoundingRect.right;
        const amountPastLeft = (clientX - progressBarLeftX);
        const percent = amountPastLeft / (progressBarRightX - progressBarLeftX);

        console.log({percent});
        setProgressBarValue(percent);

        //todo: what needs to happen here if anything?
		const video = videoRef.current;
		// if (!video) return;
		// video.currentTime = percent * video.duration;
		// if ((video as any).parentNode.classList.contains(DONE_CLASSNAME)) {
		// 	(video as any).parentNode.classList.remove(DONE_CLASSNAME);
		// 	(video as any).parentNode.classList.add(STOPPED_CLASSNAME);
		// }
    }
    //#endregion
    
    //#region JSX
    return (
        <div className={getClassname({ elementName: 'video-container'})}>
        <>
            <video
                className={getClassname({ elementName: 'video'})}
                ref={videoRef} 
                autoPlay={!!autoPlay} 
                muted={!!muted}
                loop={!!loop}>
                <source src={props.srcMain} type={`video/${type}`} />
            </video>
            <progress
                className={getClassname({ elementName: 'video-progress'})}
                onClick={onProgressBarClick as any}
                value={progressBarValue}
            />
            <CarouselVideoOverlay {...props.videoProps?.overlayProps}/>
        </>
        </div>
    );
    //#endregion
}