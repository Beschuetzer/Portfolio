import { forwardRef } from "react";
import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type CloseButtonProps = {
  classNameModifier?: string;
} & ButtonProps;

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps> (({
    className = CLASSNAME__BUTTON,
    classNameModifier = '',
    onClick = () => null,
}, ref) => {
  const classModifierName = `${className}--${classNameModifier}`;
  const leftClassName = `${className}--close-left`;
  const leftModifierClassname = `${leftClassName}-${classNameModifier}`;
  const rightClassName = `${className}--close-right`;
  const rightModifierClassname = `${rightClassName}-${classNameModifier}`;

  return (
    <button ref={ref} onClick={onClick} className={`${className} ${classNameModifier ? classModifierName : ''}`}>
        <div className={`${leftClassName} ${classNameModifier ? leftModifierClassname : ''}`} />
        <div className={`${rightClassName} ${classNameModifier ? rightModifierClassname : ''}`} />
    </button>
  )
})