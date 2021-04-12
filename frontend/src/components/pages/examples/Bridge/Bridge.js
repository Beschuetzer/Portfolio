import React from "react";
import { useEffect } from "react";

const Bridge = () => {
	useEffect(() => {
		const newLinearGradient = `
      linear-gradient(to right, var(--color-primary-1), var(--color-primary-1));
    `;
		document.documentElement.style.setProperty(
			"--body-background",
			newLinearGradient,
		);
	}, []);

	return <div className="bridge">Bridge page</div>;
};

export default Bridge;

// -bridge page sections:
//   1. history/background
//       -have explanation of what bridge is
//       -talk about why I decided to create a multiplayer bridge website in the first place;  mention the timing and how I had just completed the c# projects and was re-considering my career choices when Andrew mentioned how cool he thought it would be to play bridge online with his parents and me.
//   2. Initial Approach to learning web development( talk about my lack of any real web experience and how I started by studying the odin project curriculum but soon realized I wouldn't be able to create a bridge website any time soon following that curriculum.  The bridge app was really the motivation to find a Udemy course that would serve as the foundation of my web development understanding, especially in regards to real-time multiplayer web apps. After completing the web dev bootcamp course (add link) i immediately started coding in Paper.JS (paper.JS was the library that Colt STeele used in his course, so I figured that would be a good library to use for the playing phase;  I didn't stop to consider that there may be better alternative as I was eager to get a working prototype asap) to figure out how to draw cards using Paper.JS.  Unfortunately, (or fortunately depending on your perspective) I didn't realize that paper.JS has built-in raster image support, essentially rendering the 3-4 weeks I spent figuring out how to draw the 52 cards in a deck, irrelevant.
//   3.  Challenges
//         -paper.JS and socket.io: figuring out how to get socket.io events to trigger changed inside paper.JS);  solved by reading the documentation and not assuming that you know something
//         -claim some feature: how to get an easy to understand ui and simple experience
//   4.  Solutions
//   4.  What I'd do differently
