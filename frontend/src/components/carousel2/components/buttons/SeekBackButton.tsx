import { forwardRef } from 'react';
import { CAROUSEL_COLOR_FIVE, CLASSNAME__BUTTON } from "../../constants";
import { ButtonProps } from "../../types";
import { StylingLogic } from '../../business-logic/StylingLogic';
import { useBusinessLogic } from '../../hooks/useBusinessLogic';

type SeekBackButtonProps = {} & ButtonProps;

export const SeekBackButton = forwardRef<HTMLButtonElement, SeekBackButtonProps>(({
  className = CLASSNAME__BUTTON,
  fillColor = CAROUSEL_COLOR_FIVE,
  onClick = () => null,
  childStyle = {},
}, ref) => {
  const { stylingLogic } = useBusinessLogic({});
  const colorStyle = StylingLogic.getButtonColorStyle(fillColor, 'borderLeftColor', childStyle);
  
  return (
    <button style={stylingLogic.carouselButtonSizeStlye}  ref={ref} onClick={onClick} className={className}>
      <div style={colorStyle} className={`${className}--seek-back-left`} />
      <div style={colorStyle} className={`${className}--seek-back-right`} />
    </button>
  )
})