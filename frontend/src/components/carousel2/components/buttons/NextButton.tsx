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
  style = {},
}, ref) => {
  const { stylingLogic } = useBusinessLogic({});
  const firstStyle = StylingLogic.getButtonColorStyle(fillColor, 'borderLeftColor', childStyle);
  const secondStyle = StylingLogic.getButtonColorStyle(fillColor, 'background', childStyle);
  const instanceWidth = parseInt(style.width as string, 10) || 0;
  const buttonName = CarouselElement.nextButton;

  return (
    <button
      style={stylingLogic.getCarouselButtonSizeStlye(buttonName, instanceWidth)}
      ref={ref}
      onClick={onClick}
      className={`${className} ${showButton ? '' : CLASSNAME__HIDDEN}`}
    >
      <div
        style={{
          ...firstStyle,
          ...stylingLogic.getToolbarButtonSizeStlye({ buttonName, subElementName: 'triangle', style: { ...style, ...firstStyle } })
        }}
        className={`${className}--next-left`}
      />
      <div
        style={{
          ...secondStyle,
          ...stylingLogic.getToolbarButtonSizeStlye({ buttonName, subElementName: 'bar', style: { ...style, ...secondStyle } })
        }}
        className={`${className}--next-right`}
      />
    </button>
  )
})