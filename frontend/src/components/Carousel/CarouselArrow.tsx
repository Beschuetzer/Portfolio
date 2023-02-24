import React from 'react';
import { useAppSelector } from '../../hooks';
import { currentlyViewingImageSelector } from '../../slices/generalSlice';
import { FILL_RED_CLASSNAME, FULLSCREEN_ARROW_BUTTON_CLASSNAME } from '../constants';

interface CarouselArrowProps {
  className: string
  svgXLinkHref: string
  onClick: (e: any) => void
}

const CarouselArrow: React.FC<CarouselArrowProps> = ({onClick, className, svgXLinkHref}) => {
  const currentlyViewingImage = useAppSelector(currentlyViewingImageSelector);
  const fullscreenClassname = currentlyViewingImage ? FULLSCREEN_ARROW_BUTTON_CLASSNAME : '';
  const svgColorClassname = currentlyViewingImage ? FILL_RED_CLASSNAME : '';
  return (
    <div
      onClick={onClick}
      className={`${className} ${fullscreenClassname}`}
    >
      <svg className={svgColorClassname}>
        <use xlinkHref={svgXLinkHref}></use>
      </svg>
    </div>
  );
}

export default CarouselArrow;