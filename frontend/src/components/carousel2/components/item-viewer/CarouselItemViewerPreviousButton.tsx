import { useCarouselContext } from '../../context';
import { PreviousButton } from '../buttons/PreviousButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';

type CarouselItemViewerPreviousButtonProps = {
    onClick: () => void;
}
export const CarouselItemViewerPreviousButton = ({
    onClick,
}:CarouselItemViewerPreviousButtonProps) => {
    const { currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.previousButton || '';

    return !!svgHref ? 
        <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref}/> :
        <PreviousButton onClick={onClick}/>
}