import React from 'react';
import ArrowButton from './ArrowButton';

const Carousel = ({images, alts}) => {

  const handleImageClick = (e) => {
    console.log('e =', e);
    const image = e.currentTarget;
    if (!image) return;
    e.preventDefault();
    image.classList.toggle('full-screen');
  }

  const handleArrowClick = (e) => {

  }

  const renderImages = () => {
    return images.map((image, index) => {
      return (
        // <article key={index} className="carousel__item">
          <img 
            src={image}
            className="carousel__image" 
            alt={alts[index]}
            key={index}
            onClick={handleImageClick}
          />
        // </article>
      )
    })
  }

  return (
    <React.Fragment>
      <article className="carousel">
        {renderImages()}
      </article>
      <div onClick={handleArrowClick} className={`hidden  carousel__arrow-button carousel__arrow-button--left`}>
        <svg> 
          <use xlinkHref="/sprite.svg#icon-arrow-with-circle-down"></use>
        </svg>
      </div>
      <div onClick={handleArrowClick} className={` carousel__arrow-button carousel__arrow-button--right `}>
        <svg> 
          <use xlinkHref="/sprite.svg#icon-arrow-with-circle-down"></use>
        </svg>
      </div>
    </React.Fragment>
  );
}

export default Carousel;