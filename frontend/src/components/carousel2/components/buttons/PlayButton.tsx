import { forwardRef } from 'react';
import { CAROUSEL_COLOR_FIVE, CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps, CarouselElement } from "../../types";
import { StylingLogic } from '../../business-logic/StylingLogic';
import { useBusinessLogic } from '../../hooks/useBusinessLogic';

type PlayButtonProps = {} & ButtonProps;

export const PlayButton = forwardRef<HTMLButtonElement, PlayButtonProps>(({
  className = CLASSNAME__BUTTON,
  onClick = () => null,
  fillColor = CAROUSEL_COLOR_FIVE,
  childStyle = {},
}, ref) => {
  const { stylingLogic } = useBusinessLogic({});
  const colorStyle = StylingLogic.getButtonColorStyle(fillColor, 'borderLeftColor', childStyle);

  return (
    <button style={stylingLogic.getCarouselButtonSizeStlye()} ref={ref} onClick={onClick} className={`${className}`}>
      <div style={{ ...colorStyle, ...stylingLogic.getToolbarButtonSizeStlye(CarouselElement.playButton, 'triangle', colorStyle) }} className={`${className}--play-triangle`} />
    </button>
  )
})