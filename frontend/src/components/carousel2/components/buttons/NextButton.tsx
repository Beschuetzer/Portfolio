import { forwardRef } from "react";
import { CLASSNAME__BUTTON, CLASSNAME__HIDDEN } from "../../constants";
import { ButtonProps, CarouselElement } from "../../types";
import { StylingLogic } from "../../business-logic/StylingLogic";
import { useBusinessLogic } from "../../hooks/useBusinessLogic";

type NextButtonProps = {
  showButton?: boolean;
} & ButtonProps;

export const NextButton = forwardRef<HTMLButtonElement, NextButtonProps>((props, ref) => {
  const {
    childStyle = {},
    className = CLASSNAME__BUTTON,
    fillColor,
    onClick = () => null,
    showButton = true,
    style = {},
  } = props;
  const { stylingLogic, optionsLogic } = useBusinessLogic();
  const fillColorToUse = fillColor || optionsLogic.theme.colorFive;
  const firstStyle = StylingLogic.getColorStyle(fillColorToUse, 'borderLeftColor', childStyle);
  const secondStyle = StylingLogic.getColorStyle(fillColorToUse, 'background', childStyle);
  const instanceWidth = parseInt(style.width as string, 10) || 0;
  const buttonName = CarouselElement.nextButton;

  return (
    <button
      style={stylingLogic.getCarouselElementSizeStlye(buttonName, instanceWidth)}
      ref={ref}
      onClick={onClick}
      className={`${className} ${showButton ? '' : CLASSNAME__HIDDEN}`}
    >
      <div
        style={{
          ...firstStyle,
          ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, subElementName: 'triangle', style: { ...style, ...firstStyle } })
        }}
        className={`${className}--next-left`}
      />
      <div
        style={{
          ...secondStyle,
          ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, subElementName: 'bar', style: { ...style, ...secondStyle } })
        }}
        className={`${className}--next-right`}
      />
    </button>
  )
})