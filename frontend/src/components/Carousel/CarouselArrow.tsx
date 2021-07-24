import React from 'react';

interface CarouselArrowProps {
  className: string
  svgXLinkHref: string
  onClick: (e: any) => void
}



const CarouselArrow: React.FC<CarouselArrowProps> = ({onClick, className, svgXLinkHref}) => {
  return (
    <div
      onClick={onClick}
      className={className}
    >
      <svg>
        <use xlinkHref={svgXLinkHref}></use>
      </svg>
    </div>
  );
}

export default CarouselArrow;