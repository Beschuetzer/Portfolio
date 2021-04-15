import React from "react";
import DiamondFractal from "./DiamondFractal";

const BridgeHero = () => {
	//my idea here is to have a centered diamond background that has has the section or A # Maj Bridge words around the four corners.  Inside the diamond, there are other suits and a background video?
	return (
    <div className="bridge__hero">
      {/* <div className="diamond"> */}
      <span className="bridge__hero-heading heading--one">Making</span>
      <span className="bridge__hero-heading heading--one">A#</span>
      <span className="bridge__hero-heading heading--one">&nbsp;Maj</span>
      <span className="bridge__hero-heading heading--one">Bridge</span>
      <DiamondFractal topLeftWord="Making" />
    </div>
	);
};

export default BridgeHero;
