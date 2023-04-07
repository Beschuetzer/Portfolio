import React, { useCallback } from 'react'
import { EMPTY_STRING } from '../../../constants';
import { useCarouselContext } from '../../../context';
import { RestartButton } from '../../buttons/RestartButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';

export const CarouselItemViewerRestartButton = () => {
    const { currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.restartButton || '';

    const onClick = useCallback(() => {
        
    }, [EMPTY_STRING]);

    return !!svgHref ? 
    <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref}/> :
    <RestartButton onClick={onClick}/>
}