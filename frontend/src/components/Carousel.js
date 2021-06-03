import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { CAROUSEL_TRANSLATION_CSS_CLASSNAME } from './constants';

const Carousel = ({images: items, alts, viewPortWidth, numberOfItemsInCarouselAtOneTime, numberOfItemsToScrollOnClick}) => {
  const FULLSCREEN_CLASSNAME = 'full-screen';
  const FULLSCREEN_PARENT_CLASSNAME = 'carousel__item--full-screen'
  const IMAGE_CLASSNAME = 'carousel__image';
  const ITEM_CLASSNAME = 'carousel__item';
  const DESCRIPTION_CLASSNAME = `${IMAGE_CLASSNAME}-description`;
  
  const DOT_CLASSNAME = 'carousel__dot';
  const DOT_ACTIVE_CLASSNAME = `${DOT_CLASSNAME}--active`;
  const ARROW_BUTTONS_CLASSNAME = 'carousel__arrow-button';
  const ARROW_BUTTON_LEFT_CLASSNAME = `${ARROW_BUTTONS_CLASSNAME}--left`;
  const ARROW_BUTTON_RIGHT_CLASSNAME = `${ARROW_BUTTONS_CLASSNAME}--right`;
  const minImageCount = 0;
  let currentTranslationFactor = minImageCount;
  let itemsRef = useRef();
  let itemsWidthRef = useRef();
  let leftArrowRef = useRef();
  let rightArrowRef = useRef();

  useEffect(() => {
    leftArrowRef.current = document.querySelectorAll(`.${ARROW_BUTTON_LEFT_CLASSNAME}`);
    rightArrowRef.current = document.querySelectorAll(`.${ARROW_BUTTON_RIGHT_CLASSNAME}`);
    itemsRef.current = document.querySelectorAll(`.${IMAGE_CLASSNAME}`);
    const image1Left = itemsRef.current[0].getBoundingClientRect().left;
    const image2Left = itemsRef.current[1].getBoundingClientRect().left;
    itemsWidthRef.current = Math.abs(image1Left - image2Left);
  }, [viewPortWidth, ARROW_BUTTON_LEFT_CLASSNAME, ARROW_BUTTON_RIGHT_CLASSNAME])

  function setArrowButtonsHiddenClass (minImageCount, maxImageCount, currentTranslationFactor) {
    const leftArrow = leftArrowRef.current[0];
    const rightArrow = rightArrowRef.current[0];

    if (!leftArrow || ! rightArrow) return;

    leftArrow.classList.remove('hidden');
    rightArrow.classList.remove('hidden');

    const currentCount = +numberOfItemsInCarouselAtOneTime + (currentTranslationFactor * +numberOfItemsToScrollOnClick) - 1

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
    const newValue = `${CAROUSEL_TRANSLATION_CSS_CLASSNAME}: -${amountToTranslateImages}px`;
    document.documentElement.style.cssText += newValue;
  }

  const handleArrowClick = (e) => {
    const maxImageCount = +numberOfItemsToScrollOnClick === 1 ? (items.length - numberOfItemsInCarouselAtOneTime) : items.length - 1;

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

    setCurrentActiveButton(currentTranslationFactor * numberOfItemsToScrollOnClick);

    // console.log('numberOfImagesInCarouselAtOneTime =', numberOfImagesInCarouselAtOneTime);
    // console.log('numberOfImagesToScrollOnClick =', 
    // numberOfImagesToScrollOnClick);
    // console.log('maxImageCount =', maxImageCount);

    if (currentTranslationFactor * numberOfItemsToScrollOnClick < minImageCount) {
      return currentTranslationFactor = minImageCount;
    }
    else if (currentTranslationFactor * numberOfItemsToScrollOnClick > maxImageCount) {
      return currentTranslationFactor = Math.floor(maxImageCount / numberOfItemsToScrollOnClick);
    }

    setArrowButtonsHiddenClass(numberOfItemsInCarouselAtOneTime - 1, items.length - 1, currentTranslationFactor);

    const amountToTranslateImages = itemsWidthRef.current * currentTranslationFactor * numberOfItemsToScrollOnClick;
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

    const amountToTranslateImages = itemsWidthRef.current * indexOfDotToMoveTo;

    currentTranslationFactor = indexOfDotToMoveTo / numberOfItemsToScrollOnClick;

    setArrowButtonsHiddenClass(0, items.length - 1, currentTranslationFactor);

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
    return items.map((image, index) => {
      return (
        <article key={index} className={ITEM_CLASSNAME}>
          <img 
            src={image}
            className={`${IMAGE_CLASSNAME}`} 
            alt={alts[index]}
            key={index}
            onClick={handleImageClick}
          />
          <p className={DESCRIPTION_CLASSNAME}>
            {alts[index]}
          </p>
        </article>
      )
    })
  }

  const renderCarouselButtons = () => {
    return items.map((image, index) => {
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