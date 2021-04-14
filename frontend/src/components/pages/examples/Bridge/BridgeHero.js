import React from 'react';

const BridgeHero = () => {
  //my idea here is to have a centered diamond background that has has the section or A # Maj Bridge words around the four corners.  Inside the diamond, there are other suits and a background video?
  return (
    <article className="bridge__hero">
      {/* <div className="diamond"> */}
      <div className='square-container'>
        <div className="square square-outer"> 
    
    
          <div className="bridge__hero-text">
            <h2 className="bridge__hero-heading heading--one">A</h2>
            <h2 className="bridge__hero-heading heading--one">#</h2>
            <h2 className="bridge__hero-heading heading--two">Maj</h2>
            <h2 className="bridge__hero-heading heading--two">Bridge</h2>
          </div>

        </div>
        <div className="square square-inner1 square-inner-odd"> </div>
        <div className="square square-inner2 square-inner-even"> </div>
        <div className="square square-inner3 square-inner-odd"> </div>
        <div className="square square-inner4 square-inner-even"> </div>
      </div>
      {/* <div className="line"></div> */}
    </article>
  );
}

export default BridgeHero;