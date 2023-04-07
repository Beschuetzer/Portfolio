import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { NextButton } from '../../buttons/NextButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';

type CarouselItemViewerNextButtonProps = {
    onClick: () => void;
}
export const CarouselItemViewerNextButton = forwardRef<HTMLDivElement, CarouselItemViewerNextButtonProps>(({
    onClick,
}, ref) => {
    const { currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.nextButton || '';

    return (
        <div ref={ref}>
            {
                !!svgHref ?
                    <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref} /> :
                    <NextButton onClick={onClick} />
            }
        </div>
    )
})