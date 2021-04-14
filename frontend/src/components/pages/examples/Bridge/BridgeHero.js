import React from 'react';
import SquareFractal from './SquareFractal';

const BridgeHero = () => {
  //my idea here is to have a centered diamond background that has has the section or A # Maj Bridge words around the four corners.  Inside the diamond, there are other suits and a background video?
  return (
    <article className="bridge__hero">
      {/* <div className="diamond"> */}
      {/* <div className="bridge__hero-text">
        <h2 className="bridge__hero-heading heading--one">A</h2>
        <h2 className="bridge__hero-heading heading--one">#</h2>
        <h2 className="bridge__hero-heading heading--two">Maj</h2>
        <h2 className="bridge__hero-heading heading--two">Bridge</h2>
      </div> */}
      <SquareFractal
        topLeftWord="Making"
      />
    </article>
  );
}

export default BridgeHero;