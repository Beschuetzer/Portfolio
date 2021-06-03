import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

const Carousel = ({images, alts, viewPortWidth, numberOfImagesInCarouselAtOneTime, numberOfImagesToScrollOnClick}) => {
  const FULLSCREEN_CLASSNAME = 'full-screen';
  const FULLSCREEN_PARENT_CLASSNAME = 'carousel__item--full-screen'
  const CSS_TRANSLATION_AMOUNT_VAR_NAME = '--carousel-image-translation-x';
  const IMAGE_CLASSNAME = 'carousel__image';
  const DOT_CLASSNAME = 'carousel__dot';
  const DOT_ACTIVE_CLASSNAME = `${DOT_CLASSNAME}--active`;
  const ARROW_BUTTONS_CLASSNAME = 'carousel__arrow-button';
  const ARROW_BUTTON_LEFT_CLASSNAME = `${ARROW_BUTTONS_CLASSNAME}--left`;
  const ARROW_BUTTON_RIGHT_CLASSNAME = `${ARROW_BUTTONS_CLASSNAME}--right`;
  const minImageCount = 0;
  let currentTranslationFactor = minImageCount;
  let imagesRef = useRef();
  let imagesWidthRef = useRef();
  let leftArrowRef = useRef();
  let rightArrowRef = useRef();

  useEffect(() => {
    leftArrowRef.current = document.querySelectorAll(`.${ARROW_BUTTON_LEFT_CLASSNAME}`);
    rightArrowRef.current = document.querySelectorAll(`.${ARROW_BUTTON_RIGHT_CLASSNAME}`);
    imagesRef.current = document.querySelectorAll(`.${IMAGE_CLASSNAME}`);
    const image1Left = imagesRef.current[0].getBoundingClientRect().left;
    const image2Left = imagesRef.current[1].getBoundingClientRect().left;
    imagesWidthRef.current = Math.abs(image1Left - image2Left);
  }, [viewPortWidth, ARROW_BUTTON_LEFT_CLASSNAME, ARROW_BUTTON_RIGHT_CLASSNAME])

  function setArrowButtonsHiddenClass (minImageCount, maxImageCount, currentTranslationFactor) {
    const leftArrow = leftArrowRef.current[0];
    const rightArrow = rightArrowRef.current[0];

    if (!leftArrow || ! rightArrow) return;

    leftArrow.classList.remove('hidden');
    rightArrow.classList.remove('hidden');

    const currentCount = +numberOfImagesInCarouselAtOneTime + (currentTranslationFactor * +numberOfImagesToScrollOnClick) - 1

    if (currentCount <= minImageCount) leftArrow.classList.add('hidden');
    if (currentCount >= maxImageCount) rightArrow.classList.add('hidden');
  }

  function setCurrentActiveButton (indexOfActiveDot) {
    const dots = document.querySelectorAll(`.${DOT_CLASSNAME}`);
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      if (i !== indexOfActiveDot) dot?.classList.remove(DOT_ACTIVE_CLASSNAME);
      else dot?.classList.add(DOT_ACTIVE_CLASSNAME);
    }
  }

  function setTranslationAmount(amountToTranslateImages) {
    const newValue = `${CSS_TRANSLATION_AMOUNT_VAR_NAME}: -${amountToTranslateImages}px`;
    document.documentElement.style.cssText += newValue;
  }

  const handleArrowClick = (e) => {
    const maxImageCount = +numberOfImagesToScrollOnClick === 1 ? (images.length - numberOfImagesInCarouselAtOneTime) : images.length - 1;

    let hasClickedLeftArrow = false;
    if (e.currentTarget?.classList.contains(ARROW_BUTTON_LEFT_CLASSNAME)) hasClickedLeftArrow = true;

    if (hasClickedLeftArrow) {
      if (!Number.isInteger(currentTranslationFactor)) currentTranslationFactor = Math.floor(currentTranslationFactor);
      else currentTranslationFactor -= 1;
    }
    else {
      if (!Number.isInteger(currentTranslationFactor)) currentTranslationFactor = Math.ceil(currentTranslationFactor);
      else currentTranslationFactor += 1;
    }

    setCurrentActiveButton(currentTranslationFactor * numberOfImagesToScrollOnClick);

    // console.log('numberOfImagesInCarouselAtOneTime =', numberOfImagesInCarouselAtOneTime);
    // console.log('numberOfImagesToScrollOnClick =', 
    // numberOfImagesToScrollOnClick);
    // console.log('maxImageCount =', maxImageCount);

    if (currentTranslationFactor * numberOfImagesToScrollOnClick < minImageCount) {
      return currentTranslationFactor = minImageCount;
    }
    else if (currentTranslationFactor * numberOfImagesToScrollOnClick > maxImageCount) {
      return currentTranslationFactor = Math.floor(maxImageCount / numberOfImagesToScrollOnClick);
    }

    setArrowButtonsHiddenClass(numberOfImagesInCarouselAtOneTime - 1, images.length - 1, currentTranslationFactor);

    const amountToTranslateImages = imagesWidthRef.current * currentTranslationFactor * numberOfImagesToScrollOnClick;
    setTranslationAmount(amountToTranslateImages)
  }

  const handleDotClick = (e) => {
    let indexOfCurrentDot = -1;
    let indexOfDotToMoveTo = -1;

    const dots = document.querySelectorAll(`.${DOT_CLASSNAME}`);
    const clickedOnDot = e.currentTarget;

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      if (dot === clickedOnDot) indexOfDotToMoveTo = i;
      else if (dot?.classList.contains(DOT_ACTIVE_CLASSNAME)) indexOfCurrentDot = i;

      if (indexOfCurrentDot !== -1 && indexOfDotToMoveTo !== -1) break;
    }

    const amountToTranslateImages = imagesWidthRef.current * indexOfDotToMoveTo;

    currentTranslationFactor = indexOfDotToMoveTo / numberOfImagesToScrollOnClick;

    setArrowButtonsHiddenClass(0, images.length - 1, currentTranslationFactor);

    setTranslationAmount(amountToTranslateImages)
    dots[indexOfDotToMoveTo]?.classList.add(DOT_ACTIVE_CLASSNAME);
    dots[indexOfCurrentDot]?.classList.remove(DOT_ACTIVE_CLASSNAME);
  }

  const handleImageClick = (e) => {
    const image = e.currentTarget;
    if (!image) return;
    e.preventDefault();
    image.classList.toggle(FULLSCREEN_CLASSNAME);
    image.parentNode?.classList.toggle(FULLSCREEN_PARENT_CLASSNAME)
  }

  const renderImages = () => {
    return images.map((image, index) => {
      return (
        <article key={index} className="carousel__item">
          <img 
            src={image}
            className={`${IMAGE_CLASSNAME}`} 
            alt={alts[index]}
            key={index}
            onClick={handleImageClick}
          />
          <p className="carousel__image-description">
            {alts[index]}
          </p>
        </article>
      )
    })
  }

  const renderCarouselButtons = () => {
    return images.map((image, index) => {
      return (
          <svg 
            key={index} 
            className={`
              ${DOT_CLASSNAME}
              ${DOT_CLASSNAME}-${index}
              ${index === 0 ? DOT_ACTIVE_CLASSNAME : ''}
            `}
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
      <div 
        onClick={handleArrowClick} 
        className={`hidden ${ARROW_BUTTONS_CLASSNAME} ${ARROW_BUTTON_LEFT_CLASSNAME}`}
      >
        <svg> 
          <use xlinkHref="/sprite.svg#icon-arrow-with-circle-down"></use>
        </svg>
      </div>
      <div 
        onClick={handleArrowClick} 
        className={` ${ARROW_BUTTONS_CLASSNAME} ${ARROW_BUTTON_RIGHT_CLASSNAME} `}
      >
        <svg> 
          <use xlinkHref="/sprite.svg#icon-arrow-with-circle-down"></use>
        </svg>
      </div>
      <div className="carousel__dots">
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