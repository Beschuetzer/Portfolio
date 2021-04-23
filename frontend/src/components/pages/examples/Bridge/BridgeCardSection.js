import React from 'react';

const BridgeCardSection = ({title, children}) => {
  return (
    <div className="bridge__card-section">
      <h3>{title}</h3>
      <article className="bridge__subsection-content">
        {children}
      </article>
    </div>
  );
}

export default BridgeCardSection;