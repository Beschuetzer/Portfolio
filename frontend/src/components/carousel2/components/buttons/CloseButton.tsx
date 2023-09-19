import { forwardRef } from "react";
import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps, CarouselElement } from "../../types";
import { StylingLogic } from "../../business-logic/StylingLogic";
import { useBusinessLogic } from "../../hooks/useBusinessLogic";

type CloseButtonProps = {
  classNameModifier?: string;
} & ButtonProps;

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => {
  const {
    childStyle = {},
    className = CLASSNAME__BUTTON,
    classNameModifier = '',
    fillColor,
    onClick = () => null,
    style = {},
  } = props;
  const { stylingLogic, optionsLogic } = useBusinessLogic();
  const fillColorToUse = fillColor || optionsLogic.theme.colorFive;
  const classModifierName = `${className}--${classNameModifier}`;
  const leftClassName = `${className}--close-left`;
  const leftModifierClassname = `${leftClassName}-${classNameModifier}`;
  const rightClassName = `${className}--close-right`;
  const rightModifierClassname = `${rightClassName}-${classNameModifier}`;
  const colorStyle = StylingLogic.getColorStyle(fillColorToUse, 'backgroundColor', childStyle);
  const instanceWidth = parseInt(style.width as string, 10) || 0;
  const buttonName = CarouselElement.closeButton;

  return (
    <button
      style={{ ...style, ...stylingLogic.getCarouselElementSizeStlye(buttonName, instanceWidth) }}
      ref={ref}
      onClick={onClick}
      className={`${className} ${classNameModifier ? classModifierName : ''}`}
    >
      <div
        style={{ ...colorStyle, ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, style }) }}
        className={`${leftClassName} ${classNameModifier ? leftModifierClassname : ''}`}
      />
      <div
        style={{ ...colorStyle, ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, style }) }}
        className={`${rightClassName} ${classNameModifier ? rightModifierClassname : ''}`}
      />
    </button>
  )
})