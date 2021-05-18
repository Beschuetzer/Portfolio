import React from 'react';

const EmbeddedLink = ({href, className = "bridge__link", children}) => {
  return (
    <React.Fragment>
      &nbsp;
      <a 
        target="_blank" 
        rel="noreferrer" 
        href={href}
        className={className}
      >
        {children}  
      </a>
      &nbsp;
    </React.Fragment>
  );
}

export default EmbeddedLink;