import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { setCurrentBridgeSection, setBridgeSections } from '../actions';

const ArrowButton = ({direction, fillNumber, hoverFillNumber, setCurrentBridgeSection, currentBridgeSection, bridgeSections, setBridgeSections, clickedBridgeInfoButtonCount}) => {

  const leftArrow = document.querySelector('.arrow-button--left');
  const rightArrow = document.querySelector('.arrow-button--right');

  //Initial setup, storing sections
  useEffect(() => {
    if (bridgeSections) return;
    const sections = document.querySelectorAll('.bridge__section');
    setBridgeSections(sections);
  }, [setBridgeSections, bridgeSections])

  //Handling Updates
  useEffect(() => {
    if (!bridgeSections) return;

    const handleDisplay = (arrowElement) => {
      if (arrowElement?.className.match(/left/i)) {
        if (rightArrow && currentBridgeSection < bridgeSections.length - 1 && clickedBridgeInfoButtonCount > 1) rightArrow.classList.remove('d-none');
  
        if(leftArrow && currentBridgeSection === 0) leftArrow.classList.add('d-none');
      }
      else {
        if (leftArrow && currentBridgeSection > 0) leftArrow.classList.remove('d-none');
  
        if(rightArrow && ((currentBridgeSection === bridgeSections.length - 1) || (clickedBridgeInfoButtonCount > 1 && currentBridgeSection === 0))) rightArrow.classList.add('d-none');
      }
    }

    handleDisplay(rightArrow);
    handleDisplay(leftArrow);

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
  }, [currentBridgeSection, bridgeSections, leftArrow, rightArrow, clickedBridgeInfoButtonCount])
  
  const handleClick = (e) => {
    if (e.currentTarget?.className.match(/left/i)) {
      if (currentBridgeSection > 0) {
        return setCurrentBridgeSection(currentBridgeSection - 1)
      }
    }
    else {
      if (currentBridgeSection < (bridgeSections.length - 1)) {
        setCurrentBridgeSection(currentBridgeSection + 1)
      }
    }
  }

  return (
    <div onClick={handleClick} className={`d-none arrow-button arrow-button--${direction}`}>
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
    clickedBridgeInfoButtonCount: state.general.clickedBridgeInfoButtonCount,
  }
}

export default connect(mapStateToProps, {
  setCurrentBridgeSection,
  setBridgeSections,
})(ArrowButton);