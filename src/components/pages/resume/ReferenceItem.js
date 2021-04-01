import React from 'react';

const ReferenceItem = ({number, name, phone, email, relation, href}) => {

  const relationWords = relation.split(' ');
  const relationIsMultipleWords = false;
  // const relationIsMultipleWords = relationWords.length > 1;
  // const relationMiddleIndex = Math.ceil(relationWords.length / 2);

  // const proposedRelationTopRowOne = relationWords.slice(0, (relationMiddleIndex)).join(' ')
  // const proposedRelationBottomRowOne = relationWords.slice(relationMiddleIndex).join(' ')
  // const differenceInCharacterLengthOne = Math.abs(proposedRelationTopRowOne - proposedRelationBottomRowOne).length;

  // const proposedRelationTopRowTwo = relationWords.slice(0, (relationMiddleIndex)).join(' ')
  // const proposedRelationBottomRowTwo = relationWords.slice(relationMiddleIndex).join(' ')
  // const differenceInCharacterLengthTwo = Math.abs(proposedRelationTopRowTwo - proposedRelationBottomRowTwo).length;

  // let topRowToUse = proposedRelationTopRowOne;
  // let bottomRowToUse = proposedRelationBottomRowOne;

  // if (differenceInCharacterLengthOne > differenceInCharacterLengthTwo) {
  //   topRowToUse = proposedRelationTopRowOne;
  //   bottomRowToUse = proposedRelationBottomRowOne;
  // }

  //TODO: test this component with different length relations

  //compare the two different arrangements and use the one with the smaller character length difference

  return (
    <React.Fragment>
      {href ?
        <a target="_blank" rel='noreferrer' href={href} className='references__name references__name--link'>
          <span className='references__number'>{number}.</span>
          {name}:
        </a>
      :
        <div className='references__name'>{name}:</div>
      }
      {relationIsMultipleWords ?
        null
        // <div className='references__relation-words'>
        //   <div className='references__relation-word-one'>{topRowToUse}</div>
        //   <div className='references__relation-word-rest'>{bottomRowToUse}</div>
        // </div>
      : 
        <div className='references__relation'>{relation}</div>
      }
      <div className='references__phone'>{phone}</div>
      <div className='references__email'>{email}</div>
    </React.Fragment>
  );
}

export default ReferenceItem;