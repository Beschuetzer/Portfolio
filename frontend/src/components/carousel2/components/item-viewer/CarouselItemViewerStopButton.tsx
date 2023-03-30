import React, { useCallback } from 'react'
import { EMPTY_STRING } from '../../constants';
import { useCarouselContext } from '../../context';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';
import { StopButton } from '../buttons/StopButton';

export const CarouselItemViewerStopButton = () => {
    const { setCurrentItemSrc, currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.stopButton || '';

    const onClick = useCallback(() => {

    }, [setCurrentItemSrc, EMPTY_STRING]);

    return !!svgHref ? 
        <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref}/> :
        <StopButton onClick={onClick}/>
}