import { forwardRef } from "react";
import { CAROUSEL_COLOR_FIVE, CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";
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
  
  return (
    <button ref={ref} onClick={onClick} className={`${className} ${fullScreenClassname}`}>
      <div style={colorStyle} className={`${fullScreenClassname}-square-outer`} />
      <div style={stylingLogic.toolbarBackgroundColorStyle} className={`${fullScreenClassname}-square-inner`} />
      <div style={stylingLogic.toolbarBackgroundColorStyle} className={`${fullScreenClassname}-rect-horizontal`} />
      <div style={stylingLogic.toolbarBackgroundColorStyle} className={`${fullScreenClassname}-rect-vertical`} />
    </button>
  )
})