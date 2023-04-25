import { forwardRef } from 'react';
import { CAROUSEL_COLOR_FIVE, CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps, CarouselButton } from "../../types";
import { StylingLogic } from '../../business-logic/StylingLogic';

type SeekBackButtonProps = {} & ButtonProps;

export const SeekBackButton = forwardRef<HTMLButtonElement, SeekBackButtonProps>(({
  className = CLASSNAME__BUTTON,
  fillColor = CAROUSEL_COLOR_FIVE,
  onClick = () => null,
  style = {},
}, ref) => {
  const colorStyle = StylingLogic.getButtonColorStyle(style, fillColor, 'borderLeftColor');
  return (
    <button ref={ref} onClick={onClick} className={className}>
      <div style={colorStyle} className={`${className}--seek-back-left`} />
      <div style={colorStyle} className={`${className}--seek-back-right`} />
    </button>
  )
})