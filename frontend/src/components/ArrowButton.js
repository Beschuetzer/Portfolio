import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { setCurrentBridgeSection } from '../actions';

const ArrowButton = ({direction, fillNumber, hoverFillNumber, setCurrentBridgeSection, currentBridgeSection}) => {
  // useEffect(() => {
  //may not be needed --->   //TODO: set currentBridgeSection to 0 (first section)

  // }, [])
  
  const handleClick = (e) => {
    const sections = document.querySelectorAll('.bridge__section');
    //todo: every click changes the currentBridgeSection  then add/remove classes to shift them
    console.log('currentBridgeSection =', currentBridgeSection);
    if (e.currentTarget?.className.match(/left/i)) {
      console.log('left arrow------------------------------------------------');
      if (currentBridgeSection > 0) setCurrentBridgeSection(currentBridgeSection - 1)
    }
    else {
      console.log('right arrow------------------------------------------------');
      if (currentBridgeSection < (sections.length - 1)) setCurrentBridgeSection(currentBridgeSection + 1)

    }
    console.log('sections =', sections);
  }

  return (
    <div onClick={handleClick} className={`arrow-button arrow-button__${direction}`}>
      <svg className={`arrow-button__fill-${fillNumber} arrow-button__hover-fill-${hoverFillNumber}`}>
        <use xlinkHref="/sprite.svg#icon-arrow-with-circle-down"></use>
      </svg>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentBridgeSection: state.general.currentBridgeSection,
  }
}

export default connect(mapStateToProps, {
  setCurrentBridgeSection,
})(ArrowButton);