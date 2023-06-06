import { CLASSNAME__BUTTON } from '../constants'
import { PlayButton } from './buttons/PlayButton';
import { PauseButton } from './buttons/PauseButton';
import { useEffect, useRef, useState } from 'react';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { CarouselItemViewerToolbarProps } from './item-viewer/toolbar/CarouselItemViewerToolbar';
import { getIsVideoPlaying } from '../utils';
import { current } from '@reduxjs/toolkit';

type CarouselVideoCurrentStateIndicatorProps = {} & Pick<CarouselItemViewerToolbarProps, 'videoRef'>;

export const CarouselVideoCurrentStateIndicator = ({
    videoRef,
}: CarouselVideoCurrentStateIndicatorProps) => {
    const { stylingLogic } = useBusinessLogic({});
    const isVideoPlaying = getIsVideoPlaying(videoRef?.current);
    const [isAnimating, setIsAnimating] = useState(isVideoPlaying);
    // const [shouldRerender, setShouldRerender] = useState(false);
    const timeoutRef = useRef<any>(-1);

    useEffect(() => {
        setIsAnimating(false);
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            setIsAnimating(true);
        }, 50)
    }, [setIsAnimating])

    // useEffect(() => {
        
    //     const isVideoPlayingLocal = getIsVideoPlaying(videoRef?.current);
    //     setIsAnimating(isVideoPlayingLocal);
    //     setShouldRerender((current) => !current);
    // }, [isVideoPlaying, videoRef, videoRef?.current?.paused])

    //#region JSX
    const className = `${CLASSNAME__BUTTON}--video-state-indicator`;
    const isAnimatingClassName = isAnimating ? `${CLASSNAME__BUTTON}--video-state-indicator-is-animating` : '';

    return (
        <div onAnimationEnd={() => setIsAnimating(false)} className={`${className} ${isAnimatingClassName}`}>
            {isVideoPlaying ?
                <PauseButton style={ stylingLogic.carouselVideoCurrentStateIndicatorButtonStyle } onClick={() => null} />
                : (
                    <PlayButton style={ stylingLogic.carouselVideoCurrentStateIndicatorButtonStyle } onClick={() => null} />
                )}
        </div>
    )
    //#endregion
}