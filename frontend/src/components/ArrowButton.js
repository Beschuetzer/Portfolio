import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { setCurrentBridgeSection, setBridgeSections } from '../actions';
import {
  COLOR_PRIMARY_BRIDGE_1,
  COLOR_PRIMARY_BRIDGE_2,
  COLOR_PRIMARY_BRIDGE_3,
  COLOR_PRIMARY_BRIDGE_4,
} from './constants';

const ArrowButton = ({direction, fillNumber, hoverFillNumber, setCurrentBridgeSection, currentBridgeSection, bridgeSections, setBridgeSections, clickedBridgeInfoButtonCount}) => {

  //Initial setup, storing sections
  useEffect(() => {
    // if (bridgeSections) return;
    const sections = document.querySelectorAll('.bridge__section');
    setBridgeSections(sections);
  }, [setBridgeSections])

  //Handling Updates
  useEffect(() => {
    const leftArrow = document.querySelector('.arrow-button--left');
    const rightArrow = document.querySelector('.arrow-button--right'); 
    if (!bridgeSections) return;
    
    const handleDisplay = (arrowElement) => {
      if (arrowElement?.className.match(/left/i)) {
        if (rightArrow && currentBridgeSection < bridgeSections.length - 1 && clickedBridgeInfoButtonCount > 1) rightArrow.classList.remove('hidden');
  
        if(leftArrow && currentBridgeSection === 0) leftArrow.classList.add('hidden');
      }
      else {
        if (leftArrow && currentBridgeSection > 0) leftArrow.classList.remove('hidden');
  
        if(rightArrow && ((currentBridgeSection === bridgeSections.length - 1) || (clickedBridgeInfoButtonCount > 1 && currentBridgeSection === 0))) rightArrow.classList.add('hidden');
      }
    }

    const handleSliding = () => {
      console.log('currentBridgeSection =', currentBridgeSection);
      for (let i = 0; i < bridgeSections.length; i++) {
        const section = bridgeSections[i];
        if (!section) return;
  
        if (i !== currentBridgeSection) section.classList.remove('current-section')
  
        if (i < currentBridgeSection) {
          section.classList.add('slide-left');
        }
        else if (i === currentBridgeSection) {
          section.classList.remove('slide-left');
          section.classList.add('current-section');
        }
        else {
          section.classList.remove('slide-left');
        };
      }
    }

    const handleArrowColors = () => {
      const arrowColors = {
        0: {
          normal: {
            left: COLOR_PRIMARY_BRIDGE_1,
            right: COLOR_PRIMARY_BRIDGE_1,
          },
          hover: {
            left: COLOR_PRIMARY_BRIDGE_4,
            right: COLOR_PRIMARY_BRIDGE_4,
          }
        },
        1: {
          normal: {
            left: COLOR_PRIMARY_BRIDGE_1,
            right: COLOR_PRIMARY_BRIDGE_2,
          },
          hover: {
            left: COLOR_PRIMARY_BRIDGE_4,
            right: COLOR_PRIMARY_BRIDGE_1,
          }
        },
        2: {
          normal: {
            left: COLOR_PRIMARY_BRIDGE_1,
            right: COLOR_PRIMARY_BRIDGE_3,
          },
          hover: {
            left: COLOR_PRIMARY_BRIDGE_2,
            right: COLOR_PRIMARY_BRIDGE_4,
          }
        },
        3: {
          normal: {
            left: COLOR_PRIMARY_BRIDGE_1,
            right: COLOR_PRIMARY_BRIDGE_1,
          },
          hover: {
            left: COLOR_PRIMARY_BRIDGE_4,
            right: COLOR_PRIMARY_BRIDGE_4,
          }
        },
      }

      document.documentElement.style.setProperty('--arrow-button-left-fill', arrowColors[currentBridgeSection].normal.left);
      document.documentElement.style.setProperty('--arrow-button-right-fill', arrowColors[currentBridgeSection].normal.right);
      document.documentElement.style.setProperty('--arrow-button-left-fill-hover', arrowColors[currentBridgeSection].hover.left);
      document.documentElement.style.setProperty('--arrow-button-right-fill-hover', arrowColors[currentBridgeSection].hover.right);
    }

    //NOTE: handleDisplay(rightArrow) must come before handleDisplay(leftArrow) 
    handleDisplay(rightArrow);
    handleDisplay(leftArrow);
    handleArrowColors();
    handleSliding();
    
  }, [currentBridgeSection, bridgeSections, clickedBridgeInfoButtonCount])
  
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
    <div onClick={handleClick} className={`hidden arrow-button arrow-button--${direction}`}>
      <svg> 
        <use xlinkHref="/sprite.svg#icon-arrow-with-circle-down"></use>
      </svg>
      {/* <svg className={`arrow-button__fill-${fillNumber} arrow-button__hover-fill-${hoverFillNumber}`}>
        <use xlinkHref="/sprite.svg#icon-arrow-with-circle-down"></use>
      </svg> */}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentBridgeSection: state.bridge.currentBridgeSection,
    bridgeSections: state.bridge.bridgeSections,
    clickedBridgeInfoButtonCount: state.bridge.clickedBridgeInfoButtonCount,
  }
}

export default connect(mapStateToProps, {
  setCurrentBridgeSection,
  setBridgeSections,
})(ArrowButton);