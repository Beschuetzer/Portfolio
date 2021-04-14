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
        <div className="circle circle-1"></div>
        <div className="square square-inner1 square-inner-odd"> </div>
        <div className="circle circle-2"></div>
        <div className="square square-inner2 square-inner-even"> </div>
        <div className="circle circle-3"></div>
        <div className="square square-inner3 square-inner-odd"> </div>
        <div className="circle circle-4"></div>
        <div className="square square-inner4 square-inner-even"> </div>
        <div className="circle circle-5"></div>
        <div className="square square-inner5 square-inner-even"> </div>
        <div className="circle circle-6"></div>
        <div className="square square-inner6 square-inner-even"> </div>
        <div className="circle circle-7"></div>
        <div className="square square-inner7 square-inner-even"> </div>
        <div className="circle circle-8"></div>
        <div className="square square-inner8 square-inner-even"> </div>
        <div className="circle circle-9"></div>

      </div>
    </article>
  );
}

export default BridgeHero;