import React from 'react';
import { useRef } from 'react';

import { 
  CARD_MOUSE_LEAVE_INDEX_SWITCH_DURATION
} from './constants';
import Video from '../components/Video';
import { capitalize } from '../helpers'

const Card = ({title, cardName, fileType = 'svg', children, video}) => {
  const videoRef = useRef();
  const cardRef = useRef();
  const checkboxRef = useRef();

  const getIsVideoPlaying = (video) => {
    return video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2;
  }

  const toggleCheckbox = () => {
    const checkbox = checkboxRef.current;
    if (!checkbox) checkbox.checked = false;
    checkbox.checked = !checkbox.checked;
  }

  const closeVideo = () => {
    const checkbox = checkboxRef.current
    checkbox.checked = false;

    const card = cardRef.current;
    if (!card) return;
    card.classList.remove('card--playing');
    card.classList.remove('card--done');

  }

  const handleCloseVideo = (e) => {
    e.stopPropagation();
    closeVideo();
  }

  const handleVideoEnd = (e) => {
    console.log('end------------------------------------------------');
    cardRef.current?.classList.add('card--done');
    const video = e.currentTarget;
    video.removeEventListener('ended', handleVideoEnd);
  }

  const centerCard = (e) => {
    const card = cardRef.current;
    if (!card) return;
    
    const sectionDimensions = card.parentNode.getBoundingClientRect();
    const cardDimensions = card.getBoundingClientRect();

    const cardLeftOriginal = (cardDimensions.left + cardDimensions.width * 1 / 6);
    const cardRightOriginal = (cardDimensions.right - cardDimensions.width * 1 / 6);

    const cardTopOriginal = (cardDimensions.top + cardDimensions.height * 1 / 6);
    const cardBottomOriginal = (cardDimensions.bottom - cardDimensions.height * 1 / 6);

    const cardCenterXOriginal = (cardRightOriginal - cardLeftOriginal) / 2 + cardLeftOriginal
    const cardCenterYOriginal = (cardBottomOriginal - cardTopOriginal) / 2 + cardTopOriginal

    const containerCenterX = (sectionDimensions.right - sectionDimensions.left) / 2 + sectionDimensions.left
    const containerCenterY = (sectionDimensions.bottom - sectionDimensions.top) / 2 + sectionDimensions.top

    let translateLeftAmount = Math.abs(cardCenterXOriginal - containerCenterX);
    let translateUpAmount = Math.abs(cardCenterYOriginal - containerCenterY);

    const cardOriginalWidth = cardDimensions.width * 2 / 3;
    const cardOriginalHeight = cardDimensions.height * 2 / 3;
    const scaleXFactor = sectionDimensions.width / cardOriginalWidth;
    const scaleYFactor = sectionDimensions.height / cardOriginalHeight;

    if (cardCenterXOriginal < containerCenterX) translateLeftAmount = -translateLeftAmount

    // console.log('------------------------------------------------');
    // console.log('card =', card);
    // console.log('card.parentNode =', card.parentNode);
    // console.log('cardLeftOriginal =', cardLeftOriginal);
    // console.log('cardRightOriginal =', cardRightOriginal);
    // console.log('cardDimensions =', cardDimensions);
    // console.log('sectionDimensions =', sectionDimensions);
    // console.log('containerCenterX =', containerCenterX);
    // console.log('cardCenterXOriginal =', cardCenterXOriginal);
    // console.log('containerCenterY =', containerCenterY);
    // console.log('cardCenterYOriginal =', cardCenterYOriginal);
    // console.log('translateLeftAmount =', translateLeftAmount);
    // console.log('translateUpAmount =', translateUpAmount);
    // console.log('scaleXFactor =', scaleXFactor);
    // console.log('scaleYFactor =', scaleYFactor);
    // console.log('------------------------------------------------');

    const newTransform = `
      translateX(${-translateLeftAmount}px) 
      translateY(${-translateUpAmount}px) 
      scaleX(${scaleXFactor})
      scaleY(${scaleXFactor})
      ;
    `;

    const newValue = `--card-playing-transform: ${newTransform}`;

    document.documentElement.style.cssText += newValue;
  }

  const openVideo = (e) => {
    e.stopPropagation();
    if (cardRef.current?.classList.contains('card--done')) return;
    toggleCheckbox();
    const video = videoRef?.current;
    video.addEventListener('ended', handleVideoEnd);

    const isVideoPlaying = getIsVideoPlaying(video);
    if (!video) return;
    if (isVideoPlaying) {
      video.pause();
      e.currentTarget.classList.remove('card--playing');
    }
    else {
      centerCard(e);
      video.play();
      e.currentTarget.classList.add('card--playing');
    }
  }

  const handleMouseEnter = (e) => {
    e.currentTarget?.classList.add('z-index-content')
  }

  const handleMouseLeave = (e) => {
    const target = e.currentTarget;
    setTimeout(() => {
      target?.classList.remove('z-index-content');
    }, CARD_MOUSE_LEAVE_INDEX_SWITCH_DURATION);
  }

  return (
    <article ref={cardRef} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} onClick={openVideo} className='card card--hoverable'>
      <input ref={checkboxRef} className="card__checkbox" type="checkbox"/>
      <svg className="card__play">
        <use xlinkHref="/sprite.svg#icon-play"></use>
      </svg>
      <svg className="card__stop">
        <use xlinkHref="/sprite.svg#icon-stop"></use>
      </svg>
      <svg className="card__pause">
        <use xlinkHref="/sprite.svg#icon-pause"></use>
      </svg>
      <svg onClick={handleCloseVideo} className="card__close">
        <use xlinkHref="/sprite.svg#icon-close"></use>
      </svg>
      <img className='card__image' alt={capitalize(cardName.replace('-', ' '))} src={`/${cardName}.${fileType}`}/>
      <div className='card__content'>
        <h4 className='card__title'>{title}</h4>
        <div className='card__children'>
          {children}
        </div>
        <Video
          className='fg-video'
          type="mp4"
          src={video}
          autoPlay={false}
          loop={false}
          reference={videoRef}
        />
      </div>
    </article>
  );
}

export default Card;