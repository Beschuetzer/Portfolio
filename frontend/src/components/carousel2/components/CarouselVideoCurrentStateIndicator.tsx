import { CLASSNAME__BUTTON } from '../constants'
import { useEffect, useMemo, useRef, useState } from 'react';
import { useBusinessLogic } from '../hooks/useBusinessLogic';
import { StylingLogic } from '../business-logic/StylingLogic';
import { CarouselVideoCurrentStateIndicatorPlayButton } from './CarouselVideoCurrentStateIndicatorPlayButton';
import { CarouselVideoCurrentStateIndicatorPauseButton } from './CarouselVideoCurrentStateIndicatorPauseButton';

type CarouselVideoCurrentStateIndicatorProps = {
    isVideoPlaying: boolean;
}

export const CarouselVideoCurrentStateIndicator = (props: CarouselVideoCurrentStateIndicatorProps) => {
    const {
        isVideoPlaying,
    } = props;
    const { stylingLogic, optionsLogic } = useBusinessLogic();
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
    const isAnimatingClassName = isAnimating && !optionsLogic.useDefaultVideoControls
        ? `${CLASSNAME__BUTTON}--video-state-indicator-is-animating`
        : '';
    const backgroundColorStyle = useMemo(() => StylingLogic.getColorStyle(
        optionsLogic.videoCurrentStateIndicatorBackgroundColor,
        'backgroundColor'
    ), [optionsLogic.videoCurrentStateIndicatorBackgroundColor]);

    return (
        <div
            style={{
                ...stylingLogic.carouselVideoCurrentStateIndicatorContainerStyle,
                ...backgroundColorStyle,
            }}
            onAnimationEnd={() => setIsAnimating(false)} className={`${className} ${isAnimatingClassName}`}
        >
            {!isVideoPlaying ?
                <CarouselVideoCurrentStateIndicatorPauseButton /> :
                <CarouselVideoCurrentStateIndicatorPlayButton />
            }
        </div>
    )
    //#endregion
}