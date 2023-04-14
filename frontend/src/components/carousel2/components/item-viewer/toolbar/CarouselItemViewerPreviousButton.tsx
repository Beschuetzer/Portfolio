import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { PreviousButton } from '../../buttons/PreviousButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';

type CarouselItemViewerPreviousButtonProps = {
    onClick: () => void;
}
export const CarouselItemViewerPreviousButton = forwardRef<any, CarouselItemViewerPreviousButtonProps>(({
    onClick,
}, ref) => {
    const { currentSvgs, toolbarLogic } = useCarouselContext();
    const svgHref = currentSvgs?.itemViewer?.previousButton || '';

    return (
        !!svgHref ?
            <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()} /> :
            <PreviousButton ref={ref} onClick={onClick} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()} />
    )
})
