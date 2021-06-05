import React from 'react';

const CarouselArrow = ({onClick, className, svgXLinkHref}) => {
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