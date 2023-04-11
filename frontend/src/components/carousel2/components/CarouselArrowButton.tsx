import { CarouselItemViewerCustomButton } from './item-viewer/toolbar/CarouselItemViewerCustomButton';
import { ArrowProps, CarouselSvgHrefs, NumberOfDots } from '../types';
import { ArrowButton } from './buttons/ArrowButton';
import { NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS } from '../constants';

type CarouselArrowButtonProps = {
  onClick: () => void;
  svgHrefs: CarouselSvgHrefs;
} & ArrowProps & NumberOfDots
export const CarouselArrowButton = ({
  direction,
  numberOfDots,
  onClick,
  svgHrefs
}: CarouselArrowButtonProps) => {
  let svgHref = svgHrefs?.arrowRightButton || {};
  if (direction === 'left') {
    svgHref = svgHrefs?.arrowLeftButton || {}
  }
  
  if (numberOfDots < NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS) return null;
  return !!svgHref?.svgHref ? 
      <CarouselItemViewerCustomButton fillColor={svgHref.fillColor} onClick={onClick} xlinkHref={svgHref.svgHref}/> :
      <ArrowButton fillColor={svgHref.fillColor} direction={direction} onClick={onClick}/>
}