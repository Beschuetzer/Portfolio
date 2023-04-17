import { CLASSNAME__BUTTON } from '../constants'
import { PlayButton } from './buttons/PlayButton';
import { PauseButton } from './buttons/PauseButton';
import { useEffect, useState } from 'react';

type CarouselVideoCurrentStateIndicatorProps = {
    isVideoPlaying: boolean;
}

export const CarouselVideoCurrentStateIndicator = ({
    isVideoPlaying,
}: CarouselVideoCurrentStateIndicatorProps) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsAnimating(true);
    }, [isVideoPlaying])

    //#region JSX
    const className = `${CLASSNAME__BUTTON}--video-state-indicator`;
    const isAnimatingClassName = isAnimating ? `${CLASSNAME__BUTTON}--video-state-indicator-is-animating` : '';
    return (
        <div onAnimationIteration={() => setIsAnimating(false)} className={`${className} ${isAnimatingClassName}`}>
            {!isVideoPlaying ? 
                <PauseButton onClick={() => null} />
            : (
                <PlayButton onClick={() => null}/>
            )}
        </div>
    )
    //#endregion
}