import { forwardRef } from 'react';
import { CAROUSEL_COLOR_FIVE, CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";
import { StylingLogic } from '../../business-logic/StylingLogic';

type PlayButtonProps = {} & ButtonProps;

export const PlayButton = forwardRef<HTMLButtonElement, PlayButtonProps>(({
  className = CLASSNAME__BUTTON,
  onClick = () => null,
  fillColor = CAROUSEL_COLOR_FIVE,
  childStyle = {},
}, ref) => {
  const colorStyle = StylingLogic.getButtonColorStyle(fillColor, 'borderLeftColor', childStyle);
  return (
    <button ref={ref} onClick={onClick} className={`${className}`}>
      <div style={colorStyle} className={`${className}--play-triangle`} />
    </button>
  )
})