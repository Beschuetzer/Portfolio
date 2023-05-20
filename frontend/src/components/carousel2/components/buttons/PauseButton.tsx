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
  style = {},
}, ref) => {
  const { stylingLogic } = useBusinessLogic({});
  const colorStyle = StylingLogic.getButtonColorStyle(fillColor, 'backgroundColor', childStyle);
  const instanceWidth = parseInt(style.width as string, 10) || 0;

  return (
    <button
      style={stylingLogic.getCarouselButtonSizeStlye(instanceWidth)}
      ref={ref}
      onClick={onClick}
      className={className}
    >
      <div
        style={{
          ...colorStyle,
          ...stylingLogic.getToolbarButtonSizeStlye({ buttonName: CarouselElement.pauseButton, subElementName: 'left', style })
        }}
        className={`${className}--pause-left`}
      />
      <div
        style={{
          ...colorStyle,
          ...stylingLogic.getToolbarButtonSizeStlye({ buttonName: CarouselElement.pauseButton, subElementName: 'right', style })
        }}
        className={`${className}--pause-right`}
      />
    </button>
  )
})