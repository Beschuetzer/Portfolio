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
  let customButton = options?.styling?.buttons?.arrowRight || {};
  if (direction === 'left') {
    customButton = options?.styling?.buttons?.arrowLeft || {}
  }
  const shouldHide = !!options?.navigation?.hideArrowsAtFinalPage;
  const isHidden = direction === 'left' ? currentPage === 0 : currentPage === numberOfDots - 1;
  const stylingLogic = new StylingLogic({options});

  if ((shouldHide && isHidden) || numberOfDots < NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS) return <EmptyFillerButton />;
  return !!customButton?.svgHref ? 
      <CarouselItemViewerCustomButton fillColor={stylingLogic.getNavigationFillColor(customButton.fillColor)} onClick={onClick} xlinkHref={customButton.svgHref} style={customButton.style}/> :
      <ArrowButton fillColor={stylingLogic.getNavigationFillColor(customButton.fillColor)} direction={direction} onClick={onClick}/>
}