import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

const Carousel = ({images, alts, viewPortWidth, numberOfImagesInCarouselAtOneTime, numberOfImagesToScrollOnClick}) => {
  const minImageCount = 0;
  let currentTranslationFactor = minImageCount;
  let imagesRef = useRef();
  let imagesWidthRef = useRef();
  let leftArrowRef = useRef();
  let rightArrowRef = useRef();

  useEffect(() => {
    leftArrowRef.current = document.querySelectorAll('.carousel__arrow-button--left');
    rightArrowRef.current = document.querySelectorAll('.carousel__arrow-button--right');
    imagesRef.current = document.querySelectorAll('.carousel__image');
    const image1Left = imagesRef.current[0].getBoundingClientRect().left;
    const image2Left = imagesRef.current[1].getBoundingClientRect().left;
    imagesWidthRef.current = Math.abs(image1Left - image2Left);
  }, [viewPortWidth])

  function setArrowButtonsHiddenClass (minImageCount, maxImageCount, currentTranslationFactor) {
    const leftArrow = leftArrowRef.current[0];
    const rightArrow = rightArrowRef.current[0];

    if (!leftArrow || ! rightArrow) return;

    leftArrow.classList.remove('hidden');
    rightArrow.classList.remove('hidden');

    const currentCount = +numberOfImagesInCarouselAtOneTime + (currentTranslationFactor * +numberOfImagesToScrollOnClick) - 1

    console.log('currentCount =', currentCount);
    console.log('minImageCount =', minImageCount);
    if (currentCount <= minImageCount) leftArrow.classList.add('hidden');
    if (currentCount >= maxImageCount) rightArrow.classList.add('hidden');
  }

  const handleArrowClick = (e) => {
    const maxImageCount = +numberOfImagesToScrollOnClick === 1 ? (images.length - numberOfImagesInCarouselAtOneTime) : images.length - 1;


    let hasClickedLeftArrow = false;
    if (e.currentTarget?.classList.contains('carousel__arrow-button--left')) hasClickedLeftArrow = true;

    if (hasClickedLeftArrow) currentTranslationFactor -= 1;
    else currentTranslationFactor += 1;

    console.log('currentTranslationFactor =', 
    currentTranslationFactor);
    console.log('numberOfImagesInCarouselAtOneTime =', numberOfImagesInCarouselAtOneTime);
    console.log('numberOfImagesToScrollOnClick =', 
    numberOfImagesToScrollOnClick);
    console.log('maxImageCount =', maxImageCount);
    

    if (currentTranslationFactor * numberOfImagesToScrollOnClick < minImageCount) {
      return currentTranslationFactor = minImageCount;
    }
    else if (currentTranslationFactor * numberOfImagesToScrollOnClick > maxImageCount) {
      return currentTranslationFactor = Math.floor(maxImageCount / numberOfImagesToScrollOnClick);
    }

    setArrowButtonsHiddenClass(numberOfImagesInCarouselAtOneTime - 1, images.length - 1, currentTranslationFactor);
    
    const amountToTranslateImages = imagesWidthRef.current * currentTranslationFactor * numberOfImagesToScrollOnClick;
    const newValue = `--carousel-image-translation-x: -${amountToTranslateImages}px`;
    document.documentElement.style.cssText += newValue;
  }

  const handleDotClick = (e) => {
    console.log('e =', e);
  }

  const handleImageClick = (e) => {
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
            onClick={handleImageClick}
          />
        // </article>
      )
    })
  }

  const renderCarouselButtons = () => {
    return images.map((image, index) => {
      return (
          <svg 
            key={index} 
            className={`carousel__dot-image-${index}`}
            onClick={handleDotClick}
          > 
            <use xlinkHref="/sprite.svg#icon-dot-single"></use>
          </svg>
      )
    });
  }

  return (
    <React.Fragment>
      <article className="carousel">
        {renderImages()}
      </article>
      <div onClick={handleArrowClick} className={` hidden carousel__arrow-button carousel__arrow-button--left`}>
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
        {renderCarouselButtons()}
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