import { forwardRef } from 'react';
import { CAROUSEL_COLOR_FIVE, CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps, CarouselButton } from "../../types";
import { StylingLogic } from '../../business-logic/StylingLogic';

type PauseButtonProps = {} & ButtonProps;

export const PauseButton = forwardRef<HTMLButtonElement, PauseButtonProps>(({
  className = CLASSNAME__BUTTON,
  onClick = () => null,
  fillColor = CAROUSEL_COLOR_FIVE,
  childStyle = {},
}, ref) => {
  const colorStyle = StylingLogic.getButtonColorStyle(fillColor, 'backgroundColor', childStyle);
  return (
    <button ref={ref} onClick={onClick} className={className}>
      <div style={colorStyle} className={`${className}--pause-left`} />
      <div style={colorStyle} className={`${className}--pause-right`} />
    </button>
  )
})