import { forwardRef } from "react";
import { CAROUSEL_COLOR_FIVE, CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps, CarouselButton } from "../../types";
import { StylingLogic } from "../../business-logic/StylingLogic";

type CloseButtonProps = {
  classNameModifier?: string;
} & ButtonProps;

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(({
  childStyle = {},
  className = CLASSNAME__BUTTON,
  classNameModifier = '',
  fillColor = CAROUSEL_COLOR_FIVE,
  onClick = () => null,
  style = {},
}, ref) => {
  const classModifierName = `${className}--${classNameModifier}`;
  const leftClassName = `${className}--close-left`;
  const leftModifierClassname = `${leftClassName}-${classNameModifier}`;
  const rightClassName = `${className}--close-right`;
  const rightModifierClassname = `${rightClassName}-${classNameModifier}`;
  const colorStyle = StylingLogic.getButtonColorStyle(fillColor, 'backgroundColor', childStyle);
  return (
    <button style={style} ref={ref} onClick={onClick} className={`${className} ${classNameModifier ? classModifierName : ''}`}>
      <div style={colorStyle} className={`${leftClassName} ${classNameModifier ? leftModifierClassname : ''}`} />
      <div style={colorStyle} className={`${rightClassName} ${classNameModifier ? rightModifierClassname : ''}`} />
    </button>
  )
})