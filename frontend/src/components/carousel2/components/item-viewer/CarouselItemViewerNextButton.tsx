import React, { useCallback } from 'react'
import { EMPTY_STRING } from '../../constants';
import { useCarouselContext } from '../../context';
import { NextButton } from '../buttons/NextButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';

export const CarouselItemViewerNextButton = () => {
    const { setCurrentItemSrc, currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.nextButton || '';

    const onClick = useCallback(() => {
        
    }, [setCurrentItemSrc, EMPTY_STRING]);

    return !!svgHref ? 
        <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref}/> :
        <NextButton onClick={onClick}/>
}