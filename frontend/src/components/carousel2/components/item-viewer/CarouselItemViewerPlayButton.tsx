import React from 'react'
import { PlayButton } from '../buttons/PlayButton';
import { useCarouselContext } from '../../context';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';

type CarouselItemViewerPlayButtonProps = {
    onClick: () => void,
}
export const CarouselItemViewerPlayButton = ({
    onClick,
}: CarouselItemViewerPlayButtonProps) => {
    const { setCurrentItemSrc, currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.playButton || '';

    return !!svgHref ? 
        <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref}/> :
        <PlayButton onClick={onClick}/>
}