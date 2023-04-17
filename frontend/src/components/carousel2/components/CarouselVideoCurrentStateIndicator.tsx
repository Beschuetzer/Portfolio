import { CLASSNAME__BUTTON } from '../constants'
import { PlayButton } from './buttons/PlayButton';
import { PauseButton } from './buttons/PauseButton';
import { useEffect, useRef, useState } from 'react';

type CarouselVideoCurrentStateIndicatorProps = {
    isVideoPlaying: boolean;
}

export const CarouselVideoCurrentStateIndicator = ({
    isVideoPlaying,
}: CarouselVideoCurrentStateIndicatorProps) => {
    const [isAnimating, setIsAnimating] = useState(!isVideoPlaying);
    const timeoutRef = useRef<any>(-1);

    useEffect(() => {
        setIsAnimating(false);
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            setIsAnimating(true);
        }, 50)
    }, [isVideoPlaying])

    //#region JSX
    const className = `${CLASSNAME__BUTTON}--video-state-indicator`;
    const isAnimatingClassName = isAnimating ? `${CLASSNAME__BUTTON}--video-state-indicator-is-animating` : '';

    return (
        <div onAnimationEnd={() => setIsAnimating(false)} className={`${className} ${isAnimatingClassName}` }>
            {!isVideoPlaying ? 
                <PauseButton onClick={() => null} />
            : (
                <PlayButton onClick={() => null}/>
            )}
        </div>
    )
    //#endregion
}