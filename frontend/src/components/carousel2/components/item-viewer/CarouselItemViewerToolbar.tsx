import React, { useState } from 'react'
import { CLASSNAME__ITEM_VIEWER } from '../../constants'
import { getClassname } from '../../utils'
import { CarouselItemViewerCloseButton } from './CarouselItemViewerCloseButton'
import { CarouselItemViewerNextButton } from './CarouselItemViewerNextButton'
import { CarouselItemViewerPauseButton } from './CarouselItemViewerPauseButton'
import { CarouselItemViewerPlayButton } from './CarouselItemViewerPlayButton'
import { CarouselItemViewerPreviousButton } from './CarouselItemViewerPreviousButton'
import { CarouselItemViewerRestartButton } from './CarouselItemViewerRestartButton'
import { CarouselItemViewerSeekBackButton } from './CarouselItemViewerSeekBackButton'
import { CarouselItemViewerSeekForwardButton } from './CarouselItemViewerSeekForwardButton'
import { CarouselItemViewerStopButton } from './CarouselItemViewerStopButton'

type CarouselItemViewerToolbarProps = {
    videoRef: React.RefObject<HTMLVideoElement>;
}

const toolbarClassname = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar` })
const toolbarLeftClassname = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-left` })
const toolbarRightClassname = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-right` })
const toolbarMiddleClassname = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-middle` })
const innerContainerClassname = getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-button-container` })
export const CarouselItemViewerToolbar = ({
    videoRef
}: CarouselItemViewerToolbarProps) => {
    
    const [progressBarValue, setProgressBarValue] = useState(0);
    const [isPlayingVideo, setIsPlayingVideo] = useState(true)

    function onProgressBarClick(e: MouseEvent) {
        const clientX = e.clientX;
        const progressBar = e.currentTarget as HTMLProgressElement;
        if (!progressBar) return;

        const progressBarBoundingRect = progressBar.getBoundingClientRect();
        const progressBarLeftX = progressBarBoundingRect.left;
        const progressBarRightX = progressBarBoundingRect.right;
        const amountPastLeft = (clientX - progressBarLeftX);
        const percent = amountPastLeft / (progressBarRightX - progressBarLeftX);

        console.log({ percent });
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

    return (
        <div className={toolbarClassname}>
            <progress
                className={getClassname({ elementName: `${CLASSNAME__ITEM_VIEWER}-toolbar-progress` })}
                onClick={onProgressBarClick as any}
                value={progressBarValue}
            />
            <div className={innerContainerClassname}>
                <div className={toolbarLeftClassname}>
                    {isPlayingVideo ?
                        <CarouselItemViewerPlayButton />
                        :
                        <CarouselItemViewerPauseButton />
                    }
                    <CarouselItemViewerSeekBackButton />
                    <CarouselItemViewerSeekForwardButton />

                </div>
                <div className={toolbarMiddleClassname}>
                    <span>0:00 / 2:42:32</span>
                    <span>Description here...</span>
                </div>
                <div className={toolbarRightClassname}>
                    <CarouselItemViewerPreviousButton />
                    <CarouselItemViewerNextButton />
                    <CarouselItemViewerCloseButton />
                </div>
            </div>
        </div>
    )
}