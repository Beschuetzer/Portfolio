import React from "react";
import { useRef } from 'react';
import { connect } from 'react-redux';

import { setHasClickedBridgeInfoButton } from '../../../../actions';

import BackgroundVideo from '../../../BackgroundVideo';
import bgVideo from '../../../../clips/animation-roundEndDummy.mp4';
import DiamondFractal from "./DiamondFractal";

const BridgeHero = ({sounds, isMobile, setHasClickedBridgeInfoButton, hasClickedBridgeInfoButton}) => {
	//my idea here is to have a centered diamond background that has has the section or A # Maj Bridge words around the four corners.  Inside the diamond, there are other suits and a background video?
  const checkBoxRef = useRef();
  const backgroundRef = useRef();
  const headerHeight = document.querySelector('#header').getBoundingClientRect().height;
  const hero = document.querySelector('.hero');


  const handleMoreClick = (e) => {
    if(!hasClickedBridgeInfoButton) {
      setHasClickedBridgeInfoButton(true);
    }
    document.documentElement.style.setProperty('--bridge-section-display', 'block');
    


    if (!checkBoxRef.current?.checked) {
      sounds.play('doorFast');

      if (!backgroundRef.current) return;
      backgroundRef.current?.classList.add('visible');
      backgroundRef.current?.classList.add('reverse-ease');
    }
    else {
      sounds.play('doorNormal');
      window.scroll({
        top: isMobile ? window.innerHeight - headerHeight : window.innerHeight, 
        left: 0, 
        behavior: 'smooth' 
      });

      if (!backgroundRef.current) return;
      backgroundRef.current?.classList.remove('visible');
      backgroundRef.current?.classList.remove('reverse-ease');
    }
    // e.target.className = 'hero__more hero__more--open';
  }

	return (
    <React.Fragment>
      {/* <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Spectral:wght@200;400;800&display=swap" rel="stylesheet"></link> */}

      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=New+Tegomin&display=swap" rel="stylesheet"/>

      
      <input ref={checkBoxRef} id='hero__more-checkbox' type='checkbox'></input>
      <div className="hero">
        <div onClick={handleMoreClick} className="hero__more">
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

        <BackgroundVideo
          src={bgVideo}
          type='mp4'
        />
        {/* <div className="diamond"> */}
        <span className="hero__heading heading--one">Making</span>
        <span className="hero__heading heading--one">A#</span>
        <span className="hero__heading heading--one">Maj</span>
        <span className="hero__heading heading--one">Bridge</span>
        {/* <DiamondFractal topLeftWord="Making" /> */}
      </div>
    </React.Fragment>
	);
};

const mapStateToProps = (state, ownProps) => {
  return {
    sounds: state.sounds,
    isMobile: state.general.isMobile,
    hasClickedBridgeInfoButton: state.general.hasClickedBridgeInfoButton,
  }
}

export default connect(mapStateToProps,
{
  setHasClickedBridgeInfoButton,
})(BridgeHero);
