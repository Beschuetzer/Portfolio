import { forwardRef } from 'react';
import { CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps, CarouselElement } from "../../types";
import { StylingLogic } from '../../business-logic/StylingLogic';
import { useBusinessLogic } from '../../hooks/useBusinessLogic';

type PlayButtonProps = {} & ButtonProps;

export const PlayButton = forwardRef<HTMLButtonElement, PlayButtonProps>((props, ref) => {
  const {
    className = CLASSNAME__BUTTON,
    onClick = () => null,
    fillColor,
    childStyle = {},
    style = {},
  } = props;
  const { stylingLogic, optionsLogic } = useBusinessLogic();
  const fillColorToUse = fillColor || optionsLogic.theme.colorFive;
  const colorStyle = StylingLogic.getColorStyle(fillColorToUse, 'borderLeftColor', childStyle);
  const instanceWidth = parseInt(style.width as string, 10) || 0;
  const buttonName = CarouselElement.playButton;

  return (
    <button
      style={{ ...style, ...stylingLogic.getCarouselElementSizeStlye(buttonName, instanceWidth) }}
      ref={ref}
      onClick={onClick}
      className={`${className}`}
    >
      <div
        style={{
          ...colorStyle,
          ...stylingLogic.getCarouselElementChildSizeStlye({ buttonName, subElementName: 'triangle', style: { ...style, ...colorStyle } })
        }}
        className={`${className}--play-triangle`}
      />
    </button>
  )
})