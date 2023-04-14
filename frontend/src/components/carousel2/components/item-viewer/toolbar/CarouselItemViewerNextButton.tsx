import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { NextButton } from '../../buttons/NextButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';

type CarouselItemViewerNextButtonProps = {
    onClick: () => void;
}
export const CarouselItemViewerNextButton = forwardRef<any, CarouselItemViewerNextButtonProps>(({
    onClick,
}, ref) => {
    const { currentSvgs, toolbarLogic } = useCarouselContext();
    const svgHref = currentSvgs?.itemViewer?.nextButton || '';

    return (
        !!svgHref ?
            <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()} /> :
            <NextButton ref={ref} onClick={onClick} showButton={toolbarLogic.getShouldDisplayNextAndBackButton()}/>
    )
})