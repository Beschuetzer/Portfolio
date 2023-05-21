import { forwardRef } from 'react';
import { CAROUSEL_COLOR_FIVE, CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps, CarouselElement } from "../../types";
import { StylingLogic } from '../../business-logic/StylingLogic';
import { useBusinessLogic } from '../../hooks/useBusinessLogic';

type SeekForwardButtonProps = {} & ButtonProps;

export const SeekForwardButton = forwardRef<HTMLButtonElement, SeekForwardButtonProps>(({
  className = CLASSNAME__BUTTON,
  fillColor = CAROUSEL_COLOR_FIVE,
  onClick = () => null,
  childStyle = {},
  style = {},
}, ref) => {
  const { stylingLogic } = useBusinessLogic({});
  const colorStyle = StylingLogic.getButtonColorStyle(fillColor, 'borderLeftColor', childStyle);
  const instanceWidth = parseInt(style.width as string, 10) || 0;
  const buttonName = CarouselElement.seekForwardButton;

  return (
    <button
      style={stylingLogic.getCarouselButtonSizeStlye(buttonName, instanceWidth)}
      ref={ref}
      onClick={onClick}
      className={className}
    >
      <div
        style={{
          ...colorStyle,
          ...stylingLogic.getToolbarButtonSizeStlye({ buttonName, subElementName: 'triangle', style: { ...style, ...colorStyle } })
        }}
        className={`${className}--seek-forward-left`}
      />
      <div
        style={{
          ...colorStyle,
          ...stylingLogic.getToolbarButtonSizeStlye({ buttonName, subElementName: 'triangle', style: { ...style, ...colorStyle } })
        }}
        className={`${className}--seek-forward-right`}
      />
    </button>
  )
})