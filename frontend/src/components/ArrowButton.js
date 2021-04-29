import React from 'react';

const ArrowButton = ({direction, fillNumber, hoverFillNumber}) => {
  const handleClick = (e) => {
    debugger;
    console.log(this)
    console.log(e.currentTarget)
  }

  return (
    <div onClick={handleClick} className={`arrow-button arrow-button__${direction}`}>
      <svg className={`arrow-button__fill-${fillNumber} arrow-button__hover-fill-${hoverFillNumber}`}>
        <use xlinkHref="/sprite.svg#icon-arrow-with-circle-down"></use>
      </svg>
    </div>
  );
}

export default ArrowButton;