import React from 'react';

import { capitalize } from '../helpers'

const Card = ({title, cardName, children}) => {
  return (
    <article className='card'>
      <img className='card__image' alt={capitalize(cardName.replace('-', ' '))} src={`/${cardName}.svg`}/>
      <h4 className='card__title'>{title}</h4>
      <div className='card__children'>
        {children}
      </div>
    </article>
  );
}

export default Card;