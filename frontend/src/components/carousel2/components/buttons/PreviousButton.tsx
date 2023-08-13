import { forwardRef } from "react";
import { CAROUSEL_COLOR_FIVE, CLASSNAME__BUTTON, CLASSNAME__HIDDEN } from "../../constants";
import { ButtonProps, CarouselElement } from "../../types";
import { StylingLogic } from "../../business-logic/StylingLogic";
import { useBusinessLogic } from "../../hooks/useBusinessLogic";

type PreviousButtonProps = {
  showButton?: boolean;
} & ButtonProps;

export const PreviousButton = forwardRef<HTMLButtonElement, PreviousButtonProps>(({
  className = CLASSNAME__BUTTON,
  fillColor = CAROUSEL_COLOR_FIVE,
  onClick = () => null,
  showButton = true,
  childStyle = {},
  style = {},
}, ref) => {
  const { stylingLogic } = useBusinessLogic();
  const firstStyle = StylingLogic.getColorStyle(fillColor, 'background', childStyle);
  const secondStyle = StylingLogic.getColorStyle(fillColor, 'borderRightColor', childStyle);
  const instanceWidth = parseInt(style.width as string, 10) || 0;
  const buttonName = CarouselElement.previousButton;

  return (
    <button
      style={stylingLogic.getCarouselElementSizeStlye(buttonName, instanceWidth)}
      ref={ref}
      onClick={onClick}
      className={`${className}  ${showButton ? '' : CLASSNAME__HIDDEN}`}
    >
      <div
        style={{
          ...firstStyle,
          ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, subElementName: 'bar', style: { ...style, ...firstStyle } })
        }}
        className={`${className}--previous-left`}
      />
      <div
        style={{
          ...secondStyle,
          ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, subElementName: 'triangle', style: { ...style, ...secondStyle } })
        }}
        className={`${className}--previous-right`}
      />
    </button>
  )
})