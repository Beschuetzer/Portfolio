import React from 'react';

const ReferenceItem = ({number, name, phone, email, relation, href}) => {

  return (
    <React.Fragment>
      <div className='references__name'>
        <span className='references__number'>{number}.</span>
        {href ?
          <a target="_blank" rel='noreferrer' href={href} className='references__name-text references__name-link'>
            {name}:
          </a>
        :
          <div className='references__name-text'>
            {name}:
          </div>
        }
      </div>
      <div className='references__relation'>
        <span className='references__tag'>Relation:</span>
        <span>{relation}</span>
      </div>
      <div className='references__phone'>
        <span className='references__tag'>Phone:</span>
        <span>{phone}</span>
      </div>
      <div className='references__email'>
        <span className='references__tag'>Email:</span>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </React.Fragment>
  );
}

export default ReferenceItem;