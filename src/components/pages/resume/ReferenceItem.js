import React from 'react';

const ReferenceItem = ({name, phone, email, relation, href}) => {


  return (
    <React.Fragment>
      {href ?
        <a target="_blank" rel='noreferrer' href={href} className='references__name--link'>{name}</a>
      :
        <span className='references__name'>{name}</span>
      }
      <span className='references__relation'>{relation}</span>
      <span className='references__phone'>{phone}</span>
      <span className='references__email'>{email}</span>
    </React.Fragment>
  );
}

export default ReferenceItem;