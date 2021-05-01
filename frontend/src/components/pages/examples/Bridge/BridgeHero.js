import React from "react";
import { useRef } from 'react';
import { connect } from 'react-redux';

import { setClickedBridgeInfoButtonCount } from '../../../../actions';

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
      let docStyle = getComputedStyle(document.documentElement);
      const defaultFontSize = docStyle.getPropertyValue('--default-font-size')
      const defaultFontSizeFloat = parseFloat(defaultFontSize);
      
      document.documentElement.style.setProperty('--bridge-section-height', '100vh');
      document.documentElement.style.setProperty('--bridge-section-padding', `${defaultFontSizeFloat * 1.5 }rem`);
      
      heroMore.current?.classList.add('hero__more--clicked');
    }
    else if (clickedBridgeInfoButtonCount > 0){
      heroMore.current?.classList.remove('hero__more--clicked');
      setTimeout(() => {
        const arrowButtonRight = document.querySelector('.arrow-button--right');
        hero.current?.classList.add('d-none');
        arrowButtonRight.classList.remove('d-none');
      }, 500)
    }


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

      if (backgroundRef.current)  {
        backgroundRef.current?.classList.remove('visible');
        backgroundRef.current?.classList.remove('reverse-ease');
      }
    }

    setClickedBridgeInfoButtonCount(clickedBridgeInfoButtonCount + 1);
    console.log('clickedBridgeInfoButtonCount =', clickedBridgeInfoButtonCount);

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
    clickedBridgeInfoButtonCount: state.general.clickedBridgeInfoButtonCount,
  }
}

export default connect(mapStateToProps,
{
  setClickedBridgeInfoButtonCount,
})(BridgeHero);
