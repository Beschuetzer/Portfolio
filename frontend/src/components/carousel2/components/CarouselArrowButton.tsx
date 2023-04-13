import { CarouselItemViewerCustomButton } from './item-viewer/toolbar/CarouselItemViewerCustomButton';
import { ArrowProps, CarouselSvgHrefs, CarouselNavigationProps } from '../types';
import { ArrowButton } from './buttons/ArrowButton';
import { NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS } from '../constants';
import { EmptyFillerButton } from './buttons/EmptyFillerButton';

type CarouselArrowButtonProps = {
  onClick: () => void;
  svgHrefs: CarouselSvgHrefs;
} & ArrowProps & CarouselNavigationProps
export const CarouselArrowButton = ({
  currentPage,
  direction,
  numberOfDots,
  options,
  onClick,
  svgHrefs
}: CarouselArrowButtonProps) => {
  let svgHref = svgHrefs?.arrowRightButton || {};
  if (direction === 'left') {
    svgHref = svgHrefs?.arrowLeftButton || {}
  }
  const shouldHide = !!options?.navigation?.hideArrowsAtFinalPage;
  const isHidden = direction === 'left' ? currentPage === 0 : currentPage === numberOfDots - 1;

  if ((shouldHide && isHidden) || numberOfDots < NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS) return <EmptyFillerButton />;
  return !!svgHref?.svgHref ? 
      <CarouselItemViewerCustomButton fillColor={svgHref.fillColor} onClick={onClick} xlinkHref={svgHref.svgHref} style={svgHref.style}/> :
      <ArrowButton fillColor={svgHref.fillColor} direction={direction} onClick={onClick}/>
}