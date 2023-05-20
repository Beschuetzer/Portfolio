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
}, ref) => {
  const { stylingLogic } = useBusinessLogic({});
  const firstStyle = StylingLogic.getButtonColorStyle(fillColor, 'background', childStyle);
  const secondStyle = StylingLogic.getButtonColorStyle(fillColor, 'borderRightColor', childStyle);

  return (
    <button style={stylingLogic.getCarouselButtonSizeStlye()} ref={ref} onClick={onClick} className={`${className}  ${showButton ? '' : CLASSNAME__HIDDEN}`}>
      <div style={{...firstStyle, ...stylingLogic.getToolbarButtonSizeStlye(CarouselElement.previousButton, 'bar', firstStyle)}} className={`${className}--previous-left`} />
      <div style={{...secondStyle, ...stylingLogic.getToolbarButtonSizeStlye(CarouselElement.previousButton, 'triangle', secondStyle)}} className={`${className}--previous-right`} />
    </button>
  )
})