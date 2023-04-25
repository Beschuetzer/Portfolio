import { forwardRef } from 'react';
import { CAROUSEL_COLOR_FIVE, CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps, CarouselButton } from "../../types";
import { StylingLogic } from '../../business-logic/StylingLogic';

type SeekForwardButtonProps = {} & ButtonProps;

export const SeekForwardButton = forwardRef<HTMLButtonElement, SeekForwardButtonProps>(({
  className = CLASSNAME__BUTTON,
  fillColor = CAROUSEL_COLOR_FIVE,
  onClick = () => null,
  style = {},
}, ref) => {
  const colorStyle = StylingLogic.getButtonColorStyle(fillColor, 'borderLeftColor', style);
  return (
    <button ref={ref} onClick={onClick} className={className}>
      <div style={colorStyle} className={`${className}--seek-forward-left`} />
      <div style={colorStyle} className={`${className}--seek-forward-right`} />
    </button>
  )
})