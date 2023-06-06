import { CLASSNAME__BUTTON } from '../constants'
import { PlayButton } from './buttons/PlayButton';
import { PauseButton } from './buttons/PauseButton';
import { useEffect, useRef, useState } from 'react';
import { useBusinessLogic } from '../hooks/useBusinessLogic';

type CarouselVideoCurrentStateIndicatorProps = {
    isVideoPlaying: boolean;
}

export const CarouselVideoCurrentStateIndicator = ({
    isVideoPlaying,
}: CarouselVideoCurrentStateIndicatorProps) => {
    const { stylingLogic } = useBusinessLogic({});
    const [isAnimating, setIsAnimating] = useState(!isVideoPlaying);
    const timeoutRef = useRef<any>(-1);

    useEffect(() => {
        setIsAnimating(false);
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            setIsAnimating(true);
        }, 50)
    }, [isVideoPlaying, setIsAnimating])

    //#region JSX
    const className = `${CLASSNAME__BUTTON}--video-state-indicator`;
    const isAnimatingClassName = isAnimating ? `${CLASSNAME__BUTTON}--video-state-indicator-is-animating` : '';

    return (
        <div onAnimationEnd={() => setIsAnimating(false)} className={`${className} ${isAnimatingClassName}`}>
            {!isVideoPlaying ?
                <PauseButton style={ stylingLogic.carouselVideoCurrentStateIndicatorButtonStyle } onClick={() => null} />
                : (
                    <PlayButton style={ stylingLogic.carouselVideoCurrentStateIndicatorButtonStyle } onClick={() => null} />
                )}
        </div>
    )
    //#endregion
}