import React, { useRef } from "react";
import { useEffect } from "react";
import { connect, RootStateOrAny } from "react-redux";

import {
	setClickedBridgeInfoButtonCount,
	setCurrentBridgeSection,
	setHasClickedALink,
} from "../../../actions";

import EmbeddedLink from "../../../components/EmbeddedLink";
import BridgeCard from "./BridgeCard";
import BridgeCardSection from "./BridgeCardSection";
import SectionContainer from "../../../components/SectionContainer";
import Card from "../../../components/Card/Card";
import BridgeSectionLink from "./BridgeSectionLink";

import dealSummaryVideo from "../../../clips/bridge/dealSummary.mp4";
import undoVideo from "../../../clips/bridge/undo.mp4";
import claimSomeVideo from "../../../clips/bridge/claim-some-declarer-initial.mp4";
import claimAllVideo from "../../../clips/bridge/claim-all.mp4";
import resizingVideo from "../../../clips/bridge/resizing.mp4";
import playingACardVideo from "../../../clips/bridge/cardPlayOptions.mp4";
import cardPlayAndRoundEndVideo from "../../../clips/bridge/animation-roundEndDummy.mp4";
import preferencesVideo from "../../../clips/bridge/preferences.mp4";
import themesVideo from "../../../clips/bridge/themes.mp4";
import saveGameVideo from "../../../clips/bridge/saveGame.mp4";
import CardManager from "../../../components/Card/CardManager";
import { bridgeSections, BRIDGE_BACKDROP_CLASSNAME, BRIDGE_CLASSNAME, resetBridgeHero, setLinearGradientCssCustomProp } from "./utils";
import {
	DISPLAY_NONE_CLASSNAME, Reference,
} from "../../../components/constants";
import BridgeHero from "./BridgeHero";
import SourceCodeLink from "../../../components/SourceCodeLink";
import ArrowButton from "../../../components/ArrowButton";

