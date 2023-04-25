import { forwardRef } from "react";
import { CAROUSEL_COLOR_FIVE, CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type CloseButtonProps = {
  classNameModifier?: string;
} & ButtonProps;

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps> (({
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

  const styleToUse = {
    ...style,
    backgroundColor: fillColor,
  } as React.CSSProperties

  return (
    <button ref={ref} onClick={onClick} className={`${className} ${classNameModifier ? classModifierName : ''}`}>
        <div style={styleToUse} className={`${leftClassName} ${classNameModifier ? leftModifierClassname : ''}`} />
        <div style={styleToUse} className={`${rightClassName} ${classNameModifier ? rightModifierClassname : ''}`} />
    </button>
  )
})