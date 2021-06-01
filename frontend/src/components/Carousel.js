import React from 'react';

const Carousel = ({images, alts}) => {

  const renderImages = () => {
    return images.map((image, index) => {
      return (
        <article key={index} className="carousel__item">
          <img src={image} className="carousel__image" alt={alts[index]}/>
        </article>
      )
    })
  }

  return (
    <section className="carousel">
      {renderImages()}
    </section>
  );
}

export default Carousel;