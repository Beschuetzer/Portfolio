import { forwardRef } from "react";
import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps, CarouselElement } from "../../types";
import { StylingLogic } from "../../business-logic/StylingLogic";
import { useBusinessLogic } from "../../hooks/useBusinessLogic";

type FullscreenButtonProps = {
  classNameModifier?: string;
} & ButtonProps;

export const FullscreenButton = forwardRef<HTMLButtonElement, FullscreenButtonProps>((props, ref) => {
  const {
    childStyle = {},
    className = CLASSNAME__BUTTON,
    fillColor,
    onClick = () => null,
    style = {},
  } = props;
  const { stylingLogic, optionsLogic } = useBusinessLogic();
  const fillColorToUse = fillColor || optionsLogic.theme.colorFive;
  const fullScreenClassname = `${className}--fullscreen`
  const colorStyle = StylingLogic.getColorStyle(fillColorToUse, 'backgroundColor', childStyle);
  const instanceWidth = parseInt(style.width as string, 10) || 0;
  const buttonName = CarouselElement.fullscreenButton;

  return (
    <button
      style={stylingLogic.getCarouselElementSizeStlye(buttonName, instanceWidth)}
      ref={ref}
      onClick={onClick}
      className={`${className} ${fullScreenClassname}`}
    >
      <div
        style={{
          ...colorStyle,
          ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, style })
        }}
        className={`${fullScreenClassname}-top ${fullScreenClassname}-top-left-horizontal`}
      />
      <div
        style={{
          ...colorStyle,
          ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, style })
        }}
        className={`${fullScreenClassname}-top ${fullScreenClassname}-top-right-horizontal`}
      />
      <div
        style={{
          ...colorStyle,
          ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, style })
        }}
        className={`${fullScreenClassname}-bottom ${fullScreenClassname}-bottom-left-horizontal`}
      />
      <div
        style={{
          ...colorStyle,
          ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, style })
        }}
        className={`${fullScreenClassname}-bottom ${fullScreenClassname}-bottom-right-horizontal`}
      />

      <div
        style={{
          ...colorStyle,
          ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, style })
        }}
        className={`${fullScreenClassname}-top ${fullScreenClassname}-top-left-vertical`}
      />
      <div
        style={{
          ...colorStyle,
          ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, style })
        }}
        className={`${fullScreenClassname}-top ${fullScreenClassname}-top-right-vertical`}
      />
      <div
        style={{
          ...colorStyle,
          ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, style })
        }}
        className={`${fullScreenClassname}-bottom ${fullScreenClassname}-bottom-left-vertical`}
      />
      <div
        style={{
          ...colorStyle,
          ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, style })
        }}
        className={`${fullScreenClassname}-bottom ${fullScreenClassname}-bottom-right-vertical`}
      />
    </button>
  )
})