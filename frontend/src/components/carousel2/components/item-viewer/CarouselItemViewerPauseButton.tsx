import React, { useCallback } from 'react'
import { EMPTY_STRING } from '../../constants';
import { useCarouselContext } from '../../context';
import { PauseButton } from '../buttons/PauseButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';

type CarouselItemViewerPauseButtonProps = {
    onClick: () => void,
}
export const CarouselItemViewerPauseButton = ({
    onClick
}: CarouselItemViewerPauseButtonProps) => {
    const { currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.pauseButton || '';

    return !!svgHref ? 
    <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref}/> :
    <PauseButton onClick={onClick}/>
}