const sectionContents = [
	<SectionContainer name={bridgeSections[0]} pageName="bridge">
		<BridgeCard titleSize="two" titleContent={bridgeSections[0]}>
			<BridgeCardSection
				title="What is A#Maj Bridge?"
				// title='An App is Born'
			>
				<p>
					<EmbeddedLink href="https://still-bayou-51404.herokuapp.com">
						A# Maj Bridge
					</EmbeddedLink>
					is an app I created where users can play
					<EmbeddedLink href="https://en.wikipedia.org/wiki/Contract_bridge">
						contract bridge
					</EmbeddedLink>
					online for free.&nbsp; I started seriously coding of the project in August of 2020 and completed the main code base in January of 2021.
				</p>
			</BridgeCardSection>
			<BridgeCardSection
				title="Motivation"
				// title='An App is Born'
			>
				<p>
					It was June of 2020 and I had just left my job at <EmbeddedLink href="/resume#work-history" isLocal={true}>Ricoh</EmbeddedLink> to pursue a life-long interest of mine: coding.&nbsp; 
					&nbsp;I had just finished my two smaller side projects
					(		
					<EmbeddedLink isLocal={true} href="/examples/downloader">
						downloader
					</EmbeddedLink>
					and
					<EmbeddedLink href="/examples/playlist-syncer" isLocal={true}>
						playlist syncer
					</EmbeddedLink>   
					) 
					and was looking for another project that would really test my proverbial coding chops.
				</p>
				<p>
					During a phone call, a good friend of mine mentioned how much he missed playing bridge now that the pandemic had shut everything down.&nbsp; Initially, I suggested we look for a free-to-play Bridge app.&nbsp;  However, after extensively searching for such an app to no avail, it was clear I would have to make one if we wanted to play online for free (since then at least one free-to-play app has been released). 
				</p>
				<p>
					It was shortly after that phone call that I resolved to make the best free-top-play contract Bridge application I could with the knowledge I had at that point in time (not knowing any HTML, CSS, or JS).
				</p>
			</BridgeCardSection>
		</BridgeCard>
	</SectionContainer>,
	<SectionContainer name={bridgeSections[1]} pageName="bridge">
		<BridgeCard
			titleSize="two"
			titleContent={bridgeSections[1]}
			titleSubtitle="Pick a card any card...">
			<CardManager>
				<Card
					video={cardPlayAndRoundEndVideo}
					cardName="ace-of-spades"
					title="Animations">
					<div>
						There are two optional animations:
						<ul>
							<li>
								Card Play - mimics a perfectly thrown card when others play
							</li>
							<li>
								Round End - mimics a rocket 'blasting off' of the table.
							</li>
						</ul>
					</div>
				</Card>
				<Card video={undoVideo} cardName="ace-of-hearts" title="Undo">
					<div>
						<p>
							Players are able to undo during the bidding phase as well as the
							playing phase.
						</p>
					</div>
				</Card>
				<Card
					video={saveGameVideo}
					cardName="ace-of-diamonds"
					title="Save Games">
					<div>
						<p>
							The server saves each play and bid automatically, allowing
							players to resume playing at a later time without having to
							worry about losing the game state.
						</p>
					</div>
				</Card>
				<Card
					video={resizingVideo}
					cardName="ace-of-clubs"
					title="Dynamic Resizing">
					<div>
						<p>
							The playing screen dynamically adjusts to the viewport, allowing
							users to play on their Android phone or with the window only
							taking up a fraction of the screen.
						</p>
					</div>
				</Card>
				<Card
					cardName="king-of-spades"
					title="Claim All"
					video={claimAllVideo}>
					<div>
						<p>
							'Claim All' allows players to claim the rest of the tricks
							rather than play them out. &nbsp;It does this by showing he
							claimer's cards to the two defensive players.&nbsp; If both
							players accept the claim, the claimer gets the rest of the
							tricks and the game moves to the deal summary screen.
						</p>
					</div>
				</Card>
				<Card
					video={claimSomeVideo}
					cardName="king-of-hearts"
					title="Claim Some">
					<div>
						<p>
							'Claim Some' allows the declarer (person playing the contract)
							to claim some number of tricks less than or equal to the number
							of tricks remaining.&nbsp; The UI guides players through the
							selection process, by graying out cards that are invalid and
							displaying the selected cards in a table, allowing for a smooth
							user experience.
						</p>
					</div>
				</Card>
				<Card
					video={dealSummaryVideo}
					cardName="king-of-diamonds"
					title="Deal Summary">
					<div>
						<p>
							The Deal Summary screen allows players to review the bidding and
							playing phases of the last deal.&nbsp; It does this by
							displaying the bidding order (who bid what when) and which cards
							each player had in their hand at the beginning of each
							trick.&nbsp; Such information is useful for self-improvement and
							providing feedback to others.
						</p>
					</div>
				</Card>
				<Card
					video={preferencesVideo}
					cardName="king-of-clubs"
					title="Preferences">
					<div>
						<p>
							Preferences allow each player to customize the experience of the
							game.&nbsp; Card sorting order, sounds, animation toggling,
							color themes, card back image, and other preferences are all
							customizable via the preferences page.
						</p>
					</div>
				</Card>
				<Card video={themesVideo} cardName="queen-of-spades" title="Themes">
					<div>
						<p>
							There are 8 different color themes available. Some are
							intentionally strange, while others are meant to impress.
						</p>
					</div>
				</Card>
				<Card
					video={playingACardVideo}
					cardName="queen-of-hearts"
					title="Card Play Options">
					<div>
						<p>
							When it is your turn to play a card, you have three ways to play
							a card:{" "}
						</p>
						<ul>
							<li>drag and drop the card</li>
							<li>double click the card</li>
							<li>use the keyboard shortcut for that card</li>
						</ul>
					</div>
				</Card>
			</CardManager>
			<div className={BRIDGE_BACKDROP_CLASSNAME}></div>
		</BridgeCard>
	</SectionContainer>,
	<SectionContainer name={bridgeSections[2]} pageName="bridge">
		<BridgeCard titleSize="two" titleContent={bridgeSections[2]}>
			<BridgeCardSection title="Research">
				<p>
					I started out by trying to create a simple chat room app using C#,
					but soon realized it would be rather challenging to create the
					bridge app I had envisioned using C#. &nbsp;I knew there had to be
					an easier way... &nbsp;off to YouTube/Google to find it! &nbsp; This
					is where I first encountered 'socket.io'. &nbsp;After watching a
					quick implementation video on YouTube, I was convinced:&nbsp;
					socket.io would be a part of the stack, if i was going to do this
					thing.
				</p>
				<p>
					The only problem was I had no idea how to create a web application
					at all.&nbsp; After googling some more, I found an exquisite
					resource called
					<EmbeddedLink href="https://www.theodinproject.com/">
						The Odin Project
					</EmbeddedLink>
				</p>
			</BridgeCardSection>
			<BridgeCardSection title="A Tough Decision">
				<p>
					Before I had found the
					<EmbeddedLink href="https://www.theodinproject.com/">
						The Odin Project
					</EmbeddedLink>
					, I had been under the impression that one needed to have a Computer
					Science degree in order to become a web developer.&nbsp; That
					assumption was shattered upon reading about some of the experiences
					others had had with the
					<EmbeddedLink href="https://www.theodinproject.com/">
						The Odin Project
					</EmbeddedLink>
					. Then and there, a hope, nay, a determination awakened inside of me
					that had lain dormant for many years.&nbsp; Maybe I too could become
					a web developer?&nbsp; I was determined to find out once and for
					all, if I have what it takes to become a web developer.&nbsp; Hence,
					I fully committed myself to making the
					<EmbeddedLink href="https://still-bayou-51404.herokuapp.com">
						A# Maj Bridge
					</EmbeddedLink>
					project.
				</p>
				{/* <p>
						Ultimately my decision to become a web developer came down to the fact that I knew I would regret it in the future if I didn't give it an honest effort to become a web developer.  &nbsp;With the COVID-19 pandemic in full swing, I knew I would have time to explore my potential.
					</p> 
					<p>
						I had taken MOOC courses in the past on EdX about computer programming, but I lacked the motivation to complete them because I told myself it wouldn't amount to anything.  &nbsp;Knowing now, that there was a chance to become a web developer, &nbsp;I couldn't see how I wouldn't regret not trying to become a web developer.&nbsp; Hence the reason I dove into the<EmbeddedLink href="https://still-bayou-51404.herokuapp.com">A# Maj Bridge</EmbeddedLink>project. */}
				{/* 							
						 I look at my life 10 years from now and ask what if I had completely devoted my energy to becoming a web developer?  I couldn't imagine a scenario where I would be ok with just giving up on something that I enjoyed so much.&nbsp; With the pandemic looking like it was just getting started, I decided to take a leap of faith in myself: I decided to become a web developer. */}
				{/* </p> */}

				{/* I decided, then and there, to put everything I had into realizing this goal.&nbsp; I was prepared to do whatever it takes to realize this goal.&nbsp; My biggest fear at this point was to die having not tried.&nbsp; */}

				{/* <p>
						Do I have what it takes?  Will I be able to find a job during the pandemic?  These were questions that I was scared to face, but, to me, scarier was not pursing something that I have enjoyed doing since I was a kid.
					</p> */}
			</BridgeCardSection>
			<BridgeCardSection title="The Approach">
				{/* <p>
						First, I needed some sort of test that was sufficiently complex and representative enough of actual real-world applications, such that if I could pass it, I would know I am on the right track.&nbsp;

						This is when<EmbeddedLink href="https://still-bayou-51404.herokuapp.com">A# Maj Bridge</EmbeddedLink>became a full-time endeavor.&nbsp; 
					</p> */}
				<p>
					If I could create a some-what scalable, web-based multiplayer bridge
					app, I was convinced I would have what it takes.&nbsp; I decided
					that I would set aside one year to build the best web-based
					multiplayer bridge app I could.&nbsp; If after one year I hadn't
					completed the website, I could stop, knowing that I had given it an
					honest and highly-motivated effort.&nbsp;
				</p>
				<p>
					To that end, I left my &nbsp;
					<a
						className={`${BRIDGE_CLASSNAME}__link`}
						href="/resume#work-history"
						target="_blank"
						rel="noreferrer">
						service technician position
					</a>{" "}
					at <EmbeddedLink href="/resume#work-history" isLocal={true}>Ricoh</EmbeddedLink> in order to free up the time and energy needed to
					whole-heartily devote myself to the project.
				</p>
			</BridgeCardSection>
			<BridgeCardSection title="The Little Matter of How">
				<p>
					I started the learning process by following the curriculum on the
					<EmbeddedLink href="https://www.theodinproject.com/">
						The Odin Project
					</EmbeddedLink>
					website.&nbsp; There I learned the basics of HTML5, CSS3, and
					JS.&nbsp; However, after completing most of the Ruby part of the
					curriculum, I realized I would need further resources.&nbsp;
				</p>
				<p>
					This is when I started looking into Web Developer Bootcamps. &nbsp;
					A few caught my eye, but there were no guarantees that I would land
					a job at the end.&nbsp; Ultimately, I decided that the best approach
					would be to take the self-taught path.&nbsp;The main reasons were:
				</p>
				<div className={`${BRIDGE_CLASSNAME}__subsection-grid`}>
					<span>1).</span>
					<span>
						I could go my own pace, which would allow me to move more quickly
						through the areas that I find easy while being able to spend more
						time on the areas that I find difficult.
					</span>
					<span>2).</span>
					<span>
						Paying $15-$20K for information that it is available for free or
						for much less than $15k is hardly worth it unless you are getting
						something to make the expenditure worth it.
					</span>
					<span>3).</span>
					<span>
						At the time (June 2020), the COVID-19 pandemic was in full swing,
						and bootcamps were moving to online only, making it even less
						appealing to pay $15-20K, when I wouldn't even get the
						face-to-face interactions an in-person bootcamp provides.
					</span>
					<span>4).</span>
					<span>
						I have so much internal drive to become a web developer that
						spending $15-20K wouldn't have motivated me much more to complete
						the project.
					</span>
				</div>
			</BridgeCardSection>
			<BridgeCardSection title="Deciding on the Technology to Use">
				<p>
					I knew I would pave my own path, but were would I start?&nbsp; I
					researched popular web development technologies and came across many
					different stacks.&nbsp; Admittedly, it was a bit overwhelming at
					first figuring out where to start, but eventually I came to the
					conclusion that sticking to the bread and butter of web development
					and then expanding out from there would be the best approach.&nbsp;
				</p>
				<p>
					If I wanted to become a web developer, I figured, I would need to
					have a solid understanding of HTML5, CSS3, and JS.&nbsp; What better
					way to learn the basics than to build a web-based multiplayer bridge
					app? &nbsp; This line of thinking is what led me to develop
					<EmbeddedLink href="https://still-bayou-51404.herokuapp.com">
						A# Maj Bridge
					</EmbeddedLink>
					using primarily vanilla HTML5, CSS3, and JS.
				</p>
				<BridgeCardSection title="Picking the Right Curriculum">
					<p>
						With a technology decision for the client-side in place, I began
						looking at server-side technologies that I could use.&nbsp; It
						didn't take long for me to find NodeJS.&nbsp; Knowing what I would
						use for my server-side code made searching for bootcamps on sites
						like Udemy and YouTube much easier.&nbsp;After careful
						consideration, I decided on Colte Steele's &nbsp;
						<a
							target="_blank"
							rel="noreferrer"
							href="https://www.udemy.com/course/the-web-developer-bootcamp/"
							className={`${BRIDGE_CLASSNAME}__link`}>
							Web Developer Bootcamp
						</a>
						&nbsp; (which has since been updated) to use as the foundation for
						learning how to build a complete application using HTML5, CSS3,
						and JS.&nbsp; The rest is hard work, will power, luck, and
						curiosity.
					</p>
				</BridgeCardSection>
				<BridgeCardSection title="The Results">
					<p>
						<EmbeddedLink href="https://still-bayou-51404.herokuapp.com">
							A# Maj Bridge
						</EmbeddedLink>
						took roughly 6 months for me to complete starting from not knowing any HTML, CSS, or Javascript.&nbsp; It runs smoothly on
						Android 10+, Firefox 70+, and Chrome 70+ (but not on mobile iOS
						devices due to paperJS issues that I couldn't resolve due to the
						fact that I don't have access to an iOS device). &nbsp; It can
						host multiple simultaneous games, but is unlikely to be able to serve more than a
						thousand simultaneous games in its current state.&nbsp;{" "}
					</p>
					<p>
						Have a look at some of the fun features in the &nbsp;
						<BridgeSectionLink
							isEmbeddedLink={true}
							name="feature's section"
							sectionToSkipTo="features"></BridgeSectionLink>
						&nbsp; or check out some of the
						<EmbeddedLink href="https://github.com/Beschuetzer/Bridge">
							source code.
						</EmbeddedLink>
					</p>
				</BridgeCardSection>
			</BridgeCardSection>
		</BridgeCard>
	</SectionContainer>,
	<SectionContainer name={bridgeSections[3]} pageName="bridge">
		<BridgeCard titleSize="two" titleContent={bridgeSections[3]}>
			<BridgeCardSection title="No One Technology is 'Better'">
				<p>
					It's easy to think in the absolute terms of 'good', 'better', and
					'best'.&nbsp; My experience coding
					<EmbeddedLink href="https://still-bayou-51404.herokuapp.com">
						A# Maj Bridge
					</EmbeddedLink>
					has illustrated to me that when it comes to web development thinking
					in these terms doesn't cut it.&nbsp;
				</p>
			</BridgeCardSection>
			<BridgeCardSection title="A 'Better' Approach">
				<p>
					How soon does it need to be finished?&nbsp; Does it need to be able
					to scale up to millions of users?&nbsp; What types of browser
					support does it need to have?&nbsp; These are all crucial
					considerations to take into account before dashing off the starting
					line and potentially taking a wrong turn somewhere from which you
					may need to backtrack.
				</p>
			</BridgeCardSection>
		</BridgeCard>
	</SectionContainer>,
];

