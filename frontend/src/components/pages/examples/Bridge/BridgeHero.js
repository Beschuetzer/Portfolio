import React from "react";

import BackgroundVideo from '../../../BackgroundVideo';
import bgVideo from '../../../../clips/animation-roundEndDummy.mp4';
import DiamondFractal from "./DiamondFractal";

const BridgeHero = () => {
	//my idea here is to have a centered diamond background that has has the section or A # Maj Bridge words around the four corners.  Inside the diamond, there are other suits and a background video?
	return (
    <div className="hero">
      {/* <div className="diamond"> */}
      <span className="hero__heading heading--one">Making</span>
      <span className="hero__heading heading--one">A#</span>
      <span className="hero__heading heading--one">&nbsp;Maj</span>
      <span className="hero__heading heading--one">Bridge</span>
      {/* <DiamondFractal topLeftWord="Making" /> */}



    

      <div className="hero__background">Background layer</div>
      <BackgroundVideo
				src={bgVideo}
				type='mp4'
			/>
    </div>
	);
};

export default BridgeHero;
