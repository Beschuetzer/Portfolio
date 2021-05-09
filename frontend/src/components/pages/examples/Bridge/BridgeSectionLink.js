import React from 'react';
import { connect } from 'react-redux';

import { setCurrentBridgeSection } from '../../../../actions';

const BridgeSectionLink = ({bridgeSections, currentBridgeSection, setCurrentBridgeSection, sectionToSkipTo, content}) => {

  const getSkipDirectionAndSkips = (e) => {
    let skipToSectionNumber = -1;
    for (let i = 0; i < bridgeSections.length; i++) {
      const bridgeSection = bridgeSections[i];
      if (bridgeSection.id === sectionToSkipTo.toLowerCase()) {
        skipToSectionNumber = i;
        break;
      }
    }
    return (skipToSectionNumber - currentBridgeSection);
  }

  const navigateToSection = (e) => {
    const numberOfSkips = getSkipDirectionAndSkips(e);
    if (numberOfSkips < 0) {
      const valueToUse = currentBridgeSection + numberOfSkips;
      setCurrentBridgeSection(valueToUse >= 0 ? valueToUse : 0)
    }
    else if (numberOfSkips > 0) {
      const valueToUse = currentBridgeSection + numberOfSkips;
      setCurrentBridgeSection(valueToUse < bridgeSections.length  ? valueToUse : (bridgeSections.length - 1))
    }
  }

  return (
    <span onClick={navigateToSection} className="bridge__link">{content}</span>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentBridgeSection: state.bridge.currentBridgeSection,
    bridgeSections: state.bridge.bridgeSections,
    numberOfSkips: parseInt(ownProps.numberOfSkips),
  }
}

export default connect(mapStateToProps, {
  setCurrentBridgeSection,
})(BridgeSectionLink);