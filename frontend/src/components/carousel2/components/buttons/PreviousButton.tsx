import { forwardRef } from "react";
import { CAROUSEL_COLOR_FIVE, CLASSNAME__BUTTON, CLASSNAME__HIDDEN } from "../../constants";
import { ButtonProps, CarouselButton } from "../../types";
import { StylingLogic } from "../../business-logic/StylingLogic";

type PreviousButtonProps = {
  showButton?: boolean;
} & ButtonProps;

export const PreviousButton = forwardRef<HTMLButtonElement, PreviousButtonProps>(({
  className = CLASSNAME__BUTTON,
  fillColor = CAROUSEL_COLOR_FIVE,
  onClick = () => null,
  showButton = true,
  style = {},
}, ref) => {
  const firstStyle = StylingLogic.getButtonColorStyle(fillColor, 'background', style);
  const secondStyle = StylingLogic.getButtonColorStyle(fillColor, 'borderLeftColor', style);

  return (
    <button ref={ref} onClick={onClick} className={`${className}  ${showButton ? '' : CLASSNAME__HIDDEN}`}>
      <div style={firstStyle} className={`${className}--previous-left`} />
      <div style={secondStyle} className={`${className}--previous-right`} />
    </button>
  )
})