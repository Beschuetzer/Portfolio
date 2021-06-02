import React from 'react';

const Carousel = ({images, alts}) => {

  const handleClick = (e) => {
    console.log('e =', e);
    const image = e.currentTarget;
    if (!image) return;
    e.preventDefault();
    image.classList.toggle('full-screen');
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
            onClick={handleClick}
          />
        // </article>
      )
    })
  }

  return (
    <article className="carousel">
      {renderImages()}
    </article>
  );
}

export default Carousel;