import React from "react";
import { useEffect } from "react";

import BridgeHero from './BridgeHero';
import BridgeCard from './BridgeCard';
import SectionContainer from './../../../SectionContainer';
import Card from '../../../Card';
import ArrowButton from '../../../ArrowButton';



const Bridge = () => {
	const sectionContents = [
			<SectionContainer
				name='summary'
				pageName='bridge'
			>
				<p>
					The outbreak of the COVID-19 Pandemic provided me with a lot of time to reflect on my career choices and where I want to be in 10 years time.  
				</p>
				<p>
					After much careful reflection, I realized that I would not be able to live a self-realized life, if I did not at least try to become a professional coder. 
				</p>
			</SectionContainer>
		,
			<SectionContainer
				name='motivation'
				pageName='bridge'
			>
				<BridgeCard
					titleSize='two'
					titleContent='Why Bridge?'
				>
					<ul className='bridge__reasons'>
							<li className='bridge__reasons-item'>
								There was no free online bridge resource in May of 2020. 
							</li>
							<li className='bridge__reasons-item'>
								A good friend from MN mentioned how much he missed playing Bridge now that he couldn’t play Bridge in person due to the COVID 19 pandemic. 
							</li>
							<li className='bridge__reasons-item'>
								My current position at Ricoh was not panning out as I had expected. 
							</li>
							<li className='bridge__reasons-item'>
								I have always been enamored with the idea of becoming a computer programmer (my dad was a programmer for a company called Deluxe in MN.  However, I saw how much my dad’s new position as a project manager caused him a lot of stress, which eventually to a heart attack.  I naively attributed his heart attack to coding in my mind and decided to pursue other things, even though I had a thing for programming.), and I finally realized that this may be my last chance to become a programmer.  I saw A#Maj as a test of whether or not I had what it takes to become a programmer.
							</li>
						</ul>

					{/* <Card
						cardName='ace-of-clubs'
						title='Why?'
					>
					</Card>
					<Card
						cardName='ace-of-diamonds'
						title='How?'
					>
					</Card>
					<Card
						cardName='ace-of-hearts'
						title='Challenges'
					>
					</Card>
					<Card
						cardName='ace-of-spades'
						title='Lessons Learned'
					>
					</Card> */}
				</BridgeCard>
				{/* <ArrowButton
					direction='left'
					fillNumber='1'
					hoverFillNumber='3'
				/>
				<ArrowButton
					direction='right'
					fillNumber='1'
					hoverFillNumber='4'
				/> */}
			</SectionContainer>
	]



	useEffect(() => {
		const newLinearGradient = `
      linear-gradient(to right, var(--color-primary-1), var(--color-primary-1));
    `;
		document.documentElement.style.setProperty(
			"--body-background",
			newLinearGradient,
		);
	}, []);

	const renderSections = () => {
		return sectionContents.map(item => item);
	}

	return (
		<React.Fragment>
		<div className="bridge">
			<BridgeHero
				name="Bridge"
				pageName="bridge"
			/>
			{/* <p>
					Contract bridge, or simply bridge, is a trick-taking card game using a standard 52-card deck. In its basic format, it is played by four players in two competing partnerships, with partners sitting opposite each other around a table.
				</p> */}
			{/* <div className="transition">Transition</div> */}
			{renderSections()}
		</div>

	</React.Fragment>
	);
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
