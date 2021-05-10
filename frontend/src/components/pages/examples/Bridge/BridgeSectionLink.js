import React from 'react';
import { useRef } from 'react';
import { connect } from 'react-redux';

import { 
  setCurrentBridgeSection, 
  setClickedBridgeInfoButtonCount,
  setHasClickedALink,
} from '../../../../actions';
import { 
  toggleSecondInfoButtonClick,
  handleBridgeHeroSounds,
  showBridgeHero,
} from '../../../constants';

const BridgeSectionLink = ({isEmbeddedLink = false, bridgeSections, currentBridgeSection, setCurrentBridgeSection, sectionToSkipTo, content, match, sounds, isMobile, headerHeight, setClickedBridgeInfoButtonCount, setHasClickedALink, hasClickedALink}) => {
  const spanRef = useRef(null);

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

    if (match && match.url.match(/bridge/i)) {
      const hero = document.querySelector('.hero');
      const heroMore = document.querySelector('.hero__more');
      const checkBoxRef = document.querySelector('#hero__more-checkbox')
      const backgroundRef = document.querySelector('.hero__background')

      showBridgeHero(heroMore);

      toggleSecondInfoButtonClick(hero, heroMore, false, spanRef.current);
      setClickedBridgeInfoButtonCount(2);

      if (!hasClickedALink) {
        handleBridgeHeroSounds(checkBoxRef, backgroundRef, sounds, isMobile, headerHeight);
        setHasClickedALink(true);
      }
    }
  }

  let classToUse = 'bridge__page-nav-link page-nav__section';
  if (isEmbeddedLink) classToUse = 'bridge__link';

  return (
    <span ref={spanRef} onClick={navigateToSection} className={classToUse}>{content}</span>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentBridgeSection: state.bridge.currentBridgeSection,
    bridgeSections: state.bridge.bridgeSections,
    hasClickedALink: state.bridge.hasClickedALink,
    headerHeight: state.general.headerHeight,
    isMobile: state.general.isMobile,
    sounds: state.sounds,
    numberOfSkips: parseInt(ownProps.numberOfSkips),
  }
}

export default connect(mapStateToProps, {
  setCurrentBridgeSection,
  setClickedBridgeInfoButtonCount,
  setHasClickedALink,
})(BridgeSectionLink);