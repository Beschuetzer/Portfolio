import React from 'react';

const SourceCodeLink = ({href, blockName = "source-link", msg = "Code"}) => {
  return (
    <a 
      target="_blank" 
      rel="noreferrer" 
      href={href}
      className={`${blockName}__source`}
    >
      <svg className={`${blockName}__source-svg`}>
        <use xlinkHref="/sprite.svg#icon-code"></use>
      </svg>
      <span className={`${blockName}__source-label`}>{msg}</span>
    </a>
  );
}

export default SourceCodeLink;