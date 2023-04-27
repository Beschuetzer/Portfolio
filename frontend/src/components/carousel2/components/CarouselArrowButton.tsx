import { CarouselItemViewerCustomButton } from './item-viewer/toolbar/CarouselItemViewerCustomButton';
import { ArrowProps, CarouselElement, CarouselNavigationProps } from '../types';
import { ArrowButton } from './buttons/ArrowButton';
import { CAROUSEL_COLOR_FIVE, CAROUSEL_COLOR_ONE, NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS } from '../constants';
import { EmptyFillerButton } from './buttons/EmptyFillerButton';
import { StylingLogic } from '../business-logic/StylingLogic';
import { ItemDisplayLocationLogic } from '../business-logic/ItemDisplayLocationLogic';

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
  if (direction === 'left') {
    customButton = options?.styling?.elements?.arrowLeft || {}
  }
  const { style, svgHref } = customButton;
  const shouldHide = !!options?.navigation?.hideArrowsAtFinalPage;
  const isHidden = direction === 'left' ? currentPage === 0 : currentPage === numberOfDots - 1;
  const stylingLogic = new StylingLogic({ options });
  const itemDisplayLocationLogic = new ItemDisplayLocationLogic({ options });
  const defaultColor = itemDisplayLocationLogic.isDefaultItemDisplayLocation ? CAROUSEL_COLOR_ONE : CAROUSEL_COLOR_FIVE;
  const fillColor = stylingLogic.getButtonColor(direction === 'left' ? CarouselElement.arrowLeft : CarouselElement.arrowRight, defaultColor);

  if ((shouldHide && isHidden) || numberOfDots < NUMBER_OF_DOTS_MINIMUM_TO_DISPLAY_NAV_ITEMS) return <EmptyFillerButton />;
  return !!svgHref ? 
      <CarouselItemViewerCustomButton fillColor={fillColor} onClick={onClick} xlinkHref={svgHref} useElementStyle={style} /> :
      <ArrowButton fillColor={fillColor} direction={direction} onClick={onClick} childStyle={style} />
}