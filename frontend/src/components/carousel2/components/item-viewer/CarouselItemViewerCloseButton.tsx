import React, { useCallback } from 'react'
import { CloseButton } from '../buttons/CloseButton';
import { useCarouselInstanceContext } from '../CarouselInstanceProvider';
import { EMPTY_STRING } from '../../constants';
import { useCarouselContext } from '../../context';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';

export const CarouselItemViewerCloseButton = () => {
    const { setCurrentItemSrc, currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.closeButton || '';

    const onClick = useCallback(() => {
        setCurrentItemSrc(EMPTY_STRING);
    }, [setCurrentItemSrc, EMPTY_STRING]);

    return !!svgHref ? 
        <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref}/> :
        <CloseButton onClick={onClick}/>
}