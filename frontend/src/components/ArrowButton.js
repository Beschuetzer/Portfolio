import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { setCurrentBridgeSection, setBridgeSections } from '../actions';

const ArrowButton = ({direction, fillNumber, hoverFillNumber, setCurrentBridgeSection, currentBridgeSection, bridgeSections, setBridgeSections}) => {
  useEffect(() => {
    if (bridgeSections) return;

    const sections = document.querySelectorAll('.bridge__section');
    setBridgeSections(sections);
  }, [setBridgeSections, bridgeSections])

  useEffect(() => {
    if (!bridgeSections) return;
    for (let i = 0; i < bridgeSections.length; i++) {
      const section = bridgeSections[i];
      if (!section) return;

      if (i !== currentBridgeSection) section.classList.remove('current-section')

      if (i < currentBridgeSection) {
        section.classList.add('slide-left')
      }
      else if (i === currentBridgeSection) {
        section.classList.add('current-section')
      }
      else {
        section.classList.remove('slide-left')
      };
    }
  }, [currentBridgeSection, bridgeSections])
  
  const handleClick = (e) => {
    //todo: every click changes the currentBridgeSection  then add/remove classes to shift them
    console.log('currentBridgeSection =', currentBridgeSection);
    if (e.currentTarget?.className.match(/left/i)) {
      console.log('left arrow------------------------------------------------');
      if (currentBridgeSection > 0) return setCurrentBridgeSection(currentBridgeSection - 1)
    }
    else {
      console.log('right arrow------------------------------------------------');
      if (currentBridgeSection < (bridgeSections.length - 1)) return setCurrentBridgeSection(currentBridgeSection + 1)
    }
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
    bridgeSections: state.general.bridgeSections,
  }
}

export default connect(mapStateToProps, {
  setCurrentBridgeSection,
  setBridgeSections,
})(ArrowButton);