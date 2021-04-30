import React from 'react';
import { connect } from 'react-redux';

import { setCurrentBridgeSection } from '../../../../actions';

const BridgeSectionLink = ({bridgeSections, currentBridgeSection, setCurrentBridgeSection, numberOfSkips, skipDirection, content}) => {

  const handleClick = (e) => {
    if (skipDirection.match(/match/i)) {
      const valueToUse = currentBridgeSection - numberOfSkips;
      setCurrentBridgeSection(valueToUse >= 0 ? valueToUse : 0)
    }
    else {
      const valueToUse = currentBridgeSection + numberOfSkips;
      setCurrentBridgeSection(valueToUse < bridgeSections.length  ? valueToUse : (bridgeSections.length - 1))
    }
  }

  return (
    <span onClick={handleClick} className="bridge__link">{content}</span>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentBridgeSection: state.general.currentBridgeSection,
    bridgeSections: state.general.bridgeSections,
    numberOfSkips: parseInt(ownProps.numberOfSkips),
  }
}

export default connect(mapStateToProps, {
  setCurrentBridgeSection,
})(BridgeSectionLink);