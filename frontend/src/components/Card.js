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

  const handleVideoEnd = (e) => {
    console.log('end------------------------------------------------');
    const video = e.currentTarget;
    const checkbox = checkboxRef.current
    checkbox.checked = false;
    cardRef.current?.classList.remove('card--playing');
    video.removeEventListener('ended', handleVideoEnd);
  }

  const centerCard = (e) => {
    //idea is to get the bridge__section-content dimensions and the cards dimensions, then to change the cards dimensions via a translate class to get it to be positioned in the center of the content box
    const card = cardRef.current;
    if (!card) return;

    console.log('card.parentNode =', card.parentNode);
    const sectionDimensions = card.parentNode.getBoundingClientRect();
    const cardDimensions = card.getBoundingClientRect();
    // debugger

    const cardLeftOriginal = (cardDimensions.left + cardDimensions.width * 1 / 6);
    const cardTopOriginal = (cardDimensions.top + cardDimensions.height * 1 / 6);

    //TODO: try another approach;  center the card in the content box then scale it 

    const translateLeftAmount = Math.abs(cardLeftOriginal - sectionDimensions.left);
    const translateUpAmount = Math.abs(cardTopOriginal - sectionDimensions.top);
    const scaleXFactor = (sectionDimensions.width - cardDimensions.width) / cardDimensions.width * 1.5;
    const scaleYFactor = (sectionDimensions.height - cardDimensions.height) / cardDimensions.height * 1.5;

    console.log('translateLeftAmount =', translateLeftAmount);
    console.log('translateUpAmount =', translateUpAmount);
    console.log('scaleXFactor =', scaleXFactor);
    console.log('scaleYFactor =', scaleYFactor);

    const newTransform = `
      translateX(${-translateLeftAmount}px) 
      translateY(${-translateUpAmount}px) 
      scaleX(${1}) 
      scaleY(${1})
      ;
    `;

    const newValue = `--card-playing-transform: ${newTransform}`;

    document.documentElement.style.cssText += newValue;
  }

  const handleClick = (e) => {
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
    <article ref={cardRef} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} onClick={handleClick} className='card card--hoverable'>
      <input ref={checkboxRef} className="card__checkbox" type="checkbox"/>
      <svg className="card__play card__current-svg">
        <use xlinkHref="/sprite.svg#icon-play"></use>
      </svg>
      <svg className="card__stop">
        <use xlinkHref="/sprite.svg#icon-stop"></use>
      </svg>
      <svg className="card__pause">
        <use xlinkHref="/sprite.svg#icon-pause"></use>
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