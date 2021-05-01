import React from 'react';
import { useRef } from 'react';

import Video from '../components/Video';
import { capitalize } from '../helpers'

const Card = ({title, cardName, children, video}) => {
  const videoRef = useRef();

  const handleClick = (e) => {
    console.dir(videoRef.current);
    if (videoRef.current.currentTime > 0 && !videoRef.current.paused && !videoRef.current.ended && videoRef.current.readyState > 2) videoRef.current.pause();
    else videoRef.current.play();
  }

  return (
    <article onClick={handleClick} className='card'>
      <img className='card__image' alt={capitalize(cardName.replace('-', ' '))} src={`/${cardName}.svg`}/>
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