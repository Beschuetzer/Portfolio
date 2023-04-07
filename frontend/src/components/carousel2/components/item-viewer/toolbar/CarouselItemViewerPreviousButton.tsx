import { forwardRef } from 'react';
import { useCarouselContext } from '../../../context';
import { PreviousButton } from '../../buttons/PreviousButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';

type CarouselItemViewerPreviousButtonProps = {
    onClick: () => void;
}
export const CarouselItemViewerPreviousButton = forwardRef<HTMLDivElement, CarouselItemViewerPreviousButtonProps>(({
    onClick,
}, ref) => {
    const { currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.previousButton || '';

    return (
        <div ref={ref}>
            {
                !!svgHref ?
                    <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref} /> :
                    <PreviousButton onClick={onClick} />
            }
        </div>
    )
})
