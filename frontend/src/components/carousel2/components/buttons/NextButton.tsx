import { forwardRef } from "react";
import { CAROUSEL_COLOR_FIVE, CLASSNAME__BUTTON, CLASSNAME__HIDDEN } from "../../constants";
import { ButtonProps, CarouselButton } from "../../types";
import { StylingLogic } from "../../business-logic/StylingLogic";

type NextButtonProps = {
  showButton?: boolean;
} & ButtonProps;

export const NextButton = forwardRef<HTMLButtonElement, NextButtonProps>(({
  className = CLASSNAME__BUTTON,
  fillColor = CAROUSEL_COLOR_FIVE,
  onClick = () => null,
  showButton = true,
  style = {},
}, ref) => {
  const firstStyle = StylingLogic.getButtonColorStyle(fillColor, 'borderLeftColor', style);
  const secondStyle = StylingLogic.getButtonColorStyle(fillColor, 'background', style);
  return (
    <button ref={ref} onClick={onClick} className={`${className} ${showButton ? '' : CLASSNAME__HIDDEN}`}>
      <div style={firstStyle} className={`${className}--next-left`} />
      <div style={secondStyle} className={`${className}--next-right`} />
    </button>
  )
})