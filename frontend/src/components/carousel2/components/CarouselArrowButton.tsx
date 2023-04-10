import { useCarouselContext } from '../context';
import { CarouselItemViewerCustomButton } from './item-viewer/toolbar/CarouselItemViewerCustomButton';
import { ArrowProps, CarouselSvgHrefs } from '../types';
import { ArrowButton } from './buttons/ArrowButton';

type CarouselArrowButtonProps = {
  onClick: () => void;
  svgHrefs: CarouselSvgHrefs;
} & ArrowProps

export const CarouselArrowButton = ({
  direction,
  onClick,
  svgHrefs
}: CarouselArrowButtonProps) => {
  let svgHref = svgHrefs?.arrowRightButton || {};
  if (direction === 'left') {
    svgHref = svgHrefs?.arrowLeftButton || {}
  }
  
  return !!svgHref?.svgHref ? 
      <CarouselItemViewerCustomButton fillColor={svgHref.fillColor} onClick={onClick} xlinkHref={svgHref.svgHref}/> :
      <ArrowButton fillColor={svgHref.fillColor} direction={direction} onClick={onClick}/>
}