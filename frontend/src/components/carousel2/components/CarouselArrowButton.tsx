import { CarouselItemViewerCustomButton } from './item-viewer/toolbar/CarouselItemViewerCustomButton';
import { ArrowProps, CarouselButton, CarouselNavigationProps } from '../types';
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
  const { style, svgHref } = customButton;
  const shouldHide = !!options?.navigation?.hideArrowsAtFinalPage;
  const isHidden = direction === 'left' ? currentPage === 0 : currentPage === numberOfDots - 1;
  const stylingLogic = new StylingLogic({ options });
  const fillColor = stylingLogic.getButtonColor(direction === 'left' ? CarouselButton.arrowLeft : CarouselButton.arrowRight);

  if ((shouldHide && isHidden) || numberOfDots < NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS) return <EmptyFillerButton />;
  return !!svgHref ? 
      <CarouselItemViewerCustomButton fillColor={fillColor} onClick={onClick} xlinkHref={svgHref} style={style} /> :
      <ArrowButton fillColor={fillColor} direction={direction} onClick={onClick} style={style} />
}