import React, { useCallback } from 'react'
import { EMPTY_STRING } from '../../constants';
import { useCarouselContext } from '../../context';
import { PreviousButton } from '../buttons/PreviousButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';

export const CarouselItemViewerPreviousButton = () => {
    const { setCurrentItemSrc, currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.previousButton || '';

    const onClick = useCallback(() => {
        
    }, [setCurrentItemSrc, EMPTY_STRING]);

    return !!svgHref ? 
        <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref}/> :
        <PreviousButton onClick={onClick}/>
}