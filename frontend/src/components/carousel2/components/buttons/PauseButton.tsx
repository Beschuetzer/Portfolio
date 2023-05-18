import { forwardRef } from 'react';
import { CAROUSEL_COLOR_FIVE, CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps, CarouselElement } from "../../types";
import { StylingLogic } from '../../business-logic/StylingLogic';
import { useBusinessLogic } from '../../hooks/useBusinessLogic';

type PauseButtonProps = {} & ButtonProps;

export const PauseButton = forwardRef<HTMLButtonElement, PauseButtonProps>(({
  className = CLASSNAME__BUTTON,
  onClick = () => null,
  fillColor = CAROUSEL_COLOR_FIVE,
  childStyle = {},
}, ref) => {
  const { stylingLogic } = useBusinessLogic({});
  const colorStyle = StylingLogic.getButtonColorStyle(fillColor, 'backgroundColor', childStyle);

  return (
    <button style={stylingLogic.carouselButtonSizeStlye} ref={ref} onClick={onClick} className={className}>
      <div style={{ ...colorStyle, ...stylingLogic.getToolbarButtonSizeStlye(CarouselElement.pauseButton, 'left') }} className={`${className}--pause-left`} />
      <div style={{ ...colorStyle, ...stylingLogic.getToolbarButtonSizeStlye(CarouselElement.pauseButton, 'right') }} className={`${className}--pause-right`} />
    </button>
  )
})