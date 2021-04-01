import React from 'react';

const ReferenceItem = ({name, phone, email, relation, href}) => {

  const relationWords = relation.split(' ');
  const relationIsMultipleWords = relationWords.length > 1;
  const relationMiddleIndex = Math.ceil(relationWords.length / 2);

  const proposedRelationTopRowOne = relationWords.slice(0, (relationMiddleIndex)).join(' ')
  const proposedRelationBottomRowOne = relationWords.slice(relationMiddleIndex).join(' ')
  const differenceInCharacterLengthOne = Math.abs(proposedRelationTopRowOne - proposedRelationBottomRowOne).length;

  const proposedRelationTopRowTwo = relationWords.slice(0, (relationMiddleIndex)).join(' ')
  const proposedRelationBottomRowTwo = relationWords.slice(relationMiddleIndex).join(' ')
  const differenceInCharacterLengthTwo = Math.abs(proposedRelationTopRowTwo - proposedRelationBottomRowTwo).length;

  let topRowToUse = proposedRelationTopRowOne;
  let bottomRowToUse = proposedRelationBottomRowOne;

  if (differenceInCharacterLengthOne > differenceInCharacterLengthTwo) {
    topRowToUse = proposedRelationTopRowOne;
    bottomRowToUse = proposedRelationBottomRowOne;
  }

  //TODO: test this component with different length relations

  //compare the two different arrangements and use the one with the smaller character length difference

  return (
    <React.Fragment>
      {href ?
        <a target="_blank" rel='noreferrer' href={href} className='references__name--link'>{name}</a>
      :
        <span className='references__name'>{name}</span>
      }
      {relationIsMultipleWords ?
        
        <div className='references__relation-words'>
          <div className='references__relation-word-one'>{topRowToUse}</div>
          <div className='references__relation-word-rest'>{bottomRowToUse}</div>
        </div>
      : 
        <span className='references__relation'>{relation}</span>
      }
      <span className='references__phone'>{phone}</span>
      <span className='references__email'>{email}</span>
    </React.Fragment>
  );
}

export default ReferenceItem;