import { CarouselItemViewerCustomButton } from './item-viewer/toolbar/CarouselItemViewerCustomButton';
import { ArrowProps, CarouselNavigationProps } from '../types';
import { ArrowButton } from './buttons/ArrowButton';
import { NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS } from '../constants';
import { EmptyFillerButton } from './buttons/EmptyFillerButton';
import { StylingLogic } from '../business-logic/StylingLogic';

type CarouselArrowButtonProps = {
  onClick: () => void;
} & ArrowProps & CarouselNavigationProps
export const CarouselArrowButton = ({
  currentPage,
  direction,
  numberOfDots,
  options,
  onClick,
}: CarouselArrowButtonProps) => {
  let svgHref = options?.svgs?.navigation?.arrowRight || {};
  if (direction === 'left') {
    svgHref = options?.svgs?.navigation?.arrowLeft || {}
  }
  const shouldHide = !!options?.navigation?.hideArrowsAtFinalPage;
  const isHidden = direction === 'left' ? currentPage === 0 : currentPage === numberOfDots - 1;
  const stylingLogic = new StylingLogic({options: options || {}});

  if ((shouldHide && isHidden) || numberOfDots < NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS) return <EmptyFillerButton />;
  return !!svgHref?.svgHref ? 
      <CarouselItemViewerCustomButton fillColor={stylingLogic.getNavigationFillColor(svgHref.fillColor)} onClick={onClick} xlinkHref={svgHref.svgHref} style={svgHref.style}/> :
      <ArrowButton fillColor={stylingLogic.getNavigationFillColor(svgHref.fillColor)} direction={direction} onClick={onClick}/>
}