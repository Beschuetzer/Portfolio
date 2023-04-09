import React, { useCallback } from 'react'
import { EMPTY_STRING } from '../../../constants';
import { useCarouselContext } from '../../../context';
import { StopButton } from '../../buttons/StopButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';

export const CarouselItemViewerStopButton = () => {
    const { currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.itemViewer?.stopButton || '';

    const onClick = useCallback(() => {

    }, [EMPTY_STRING]);

    return !!svgHref ? 
        <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref}/> :
        <StopButton onClick={onClick}/>
}