import React from 'react';
import { useRef } from 'react';

import Video from '../components/Video';
import { capitalize } from '../helpers'

const Card = ({title, cardName, fileType = 'svg', children, video}) => {
  const videoRef = useRef();

  const handleClick = (e) => {
    
    const video = videoRef?.current;
    if (!video) return;
    if (video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2) video.pause();
    else video.play();
  }

  return (
    <article onClick={handleClick} className='card'>
      <svg className="card__play">
        <use xlinkHref="/sprite.svg#icon-play"></use>
      </svg>
      <svg className="card__stop">
        <use xlinkHref="/sprite.svg#icon-stop"></use>
      </svg>
      <svg className="card__pause">
        <use xlinkHref="/sprite.svg#icon-pause"></use>
      </svg>
      <img className='card__image' alt={capitalize(cardName.replace('-', ' '))} src={`/${cardName}.${fileType}`}/>
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
    </article>
  );
}

export default Card;