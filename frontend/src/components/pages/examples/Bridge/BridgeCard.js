import React from 'react';

const BridgeCard = ({children, titleSize = 'two', titleContent, titleSubtitle = ""}) => {
  return (
    <div className="bridge__card">
      <div className="bridge__section-titles">
        <h2 className={`heading--${titleSize} bridge__section-title`}>{titleContent}</h2>
        {titleSubtitle !== '' ? 
          <h4 className='heading--five'>{titleSubtitle}</h4>
        :
          null
        }
      </div>
      <div className='bridge__section-content'>
        {children}
      </div>
    </div>
  );
}

export default BridgeCard;