interface BridgeProps {
	isMobile: boolean;
	setClickedBridgeInfoButtonCount: (value: number) => any;
	setCurrentBridgeSection: (value: number) => any;
	setHasClickedALink: (value: boolean) => any;
}

const Bridge: React.FC<BridgeProps> = ({
	setHasClickedALink,
	setClickedBridgeInfoButtonCount,
	setCurrentBridgeSection,
	isMobile,
}) => {
	const leftArrowProps = {direction: 'left'};
	const rightArrowProps = {direction: 'right'};
	
	useEffect(() => {
		setLinearGradientCssCustomProp();
		setHasClickedALink(false);
	}, [setHasClickedALink]);

	useEffect(() => {
		const heroMore = document.querySelector('.hero__more')
		resetBridgeHero({current: heroMore} as Reference)
		setClickedBridgeInfoButtonCount(0);
		setCurrentBridgeSection(0);

		return () => {
			setClickedBridgeInfoButtonCount(0);
			setCurrentBridgeSection(0);
		};
	}, [setClickedBridgeInfoButtonCount, setCurrentBridgeSection]);

	//adding scroll listener
	useEffect(() => {
		const handleScroll = (e: React.UIEvent<HTMLElement>) => {
			if (isMobile)
				document
					.querySelector(".hero")
					?.classList.remove(DISPLAY_NONE_CLASSNAME);
			if (window.scrollY >= window.innerHeight / 2) {
				document
					.querySelector(".arrow-button--right")
					?.classList.remove(DISPLAY_NONE_CLASSNAME);
			}
			if (window.scrollY >= window.innerHeight) {
				if (!isMobile)
					document
						.querySelector(".hero")
						?.classList.add(DISPLAY_NONE_CLASSNAME);
						setClickedBridgeInfoButtonCount(2);
			}
		};

		window.addEventListener("scroll", handleScroll as any);

		return () => {
			window.removeEventListener("scroll", handleScroll as any);
		};
	}, [isMobile, setClickedBridgeInfoButtonCount]);



	const renderSections = () => {
		return sectionContents.map((item, index) => {
			return <React.Fragment key={index}>{item}</React.Fragment>;
		});
	};

	return (
		<div className="bridge">
			<BridgeHero/>

			<SourceCodeLink
				href="https://github.com/Beschuetzer/Bridge"
				// blockName="hero"
			/>

			{renderSections()}
			<ArrowButton {...leftArrowProps} />
			<ArrowButton {...rightArrowProps} />
		</div>
	);
};

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		isMobile: state.general.isMobile,
		hasClickedALink: state.bridge.hasClickedALink,
	};
};

export default connect(mapStateToProps, {
	setHasClickedALink,
	setClickedBridgeInfoButtonCount,
	setCurrentBridgeSection,
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
