import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { FILL_RED_CLASSNAME } from '../constants';
import { FULLSCREEN_ARROW_BUTTON_CLASSNAME } from './CarouselItem';

interface CarouselArrowProps {
  className: string
  svgXLinkHref: string
  onClick: (e: any) => void
}

const CarouselArrow: React.FC<CarouselArrowProps> = ({onClick, className, svgXLinkHref}) => {
  const currentlyViewingImage = useSelector((state: RootState) => state.general.currentlyViewingImage);

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