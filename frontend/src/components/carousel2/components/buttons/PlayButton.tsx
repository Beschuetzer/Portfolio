import { forwardRef } from 'react';
import { CAROUSEL_COLOR_FIVE, CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps, CarouselElement } from "../../types";
import { StylingLogic } from '../../business-logic/StylingLogic';
import { useBusinessLogic } from '../../hooks/useBusinessLogic';

type PlayButtonProps = {} & ButtonProps;

export const PlayButton = forwardRef<HTMLButtonElement, PlayButtonProps>(({
  className = CLASSNAME__BUTTON,
  onClick = () => null,
  fillColor = CAROUSEL_COLOR_FIVE,
  childStyle = {},
  style = {},
}, ref) => {
  const { stylingLogic } = useBusinessLogic({});
  const colorStyle = StylingLogic.getButtonColorStyle(fillColor, 'borderLeftColor', childStyle);
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