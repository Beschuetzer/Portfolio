import React from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import BridgeHero from './BridgeHero';
import BridgeCard from './BridgeCard';
import BridgeCardSection from './BridgeCardSection';
import SectionContainer from './../../../SectionContainer';
import Card from '../../../Card';
import ArrowButton from '../../../ArrowButton';
import BridgeSectionLink from "./BridgeSectionLink";

import dealSummaryVideo from '../../../../clips/dealSummary.mp4';
// import undoVideo from '../../../../clips/undoBidding.mp4';
import claimSomeVideo from '../../../../clips/claim-some-declarer-initial.mp4';
import claimAllVideo from '../../../../clips/claim-all.mp4';
// import resizingVideo from '../../../../clips/resizing-all.mp4';
import dragAndDropVideo from '../../../../clips/animation-roundEnd.mp4';
import cardPlayAndRoundEndVideo from '../../../../clips/animation-roundEndDummy.mp4';
import preferencesVideo from '../../../../clips/preferences.mp4';
import themesVideo from '../../../../clips/themes.mp4';
// import saveGameVideo from '../../../../clips/saveGame.mp4';

const Bridge = ({hasClickedBridgeInfoButton}) => {
	const sectionContents = [
			<SectionContainer
				name='Background'
				pageName='bridge'
			>
				<BridgeCard
					titleSize='two'
					titleContent='Background'
				>
					<BridgeCardSection
						title='The Journey Begins'
						// title='An App is Born'
					>
						<p>
							A#Maj is an website I created between June of 2020 and February of 2021, where users can play 
							&nbsp;<a target="_blank" rel="noreferrer" href="https://en.wikipedia.org/wiki/Contract_bridge" className="bridge__link">contract bridge</a>&nbsp;for free.  &nbsp;&nbsp;The COVID-19 pandemic was in full swing and Andrew, a good friend of mine, had been mentioned how much he missed playing bridge (something which none of the members of our regular bridge group had done for many months at that point).  
						</p>
						<p>
							Initially, we looked for free, online apps but were unable to find any at the time.   &nbsp;&nbsp;I had told Andrew about the&nbsp;
							<Link to="/examples/downloader" className="bridge__link">downloader</Link>
							&nbsp;and&nbsp;
							<Link to="/examples/playlist-syncer" className="bridge__link">music syncing</Link> apps that I had recently finished, and he jokingly remarked that I should make an app to play bridge online.   &nbsp;&nbsp;Initially, I wasn't very interested in making my own bridge app because I figured there had to be a free online version somewhere that we could use. &nbsp;&nbsp;  After looking for multiple hours though and only finding pay-to-play apps, I decided to entertain the idea.
						</p>
					</BridgeCardSection>
					<BridgeCardSection
						title='The Process'
					>
					<p>
							I started out by trying to create a simple chat room app using C#, but soon realized it would be rather challenging to create the bridge app I had envisioned using C#.   &nbsp;&nbsp;I knew there had to be an easier way...   &nbsp;&nbsp;Off to YouTube and google to find it!   &nbsp;&nbsp;The most promising technology I could find was called 'socket.io'.   &nbsp;&nbsp;After watching a tutorial video on YouTube, I was sold.   &nbsp;&nbsp;socket.io would have to be part of the stack I would use, if i decided to create the app.
						</p>
						<p>
							The only problem was I had no idea how to integrate socket.io into a working web application or how to create web applications at all for that matter!  After googling some more, I found an exquisite resource called
							&nbsp; <a target="_blank" rel="noreferrer" href="https://www.theodinproject.com/" className="bridge__link">The Odin Project.</a> &nbsp;  I followed the curriculum there to learn the basics of HTML, CSS, and JS.  However, once I hit the Ruby part of the curriculum, it quickly became apparent that I would need further resources.  
						</p>
						<p>
							This is when I began to look into Web Developer boot camps.   &nbsp;&nbsp;I carefully considered a few specific boot camps for a few weeks, but ultimately, reasoned that the better approach for me would be take the self-taught path for three reasons.   &nbsp;&nbsp;One, I've always been a very self-motivated person and found it difficult to justify paying 15-20k for information that I could get for free or for much less than 15k.   &nbsp;&nbsp;Two, the pandemic was just getting started at this point, and I had no idea what kind of impact it would have on the bootcamp experience.   &nbsp;&nbsp;Third, going at my own pace would allow me to move more quickly through the areas which I find easy while being able to spend more time on the areas that I find difficult.  
						</p>						
					</BridgeCardSection>
					<BridgeCardSection
						title='Deciding on the Technology to Use'
					>
					<p>
							My first goal was figure out what I needed to learn.&nbsp; I researched popular web development technologies and came across many different stacks.&nbsp; Admittedly, it was a bit overwhelming at first, but eventually I came to the conclusion to stick the basics first then expand out from there.&nbsp; I figured, if I want to become a web developer, I will need to have fundamentally, solid understanding of HTML5, CSS3, and JS, right?&nbsp; It is was thought and the fact that I wanted to get something up and running asap that I arrived at the decision to develop 
							&nbsp;<a target="_blank" rel="noreferrer" href="https://still-bayou-51404.herokuapp.com" className="bridge__link">A# Maj Bridge</a>&nbsp;
							using vanilla HTML5, CSS3, and JS (I did rely on Bootstrap4 for a few things, though). 	
						</p>
						<BridgeCardSection
							title='Picking the Right Curriculum'
						>
							<p>
								With a technology decision for the client-side in place, I began looking at server-side technologies that I could use.&nbsp;  It didn't take long for me to find NodeJS.&nbsp;  Knowing what I would use for my server-side code made searching for bootcamps on sites like Udemy and YouTube much easier.&nbsp;After careful consideration, I decided on Colte Steele's
								&nbsp;<a target="_blank" rel="noreferrer" href="https://www.udemy.com/course/the-web-developer-bootcamp/" className="bridge__link">Web Developer Bootcamp</a>&nbsp;
								(which has since been updated) to use as the foundation for learning how to build a complete application using HTML5, CSS3, and JS.&nbsp;  The rest is hard work, will power, luck, and curiosity.  
							</p>
						</BridgeCardSection>
						<BridgeCardSection
							title='The Results are in.'
						>
							<p>
								&nbsp;<a target="_blank" rel="noreferrer" href="https://still-bayou-51404.herokuapp.com" className="bridge__link">A# Maj Bridge</a>  
								&nbsp; took roughly 6 months to fully implement.  I haven't been able to test more than three simultaneous games, but it likely is able to run 100s if not 1000s of simultaneous games before the less-than-optimal code would bring a high-end server to a halt.  Checkout out some of the interesting features in the 
								&nbsp;
								<BridgeSectionLink
									content="feature's section"
									sectionToSkipTo='features'
								></BridgeSectionLink>
								&nbsp;
							</p>
						</BridgeCardSection>
					</BridgeCardSection>

					{/* <BridgeCardSection
						title='You did what?'
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
								I saw A#Maj as a test of whether or not I had what it takes to become a programmer.
							</li>							
						</ul>
						All throughout my youth, I had taken a keen interest in computer programming.   &nbsp;&nbsp;I figured that this was the last chance I would get to realize that interest. 
					</BridgeCardSection> */}
				</BridgeCard>
			</SectionContainer>
			,
			<SectionContainer
				name='features'
				pageName='bridge'
			>
				<BridgeCard
					titleSize='two'
					titleContent='Features'
					titleSubtitle="Pick a Card any Card..."
				>
					<Card
						
						cardName='ace-of-clubs'
						title='Claim All'
						video={claimAllVideo}
					>
						<p>
							Claim All Allows players to claim the rest of the tricks rather than play them out. &nbsp;It shows the claimer's cards to the two defensive opponents and they can either agree or reject the claim.  &nbsp;If they agree, the claimer gets the rest of the tricks and game moves to the deal summary screen.
						</p>
					</Card>
					<Card
						video={claimSomeVideo}
						cardName='ace-of-diamonds'
						title='Claim Some'
					>
					</Card>
					<Card
						video={dealSummaryVideo}
						cardName='ace-of-hearts'
						title='Deal Summary'
					>
					</Card>
					<Card
						video={preferencesVideo}
						cardName='ace-of-spades'
						title='Preferences'
					>
					</Card>
				</BridgeCard>
		
			</SectionContainer>
			,
			<SectionContainer
				name='features'
				pageName='bridge'
			>
				<BridgeCard
					titleSize='two'
					titleContent='Features?'
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
								I saw A#Maj as a test of whether or not I had what it takes to become a programmer.
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
		
			</SectionContainer>
	];

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
		return sectionContents.map((item, index) => {
			return (
				<React.Fragment key={index}>
					{item}
				</React.Fragment>	
			)});
	}

	return (
		<div className="bridge">
			<BridgeHero
				name="Bridge"
				pageName="bridge"
			/>

			{renderSections()}
			<ArrowButton
				direction='left'
				fillNumber='2'
				hoverFillNumber='3'
			/>
			<ArrowButton
				direction='right'
				fillNumber='1'
				hoverFillNumber='4'
			/>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		hasClickedBridgeInfoButton: state.general.hasClickedBridgeInfoButton,
	}
}

export default connect(mapStateToProps, {

})(Bridge);

/* <p>
		Contract bridge, or simply bridge, is a trick-taking card game using a standard 52-card deck. In its basic format, it is played by four players in two competing partnerships, with partners sitting opposite each other around a table.
	</p> */


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
