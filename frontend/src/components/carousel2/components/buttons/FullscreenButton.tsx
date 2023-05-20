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
  const instanceWidth = parseInt(style.width as string, 10) || 0;

  return (
    <button
      style={stylingLogic.getCarouselButtonSizeStlye(instanceWidth)}
      ref={ref}
      onClick={onClick}
      className={`${className} ${fullScreenClassname}`}
    >
      <div
        style={{
          ...colorStyle,
          ...stylingLogic.getToolbarButtonSizeStlye({ buttonName: CarouselElement.fullscreenButton, subElementName: 'square-outer', style })
        }}
        className={`${fullScreenClassname}-square-outer`}
      />
      <div
        style={{
          ...fillStyle,
          ...stylingLogic.toolbarBackgroundColorStyle,
          ...stylingLogic.getToolbarButtonSizeStlye({ buttonName: CarouselElement.fullscreenButton, subElementName: 'square-inner', style })
        }}
        className={`${fullScreenClassname}-square-inner`}
      />
      <div
        style={{
          ...fillStyle,
          ...stylingLogic.toolbarBackgroundColorStyle,
          ...stylingLogic.getToolbarButtonSizeStlye({ buttonName: CarouselElement.fullscreenButton, subElementName: 'rect-horizontal', style })
        }}
        className={`${fullScreenClassname}-rect-horizontal`}
      />
      <div
        style={{
          ...fillStyle,
          ...stylingLogic.toolbarBackgroundColorStyle,
          ...stylingLogic.getToolbarButtonSizeStlye({ buttonName: CarouselElement.fullscreenButton, subElementName: 'rect-vertical', style })
        }}
        className={`${fullScreenClassname}-rect-vertical`}
      />
    </button>
  )
})