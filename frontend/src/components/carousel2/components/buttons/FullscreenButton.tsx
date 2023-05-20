import { forwardRef } from "react";
import { CAROUSEL_COLOR_FIVE, CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps, CarouselElement } from "../../types";
import { StylingLogic } from "../../business-logic/StylingLogic";
import { useBusinessLogic } from "../../hooks/useBusinessLogic";

type FullscreenButtonProps = {
  classNameModifier?: string;
} & ButtonProps;

export const FullscreenButton = forwardRef<HTMLButtonElement, FullscreenButtonProps>(({
  childStyle = {},
  className = CLASSNAME__BUTTON,
  classNameModifier = '',
  fillColor = CAROUSEL_COLOR_FIVE,
  onClick = () => null,
  style = {},
}, ref) => {
  const { stylingLogic } = useBusinessLogic({});
  const fullScreenClassname = `${className}--fullscreen`
  const colorStyle = StylingLogic.getButtonColorStyle(fillColor, 'backgroundColor', childStyle);
  const fillStyle = StylingLogic.getButtonColorStyle(fillColor, 'fill', childStyle);

  return (
    <button style={stylingLogic.getCarouselButtonSizeStlye()} ref={ref} onClick={onClick} className={`${className} ${fullScreenClassname}`}>
      <div style={{ ...colorStyle, ...stylingLogic.getToolbarButtonSizeStlye(CarouselElement.fullscreenButton, 'square-outer') }} className={`${fullScreenClassname}-square-outer`} />
      <div style={{ ...fillStyle, ...stylingLogic.toolbarBackgroundColorStyle, ...stylingLogic.getToolbarButtonSizeStlye(CarouselElement.fullscreenButton, 'square-inner') }} className={`${fullScreenClassname}-square-inner`} />
      <div style={{ ...fillStyle, ...stylingLogic.toolbarBackgroundColorStyle, ...stylingLogic.getToolbarButtonSizeStlye(CarouselElement.fullscreenButton, 'rect-horizontal') }} className={`${fullScreenClassname}-rect-horizontal`} />
      <div style={{ ...fillStyle, ...stylingLogic.toolbarBackgroundColorStyle, ...stylingLogic.getToolbarButtonSizeStlye(CarouselElement.fullscreenButton, 'rect-vertical') }} className={`${fullScreenClassname}-rect-vertical`} />
    </button>
  )
})