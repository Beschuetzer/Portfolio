import { CLASSNAME__BUTTON } from '../constants'
import { useEffect, useRef, useState } from 'react';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { CarouselItemViewerToolbarProps } from './item-viewer/toolbar/CarouselItemViewerToolbar';
import { PauseButton } from './buttons/PauseButton';
import { PlayButton } from './buttons/PlayButton';

type CarouselVideoCurrentStateIndicatorProps = {
    isVideoPlaying?: boolean,
} & Pick<CarouselItemViewerToolbarProps, 'videoRef'>;

export const CarouselVideoCurrentStateIndicator = ({
    isVideoPlaying,
}: CarouselVideoCurrentStateIndicatorProps) => {
    const { stylingLogic } = useBusinessLogic({});
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