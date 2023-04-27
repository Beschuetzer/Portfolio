import { forwardRef } from 'react';
import { CAROUSEL_COLOR_FIVE, CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps, CarouselButton } from "../../types";
import { StylingLogic } from '../../business-logic/StylingLogic';

type SeekBackButtonProps = {} & ButtonProps;

export const SeekBackButton = forwardRef<HTMLButtonElement, SeekBackButtonProps>(({
  className = CLASSNAME__BUTTON,
  fillColor = CAROUSEL_COLOR_FIVE,
  onClick = () => null,
  childStyle = {},
}, ref) => {
  const colorStyle = StylingLogic.getButtonColorStyle(fillColor, 'borderLeftColor', childStyle);
  return (
    <button ref={ref} onClick={onClick} className={className}>
      <div style={colorStyle} className={`${className}--seek-back-left`} />
      <div style={colorStyle} className={`${className}--seek-back-right`} />
    </button>
  )
})