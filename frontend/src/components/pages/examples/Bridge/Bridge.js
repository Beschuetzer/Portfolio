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
import undoVideo from '../../../../clips/undo.mp4';
import claimSomeVideo from '../../../../clips/claim-some-declarer-initial.mp4';
import claimAllVideo from '../../../../clips/claim-all.mp4';
import resizingVideo from '../../../../clips/resizing.mp4';
import playingACardVideo from '../../../../clips/cardPlayOptions.mp4';
import cardPlayAndRoundEndVideo from '../../../../clips/animation-roundEndDummy.mp4';
import preferencesVideo from '../../../../clips/preferences.mp4';
import themesVideo from '../../../../clips/themes.mp4';
import saveGameVideo from '../../../../clips/saveGame.mp4';
import CardManager from "../../../CardManager";
import { onRenderCallback } from "../../../constants";

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
							&nbsp;<a target="_blank" rel="noreferrer" href="https://en.wikipedia.org/wiki/Contract_bridge" className="bridge__link">contract bridge</a>&nbsp;for free.  &nbsp;&nbsp;The COVID-19 pandemic was in full swing.&nbsp; Andrew, a good friend of mine, had been mentioned how much he missed playing bridge (something which none of the members of our regular bridge group had done for many months at that point).  
						</p>
						<p>
							Initially, we looked for free, online apps but were unable to find any at the time.   &nbsp;&nbsp;I had told Andrew about the&nbsp;
							<Link to="/examples/downloader" className="bridge__link">downloader</Link>
							&nbsp;and&nbsp;
							<Link to="/examples/playlist-syncer" className="bridge__link">music syncing</Link> apps that I had recently finished, and he jokingly remarked that I should make an app to play bridge online.   &nbsp;&nbsp;Initially, I wasn't very interested in making my own bridge app because I figured there had to be a free online version somewhere that we could use. &nbsp;&nbsp;  After looking for multiple hours though and only finding pay-to-play apps, I decided to invest some time into figuring out how one would do such a thing.
						</p>
					</BridgeCardSection>
					<BridgeCardSection
						title='Research'
					>
					<p>
							I started out by trying to create a simple chat room app using C#, but soon realized it would be rather challenging to create the bridge app I had envisioned using C#.   &nbsp;&nbsp;I knew there had to be an easier way...   &nbsp;&nbsp;off to YouTube/Google to find it!   &nbsp;&nbsp;  This is where I was introduced to something called 'socket.io'.   &nbsp;&nbsp;After watching a quick implementation video on YouTube, I was convinced:&nbsp; socket.io would be a part of the stack, if i was going to do this thing.
						</p>
						<p>
							The only problem was I had no idea how to create a web application at all!&nbsp; After googling some more, I found an exquisite resource called
							&nbsp; <a target="_blank" rel="noreferrer" href="https://www.theodinproject.com/" className="bridge__link">The Odin Project.</a> &nbsp;
						</p>					
					</BridgeCardSection>
					<BridgeCardSection
						title='A Tough Decision'
					>
						<p>
							Before I had found the Odin Project, I had only ever dreamt of becoming a software/web developer.&nbsp; I was under the impression that one needed to have a Computer Science degree.&nbsp; After reading the experiences others had had on the Odin Project website, a hope, nay, a determination awakened inside of me that had lain dormant for many years.&nbsp; Maybe I was wrong?
						</p>
						<p>
							It was at that moment that I realized what I had to do.&nbsp;  Would I look back 10 years from now and regret not having tried to become that which I had previously only dreamt of becoming?&nbsp; I decided, then and there, to give it my best effort.&nbsp; I was prepared to do whatever it takes to realize this goal.&nbsp; My biggest fear at this point was to die having not tried.&nbsp;
						</p>
						
						{/* <p>
							Do I have what it takes?  Will I be able to find a job during the pandemic?  These were questions that I was scared to face, but, to me, scarier was not pursing something that I have enjoyed doing since I was a kid.
						</p> */}
					</BridgeCardSection>
					<BridgeCardSection
						title='The Process'
					>						
						<p>
							First, I needed some sort of test that was sufficiently complex and representative enough of actual real-world applications, such that if I could pass it, I would know I am on the right track.&nbsp;
						</p>
						<p>
							This is where A# Maj Bridge became my full-time endeavor.&nbsp; If I could create a scalable, multiplayer bridge app, I was convinced I have what it takes.&nbsp; I decided that I would set aside one year to build the best bridge website I could.&nbsp; If after one year, it wasn't looking like I was going to make it, I could stop, knowing that I had given it my best effort.&nbsp;
						</p>
						<p>
							Second, I left my &nbsp;
							<a 
								className='bridge__link'
								href='/resume#work-history'
								target="_blank"
								rel='noreferrer'
							>
								service technician position
							</a> at Ricoh in order to free up the time and energy needed to whole-heartily devote myself to this endeavor.&nbsp;
						</p>
					</BridgeCardSection>
					<BridgeCardSection
						title='The Little Matter of How'
					>
						<p>
							I started the learning process by following the curriculum on the Odin Project's website.&nbsp; I learned the basics of HTML5, CSS3, and JS.&nbsp; However, once I hit the Ruby part of the curriculum, it quickly became apparent that I would need further resources.&nbsp; 
						</p>	
						<p>
							At this point, I had a fixed budget of $17k. &nbsp; I carefully looked into Web Developer boot camps. &nbsp; A few caught my eye, but there were no guarantees that I would land a job at the end.&nbsp; Ultimately, I decided that the best use of my budget would be to take the self-taught path.&nbsp;The main reasons were:				
						</p>
						<ul>
							<li>
								I've always been a very self-motivated person.  I didn't to make a large financial commitment to a program in order to wake up and get learning/coding.
							</li>
							<li>
								It was hard to justify paying $15-20k for information that I could get for free or for much less than $15k. 
							</li>
							<li>
								I figured most of the benefits of a bootcamp come from the face-to-face interactions.  With the pandemic in full swing at this point (June 2020), bootcamps were moving to online only.
							</li>
							<li>
								Going at my own pace would allow me to move more quickly through the areas which I find easy while being able to spend more time on the areas that I find difficult.  
							</li>
						</ul>
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
								&nbsp; took roughly 6 months to fully implement.  I haven't been able to test more than three simultaneous games, but it likely is able to run 100s if not 1000s of simultaneous games before the less-than-optimal code would bring a high-end server to a halt.&nbsp; Have a look at the interesting features in the 
								&nbsp;
								<BridgeSectionLink
									content="feature's section"
									sectionToSkipTo='features'
								></BridgeSectionLink>
								.&nbsp;
								Or check out some of the 
								&nbsp;<a target="_blank" rel="noreferrer" href="https://github.com/Beschuetzer/Bridge" className="bridge__link">source code.</a>  
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
					<CardManager>
						<Card
							video={cardPlayAndRoundEndVideo}
							cardName='ace-of-spades'
							title='Animations'
						>
							<div>
								There are two optional animations:
								<ul>
									<li>Card Play - mimicks a perfectly thrown card when opponents play</li>
									<li>Round End - mimicks a rocket 'blasting off' of the table.</li>
								</ul>
							</div>
						</Card>
						<Card
							video={undoVideo}
							cardName='ace-of-hearts'
							title='Undo'
						>
							<div>
								<p>
									Players are able to undo during the bidding phase as well as the playing phase.
								</p>
							</div>
						</Card>
						<Card
							video={saveGameVideo}
							cardName='ace-of-diamonds'
							title='Save Games'
						>
							<div>
								<p>
									The server saves each play and bid automatically, allowing players to resume playing at a later time without having to worry about losing the game state.
								</p>
							</div>
						</Card>
						<Card
							video={resizingVideo}
							cardName='ace-of-clubs'
							title='Dynamic Resizing'
						>
							<div>
								<p>
									The playing screen dynamically adjusts to the viewport, allowing users to play on their Android phone or with the window only taking up a fraction of the screen.
								</p>
							</div>
						</Card>
						<Card
							cardName='king-of-spades'
							title='Claim All'
							video={claimAllVideo}
						>
							<div>
								<p>
									'Claim All' allows players to claim the rest of the tricks rather than play them out. &nbsp;It shows the claimer's cards to the two defensive opponents and they can either agree or reject the claim.  &nbsp;If they agree, the claimer gets the rest of the tricks and game moves to the deal summary screen.
								</p>
								</div>
						</Card>
						<Card
							video={claimSomeVideo}
							cardName='king-of-hearts'
							title='Claim Some'
						>
							<div>
								<p>
									'Claim Some' allows the declarer (person playing the contract) to claim some number of trick less than or equal to the number of tricks remaining.&nbsp; As a card is selected, the valid cards in the other hand are highlighted, allowing for easier selections.
								</p>
							</div>
						</Card>
						<Card
							video={dealSummaryVideo}
							cardName='king-of-diamonds'
							title='Deal Summary'
						>
							<div>
								<p>
									The Deal Summary screen allows players to reviews the bidding and playing from the last deal.&nbsp; It shows which cards each player had in their hand at the beginning of each trick.&nbsp; Such information is nice when you want to work out how the trick claiming phase may have gone had you played a different card for a given trick.
								</p>
							</div>
						</Card>
						<Card
							video={preferencesVideo}
							cardName='king-of-clubs'
							title='Preferences'
						>
							<div>
								<p>
									Preferences allow each player to customize the experience of the game.&nbsp; Card sorting order, sounds, animation toggling, color themes, card back image, and other preferences are all customizable via the preferences page.
								</p>
							</div>
						</Card>
						<Card
							video={themesVideo}
							cardName='queen-of-spades'
							title='Themes'
						>
							<div>
								<p>
									There are 8 different color themes available.  Some are intentionally strange, while others are meant to impress.  
								</p>
							</div>
						</Card>
						<Card
							video={playingACardVideo}
							cardName='queen-of-hearts'
							title='Card Play Options'
						>
							<div>
								<p>When it is your turn to play a card, you have three ways to play a card: </p>
								<ul>
									<li>drag and drop the card</li>
									<li>double click the card</li>
									<li>use the keyboard shortcut for that card</li>
								</ul>
							</div>
							
						</Card>
					</CardManager>
				</BridgeCard>
			</SectionContainer>
			,
			<SectionContainer
				name='Lessons'
				pageName='bridge'
			>
				<BridgeCard
					titleSize='two'
					titleContent='Lessons'
				>
					<BridgeCardSection
						title="No One Technology is 'Better'"
					>
						<p>
							It's easy to think in the absolute terms of 'good', 'better', and 'best'.&nbsp; My experience coding A# Maj Bridge has illustrated to me that when it comes to web development thinking in these terms doesn't cut it.&nbsp;
						</p>
					</BridgeCardSection>
					<BridgeCardSection
						title="A 'Better' Approach"
					>
						<p>
							How soon does it need to be finished?&nbsp; Does it need to be able to scale up to millions of users?&nbsp; What types of browser support does it need to have?&nbsp; These are all crucial considerations to take into account before dashing off the starting line and potentially taking a wrong turn somewhere from which you may need to backtrack.
						</p>
					</BridgeCardSection>
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
