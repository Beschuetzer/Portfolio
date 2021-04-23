import React from 'react';

const BridgeCard = ({children, titleSize = 'two', titleContent}) => {
  return (
    <div className="bridge__card">
      <h2 className={`heading--${titleSize} bridge__section-title`}>{titleContent}</h2>
      <div className='bridge__section-content'>
        {children}
      </div>
    </div>
  );
}

export default BridgeCard;