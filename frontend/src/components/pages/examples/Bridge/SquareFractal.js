import React from 'react';

const SquareFractal = ({topLeftWord}) => {
  return (
    <div className='diamond-fractal'>
        <div className="square square-outer"> 
        </div>
        <div className="circle circle-1">
          <p className="square__text square__text--top-left">{topLeftWord}</p>

        </div>
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
  );
}

export default SquareFractal;