import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";

type CloseButtonProps = {
  classNameModifier?: string;
} & ButtonProps;

export const CloseButton = ({
    className = CLASSNAME__BUTTON,
    classNameModifier = '',
    onClick = () => null,
}: CloseButtonProps) => {
  const classModifierName = `${className}--${classNameModifier}`;
  const leftClassName = `${className}--close-left`;
  const leftModifierClassname = `${leftClassName}-${classNameModifier}`;
  const rightClassName = `${className}--close-right`;
  const rightModifierClassname = `${rightClassName}-${classNameModifier}`;

  return (
    <button onClick={onClick} className={`${className} ${classNameModifier ? classModifierName : ''}`}>
        <div className={`${leftClassName} ${classNameModifier ? leftModifierClassname : ''}`} />
        <div className={`${rightClassName} ${classNameModifier ? rightModifierClassname : ''}`} />
    </button>
  )
}