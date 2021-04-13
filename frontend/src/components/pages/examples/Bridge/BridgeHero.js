import React from 'react';

const BridgeHero = () => {
  //my idea here is to have a centered diamond background that has has the section or A # Maj Bridge words around the four corners.  Inside the diamond, there are other suits and a background video?
  return (
    <article className="bridge__hero">
      <div className="bridge__diamond bridge__diamond-left"></div>
      <div className="bridge__diamond bridge__diamond-right"></div>
      <h2 className="bridge__hero-heading heading--two">The Beginnings</h2>
      <h2 className="bridge__hero-heading heading--two">of a Developer</h2>
    </article>
  );
}

export default BridgeHero;