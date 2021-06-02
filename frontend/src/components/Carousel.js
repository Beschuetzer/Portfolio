import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

const Carousel = ({images, alts, viewPortWidth}) => {
  const minImageCount = 0;
  const numberOfImagesInCarousel = 3;
  let currentTranslationFactor = minImageCount;
  let imagesRef = useRef();
  let imagesWidth = useRef();

  useEffect(() => {
    console.log('something------------------------------------------------');
    imagesRef.current = document.querySelectorAll('.carousel__image');
    const image1Left = imagesRef.current[0].getBoundingClientRect().left;
    const image2Left = imagesRef.current[1].getBoundingClientRect().left;
    imagesWidth.current = Math.abs(image1Left - image2Left);
  }, [viewPortWidth])

  const handleImageClick = (e) => {
    console.log('e =', e);
    const image = e.currentTarget;
    if (!image) return;
    e.preventDefault();
    image.classList.toggle('full-screen');
  }

  const handleArrowClick = (e) => {
    const maxImageCount = images.length - numberOfImagesInCarousel;

    let hasClickedLeftArrow = false;
    if (e.currentTarget?.classList.contains('carousel__arrow-button--left')) hasClickedLeftArrow = true;

    if (hasClickedLeftArrow) currentTranslationFactor -=1;
    else currentTranslationFactor += 1;

    if (currentTranslationFactor < minImageCount) {
      return currentTranslationFactor = minImageCount;
    }
    else if (currentTranslationFactor > maxImageCount) {
      return currentTranslationFactor = maxImageCount;
    }

    
    const amountToTranslateImages = imagesWidth.current * currentTranslationFactor;
    console.log('e =', e);
    console.log('currentImage =', currentTranslationFactor);
    console.log('imagesWidth.current =', imagesWidth.current);
    console.log('amountToTranslateImages =', amountToTranslateImages);

    const newValue = `--carousel-image-translation-x: -${amountToTranslateImages}px`;
    document.documentElement.style.cssText += newValue;
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

  const renderCarouselButton = () => {

  }

  return (
    <React.Fragment>
      <article className="carousel">
        {renderImages()}
      </article>
      <div onClick={handleArrowClick} className={` carousel__arrow-button carousel__arrow-button--left`}>
        <svg> 
          <use xlinkHref="/sprite.svg#icon-arrow-with-circle-down"></use>
        </svg>
      </div>
      <div onClick={handleArrowClick} className={` carousel__arrow-button carousel__arrow-button--right `}>
        <svg> 
          <use xlinkHref="/sprite.svg#icon-arrow-with-circle-down"></use>
        </svg>
      </div>
      <div className="carousel__buttons">
        {renderCarouselButton()}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    viewPortWidth: state.general.viewPortWidth,
  }
}

export default connect(mapStateToProps, {

})(Carousel);