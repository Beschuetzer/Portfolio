import React, { useCallback } from 'react'
import { EMPTY_STRING } from '../../constants';
import { useCarouselContext } from '../../context';
import { PauseButton } from '../buttons/PauseButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';

export const CarouselItemViewerPauseButton = () => {
    const { setCurrentItemSrc, currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.pauseButton || '';

    const onClick = useCallback(() => {
        
    }, [setCurrentItemSrc, EMPTY_STRING]);

    return !!svgHref ? 
    <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref}/> :
    <PauseButton onClick={onClick}/>
}