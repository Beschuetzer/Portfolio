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
    const { currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.nextButton || '';

    return (
        !!svgHref ?
            <CarouselItemViewerCustomButton ref={ref} onClick={onClick} xlinkHref={svgHref} /> :
            <NextButton ref={ref} onClick={onClick} />
    )
})