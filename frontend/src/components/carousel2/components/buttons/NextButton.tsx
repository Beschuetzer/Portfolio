import { forwardRef } from "react";
import { CAROUSEL_COLOR_FIVE, CLASSNAME__BUTTON, CLASSNAME__HIDDEN } from "../../constants";
import { ButtonProps, CarouselElement } from "../../types";
import { StylingLogic } from "../../business-logic/StylingLogic";
import { useBusinessLogic } from "../../hooks/useBusinessLogic";

type NextButtonProps = {
  showButton?: boolean;
} & ButtonProps;

export const NextButton = forwardRef<HTMLButtonElement, NextButtonProps>(({
  childStyle = {},
  className = CLASSNAME__BUTTON,
  fillColor = CAROUSEL_COLOR_FIVE,
  onClick = () => null,
  showButton = true,
}, ref) => {
  const { stylingLogic } = useBusinessLogic({});
  const firstStyle = StylingLogic.getButtonColorStyle(fillColor, 'borderLeftColor', childStyle);
  const secondStyle = StylingLogic.getButtonColorStyle(fillColor, 'background', childStyle);
  return (
    <button style={stylingLogic.getCarouselButtonSizeStlye()} ref={ref} onClick={onClick} className={`${className} ${showButton ? '' : CLASSNAME__HIDDEN}`}>
      <div style={{ ...firstStyle, ...stylingLogic.getToolbarButtonSizeStlye(CarouselElement.nextButton, 'triangle', firstStyle) }} className={`${className}--next-left`} />
      <div style={{ ...secondStyle, ...stylingLogic.getToolbarButtonSizeStlye(CarouselElement.nextButton, 'bar') }} className={`${className}--next-right`} />
    </button>
  )
})