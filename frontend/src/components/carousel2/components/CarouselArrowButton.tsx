import { useCarouselContext } from '../context';
import { CarouselItemViewerCustomButton } from './item-viewer/toolbar/CarouselItemViewerCustomButton';
import { ArrowProps } from '../types';
import { ArrowButton } from './buttons/ArrowButton';

type CarouselArrowButtonProps = {
  onClick: () => void;
} & ArrowProps

export const CarouselArrowButton = ({
  direction,
  onClick
}: CarouselArrowButtonProps) => {
  const { currentSvgHrefs } = useCarouselContext();
  let svgHref = currentSvgHrefs?.arrowRightButton || {};
  if (direction = 'left') {
    svgHref = currentSvgHrefs?.arrowLeftButton || {}
  }

  return !!svgHref?.svgHref ? 
      <CarouselItemViewerCustomButton fillColor={svgHref.fillColor} onClick={onClick} xlinkHref={svgHref.svgHref}/> :
      <ArrowButton fillColor={svgHref.fillColor} direction={direction} onClick={onClick}/>
}