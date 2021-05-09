import React from "react";
import { useRef } from 'react';
import { connect } from 'react-redux';

import { setClickedBridgeInfoButtonCount } from '../../../../actions';

import {
  toggleSecondInfoButtonClick,
  handleBridgeHeroSounds,
  showBridgeHero,
} from '../../../constants';

import Video from '../../../Video';
import bgVideo from '../../../../clips/animation-roundEndDummy.mp4';

const BridgeHero = ({sounds, isMobile, setClickedBridgeInfoButtonCount, clickedBridgeInfoButtonCount}) => {
	//my idea here is to have a centered diamond background that has has the section or A # Maj Bridge words around the four corners.  Inside the diamond, there are other suits and a background video?
  const checkBoxRef = useRef();
  const backgroundRef = useRef();
  const hero = useRef();
  const heroMore = useRef();
  const headerHeight = document.querySelector('#header').getBoundingClientRect().height;

  const handleMoreClick = (e) => {
    if(clickedBridgeInfoButtonCount === 0) {
      showBridgeHero(heroMore);
    }
    else if (clickedBridgeInfoButtonCount > 0){
      toggleSecondInfoButtonClick(hero.current, heroMore.current);
    }

    handleBridgeHeroSounds(checkBoxRef.current, backgroundRef.current, sounds, isMobile, headerHeight);

    setClickedBridgeInfoButtonCount(clickedBridgeInfoButtonCount + 1);
  }

	return (
    <React.Fragment>
      {/* <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Spectral:wght@200;400;800&display=swap" rel="stylesheet"></link> */}

      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=New+Tegomin&display=swap" rel="stylesheet"/>

      
      <input ref={checkBoxRef} id='hero__more-checkbox' type='checkbox'></input>
      <div className="hero" ref={hero}>
        <div onClick={handleMoreClick} className="hero__more" ref={heroMore}>
          <label htmlFor='hero__more-checkbox'>
            <svg className="hero__svg1">
              <use xlinkHref="/sprite.svg#icon-help"></use>
            </svg>
            <svg className="hero__svg2">
              <use xlinkHref="/sprite.svg#icon-arrow-with-circle-down"></use>
            </svg>
          </label>
          <div className="hero__bridge-logo"></div>
        </div>
        <div className="hero__background" ref={backgroundRef}></div>

        <Video
          src={bgVideo}
          type='mp4'
          className="bg-video"
        />
        <a target="_blank" rel="noreferrer" href="https://github.com/Beschuetzer/Bridge" className="hero__source">
          <span className="hero__source-label">Code</span>
          <svg className="hero__source-svg">
            <use xlinkHref="/sprite.svg#icon-code"></use>
          </svg>
        </a>
        <span className="hero__heading heading--one">Making</span>
        <span className="hero__heading heading--one">A#</span>
        <span className="hero__heading heading--one">Maj</span>
        <span className="hero__heading heading--one">Bridge</span>
      </div>
    </React.Fragment>
	);
};

const mapStateToProps = (state, ownProps) => {
  return {
    sounds: state.sounds,
    isMobile: state.general.isMobile,
    clickedBridgeInfoButtonCount: state.bridge.clickedBridgeInfoButtonCount,
  }
}

export default connect(mapStateToProps,
{
  setClickedBridgeInfoButtonCount,
})(BridgeHero);
