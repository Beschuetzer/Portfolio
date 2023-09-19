import { forwardRef } from 'react';
import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps, CarouselElement } from "../../types";
import { StylingLogic } from '../../business-logic/StylingLogic';
import { useBusinessLogic } from '../../hooks/useBusinessLogic';

type PauseButtonProps = {} & ButtonProps;

export const PauseButton = forwardRef<HTMLButtonElement, PauseButtonProps>((props, ref) => {
  const {
    className = CLASSNAME__BUTTON,
    onClick = () => null,
    fillColor,
    childStyle = {},
    style = {},
  } = props;
  const { stylingLogic, optionsLogic } = useBusinessLogic();
  const fillColorToUse = fillColor || optionsLogic.theme.colorFive;
  const colorStyle = StylingLogic.getColorStyle(fillColorToUse, 'backgroundColor', childStyle);
  const instanceWidth = parseInt(style.width as string, 10) || 0;
  const buttonName = CarouselElement.pauseButton;

  return (
    <button
      style={{ ...style, ...stylingLogic.getCarouselElementSizeStlye(buttonName, instanceWidth) }}
      ref={ref}
      onClick={onClick}
      className={className}
    >
      <div
        style={{
          ...colorStyle,
          ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, subElementName: 'left', style })
        }}
        className={`${className}--pause-left`}
      />
      <div
        style={{
          ...colorStyle,
          ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, subElementName: 'right', style })
        }}
        className={`${className}--pause-right`}
      />
    </button>
  )
})