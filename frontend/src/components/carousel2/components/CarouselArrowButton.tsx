import { CarouselItemViewerCustomButton } from './item-viewer/toolbar/CarouselItemViewerCustomButton';
import { ArrowButtonDirection, ArrowProps, CarouselElement, CarouselNavigationProps } from '../types';
import { ArrowButton } from './buttons/ArrowButton';
import { CAROUSEL_COLOR_FIVE, CAROUSEL_COLOR_ONE, NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS } from '../constants';
import { EmptyFillerButton } from './buttons/EmptyFillerButton';
import { useBusinessLogic } from '../hooks/useBusinessLogic';

type CarouselArrowButtonProps = {
  onClick: () => void;
} & ArrowProps & CarouselNavigationProps
export const CarouselArrowButton = ({
  currentPage,
  direction,
  numberOfDots,
  options = {},
  onClick,
}: CarouselArrowButtonProps) => {
  let customButton = options?.styling?.elements?.arrowRight || {};
  if (direction === ArrowButtonDirection.previous) {
    customButton = options?.styling?.elements?.arrowLeft || {}
  }
  const { style, svgHref } = customButton;
  const shouldHide = !!options?.navigation?.hideArrowsAtFinalPage;
  const isHidden = direction === ArrowButtonDirection.previous ? currentPage === 0 : currentPage === numberOfDots - 1;
  const {
    optionsLogic,
    stylingLogic,
  } = useBusinessLogic({});
  const defaultColor = optionsLogic.isDefaultItemDisplayLocation ? CAROUSEL_COLOR_ONE : CAROUSEL_COLOR_FIVE;
  const fillColor = stylingLogic.getButtonColor(direction === ArrowButtonDirection.previous ? CarouselElement.arrowLeft : CarouselElement.arrowRight, defaultColor);

  if ((shouldHide && isHidden) || numberOfDots < NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS) return <EmptyFillerButton />;
  return !!svgHref ? 
      <CarouselItemViewerCustomButton fillColor={fillColor} onClick={onClick} xlinkHref={svgHref} useElementStyle={style} /> :
      <ArrowButton fillColor={fillColor} direction={direction} onClick={onClick} childStyle={style} />
}