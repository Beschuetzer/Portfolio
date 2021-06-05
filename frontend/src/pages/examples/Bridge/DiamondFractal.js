import React from "react";

const DiamondFractal = ({ topLeftWord }) => {
	return (
		<div className="diamond-fractal">
			<div className="square square__outer"></div>
			<div className="circle circle-1">
			
			</div>
			<div className="square square__inner-1 square__inner-odd"> </div>
			<div className="circle circle-2"></div>
			<div className="square square__inner-2 square__inner-even"> </div>
			<div className="circle circle-3"></div>
			<div className="square square__inner-3 square__inner-odd"> </div>
			<div className="circle circle-4"></div>
			<div className="square square__inner-4 square__inner-even"> </div>
			<div className="circle circle-5"></div>
			<div className="square square__inner-5 square__inner-even"> </div>
			<div className="circle circle-6"></div>
			<div className="square square__inner-6 square__inner-even"> </div>
			<div className="circle circle-7"></div>
			<div className="square square__inner-7 square__inner-even"> </div>
			<div className="circle circle-8"></div>
			<div className="square square__inner-8 square__inner-even"> </div>
			<div className="circle circle-9"></div>
		</div>
	);
};

export default DiamondFractal;
