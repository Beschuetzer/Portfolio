import { useCarouselContext } from '../../context';
import { NextButton } from '../buttons/NextButton';
import { CarouselItemViewerCustomButton } from './CarouselItemViewerCustomButton';

type CarouselItemViewerNextButtonProps = {
    onClick: () => void;
}
export const CarouselItemViewerNextButton = ({onClick}: CarouselItemViewerNextButtonProps) => {
    const { currentSvgHrefs } = useCarouselContext();
    const svgHref = currentSvgHrefs?.nextButton || '';

    return !!svgHref ? 
        <CarouselItemViewerCustomButton onClick={onClick} xlinkHref={svgHref}/> :
        <NextButton onClick={onClick}/>
}