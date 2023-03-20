import React, { useRef } from "react";
import { useEffect } from "react";
import { EmbeddedLink } from "../../../components/EmbeddedLink";
import { BridgeSection } from "./BridgeSection";
import BridgeCardSection from "./BridgeCardSection";
import { SectionContainer } from "../../../components/SectionContainer";
import { Card } from "../../../components/Card/Card";
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
import { CardManager } from "../../../components/Card/CardManager";
import {
	DISPLAY_NONE_CLASSNAME,
	LIVE_BRIDGE_URL,
	GITHUB_URL,
	WIKIPEDIA_BRIDGE_URL,
	ODIN_PROJECT_URL,
	UDEMY_BOOTCAMP_URL,
	PLAYLIST_SYNCER_URL,
	DOWNLOADER_URL,
	RESUME_URL,
	BRIDGE_PAGE_NAME,
	BRIDGE_DEMO_URL,
	bridgeSectionNames,
	BRIDGE_BACKDROP_CLASSNAME,
	BRIDGE_CLASSNAME,
	BRIDGE_HERO_CLASSNAME,
	BRIDGE_HERO_CLICKED_CLASSNAME,
	BRIDGE_HERO_MORE__CLICKED_CLASSNAME,
} from "../../../components/constants";
import { BridgeHero } from "./BridgeHero";
import { SourceCodeLink } from "../../../components/SourceCodeLink";
import { BridgeArrowButton } from "./BridgeArrowButton";
import { Quote } from "../../../components/Quote";
import { BridgeSectionLink } from "./BridgeSectionLink";
import { setHasClickedALink, setClickedBridgeInfoButtonCount, setCurrentBridgeSection } from "../../../slices/bridgeSlice";
import { RootState } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { isMobileSelector } from "../../../slices/generalSlice";
import { Reference } from "../../../types";
import { setLinearGradientCssCustomProp, resetBridgeHero } from "./utils";

const sectionContents = [
	<SectionContainer index={0} name={bridgeSectionNames[0]} pageName={BRIDGE_PAGE_NAME}>
		<BridgeSection titleSize="two" titleContent={bridgeSectionNames[0]}>
			<Quote author="Timothy Ferriss" className="padding-bottom-2">
				What we fear doing most is usually what we most need to do.
			</Quote>
			<BridgeCardSection
				title="What is A#Maj Bridge?"
				// title='An App is Born'
			>
				<p>
					<EmbeddedLink href={LIVE_BRIDGE_URL}>A# Maj Bridge</EmbeddedLink>is a
					socket.io and MongoDB app I created where users can play
					<EmbeddedLink href={WIKIPEDIA_BRIDGE_URL}>
						contract bridge
					</EmbeddedLink>
					online for free.&nbsp; I started serious coding of the project in
					August of 2020 and completed the main code base in January of 2021.
				</p>
			</BridgeCardSection>
			<BridgeCardSection
				title="Motivation"
				// title='An App is Born'
			>
				<p>
					It was June of 2020, and I had just left my job at
					<EmbeddedLink
						href={`${RESUME_URL}#ricoh`}
						openInNewTab={true}
						isLocal={true}>
						Ricoh
					</EmbeddedLink>
					to become a web developer.&nbsp; &nbsp;My two smaller c# projects (
					<EmbeddedLink isLocal={true} href={DOWNLOADER_URL}>
						downloader
					</EmbeddedLink>
					and
					<EmbeddedLink href={PLAYLIST_SYNCER_URL} isLocal={true}>
						playlist syncer
					</EmbeddedLink>
					) were finished and I was looking for another project that would
					challenge me to ascend to the next level.
				</p>
				<p>
					A friend of mine mentioned how much he missed playing bridge since the
					pandemic had started.&nbsp; Initially, I suggested we look for a
					free-to-play Bridge app.&nbsp; However, after extensively searching
					for such an app to no avail, it was clear I would have to make one if
					we wanted to play online for free.
				</p>
			</BridgeCardSection>
			<BridgeCardSection
				title="A Germinating Seed"
				// title='An App is Born'
			>
				<p>
					It was shortly after that conversation that I resolved to make the
					best free-to-play contract Bridge application I could while not
					knowing any HTML, CSS, or JS at that time.
				</p>
				<p>
					If I could make a seamless multiplayer contract bridge application, I
					was convinced I would have what it takes to justify devoting more time
					and energy to becoming an employed web developer.&nbsp; If not, I
					could always go back to Tech Support...
				</p>
				<p>
					Click&nbsp;
					<BridgeSectionLink
						isEmbeddedLink={true}
						name="here"
						sectionToSkipTo="features"
					/>{" "}
					to learn about the features I built into
					<EmbeddedLink href={LIVE_BRIDGE_URL}>A# Maj Bridge</EmbeddedLink>.
				</p>
			</BridgeCardSection>
		</BridgeSection>
	</SectionContainer>,
	<SectionContainer index={1} name={bridgeSectionNames[1]} pageName={BRIDGE_PAGE_NAME}>
		<BridgeSection
			selectorToUseForSubtitle={(state: RootState) => state.bridge.featureSectionTitle}
			titleSize="two"
			titleContent={bridgeSectionNames[1]}>
			<CardManager>
				<Card
					video={cardPlayAndRoundEndVideo}
					cardName="ace-of-spades"
					title="Animations"
					videoSubTitle="Two Animations">
						<ul>
							<li>
								Card Play - mimics a perfectly thrown card when others play
							</li>
							<li>Round End - mimics a rocket 'blasting off' of the table.</li>
						</ul>
				</Card>
				<Card video={undoVideo} cardName="ace-of-hearts" title="Undo">
						<p>
							Players are able to undo during the bidding phase as well as the
							playing phase.
						</p>
				</Card>
				<Card
					video={saveGameVideo}
					cardName="ace-of-diamonds"
					title="Save Games">
						<p>
							The server saves each play and bid automatically, allowing players
							to resume playing at a later time without having to worry about
							losing the game state.
						</p>
				</Card>
				<Card
					video={resizingVideo}
					cardName="ace-of-clubs"
					title="Dynamic Resizing">
						<p>
							The playing screen dynamically adjusts to the viewport, allowing
							users to play on their Android phone or with the window only
							taking up a fraction of the screen.
						</p>
				</Card>
				<Card cardName="king-of-spades" title="Claim All" video={claimAllVideo}>
						<p>
							'Claim All' allows players to claim the rest of the tricks rather
							than play them out. &nbsp;It does this by showing he claimer's
							cards to the two defensive players.&nbsp; If both players accept
							the claim, the claimer gets the rest of the tricks and the game
							moves to the deal summary screen.
						</p>
				</Card>
				<Card
					video={claimSomeVideo}
					cardName="king-of-hearts"
					title="Claim Some">
						<p>
							The 'Claim Some' feature speeds up gameplay in some scenarios by allowing the declarer (person playing the contract) to
							claim some number of tricks less than or equal to the number of
							tricks remaining.&nbsp; The UI guides players through the
							selection process by disabling invalid choices and
							displaying the choices made in a table.
						</p>
				</Card>
				<Card
					video={dealSummaryVideo}
					cardName="king-of-diamonds"
					title="Deal Summary">
						<p>
							The Deal Summary screen allows players to review the bidding and
							playing phases of the last deal.&nbsp; It does this by displaying
							the bidding order (who bid what when) and which cards each player
							had in their hand at the beginning of each trick.&nbsp; Such
							information is useful for self-improvement and providing feedback
							to others.
						</p>
				</Card>
				<Card
					video={preferencesVideo}
					cardName="king-of-clubs"
					title="Preferences">
						<p>
							Preferences allow each player to customize the experience of the
							game.&nbsp; Card sorting order, sounds, animation toggling, color
							themes, card back image, and other preferences are all
							customizable via the preferences page.
						</p>
				</Card>
				<Card video={themesVideo} cardName="queen-of-spades" title="Themes">
						<p>
							There are 8 different color themes available. Some are
							intentionally strange, while others are meant to impress.
						</p>
				</Card>
				<Card
					video={playingACardVideo}
					cardName="queen-of-hearts"
					title="Card Play Options"
					videoSubTitle="three ways to play a
					card">		
						<ul>
							<li>drag and drop the card</li>
							<li>double click the card</li>
							<li>use the keyboard shortcut for that card</li>
						</ul>
				</Card>
			</CardManager>
			<div className={BRIDGE_BACKDROP_CLASSNAME}></div>
		</BridgeSection>
	</SectionContainer>,
	<SectionContainer index={2} name={bridgeSectionNames[2]} pageName={BRIDGE_PAGE_NAME}>
		<BridgeSection titleSize="two" titleContent={bridgeSectionNames[2]}>
			<Quote author="Walt Disney" className="padding-bottom-2">
				There's no magic in magic, it's all in the details.
			</Quote>
			<BridgeCardSection title="Off and Running">
				<p>
					Because I had just completed the
					<EmbeddedLink isLocal={true} href={DOWNLOADER_URL}>
						downloader
					</EmbeddedLink>
					and
					<EmbeddedLink href={PLAYLIST_SYNCER_URL} isLocal={true}>
						playlist syncer
					</EmbeddedLink>
					projects, I initially tried creating
					<EmbeddedLink href={LIVE_BRIDGE_URL}>A# Maj Bridge</EmbeddedLink>using
					c#/WPF.&nbsp; However, it became readily-apparent early on that it
					would be rather challenging to create the bridge app I had envisioned
					using c#/WPF.
				</p>
				<p>
					After some research, I made the decision to create the whole app
					around socket.io and MongoDB, which would handle the real-time aspects
					of the app.&nbsp; The only problem was I had absolutely no idea how to
					create a web application at that point in time.&nbsp; After googling
					some more, I found an exquisite resource called
					<EmbeddedLink href={ODIN_PROJECT_URL}>The Odin Project</EmbeddedLink>.
				</p>
			</BridgeCardSection>
			{/* <BridgeCardSection title="A Tough Decision">
				<p>
					Before I had found the<EmbeddedLink href={ODIN_PROJECT_URL}>
						The Odin Project
					</EmbeddedLink>, I had been under the impression that one needed to have a Computer
					Science degree in order to become a web developer.&nbsp; That
					assumption was shattered upon reading about some of the experiences
					others had had with the<EmbeddedLink href={ODIN_PROJECT_URL}>
						The Odin Project
					</EmbeddedLink>. Then and there, a hope, nay, a determination awakened inside of me
					that had lain dormant for many years.&nbsp; Maybe I too could become
					a web developer?&nbsp; I was determined to find out once and for
					all, if I have what it takes to become a web developer.&nbsp; Hence,
					I fully committed myself to making the<EmbeddedLink href={WEBSITE_BRIDGE_URL}>
						A# Maj Bridge
					</EmbeddedLink>project.
				</p> */}
			{/*NOTE: Not likely to use below here*/}
			{/* <p>
						Ultimately my decision to become a web developer came down to the fact that I knew I would regret it in the future if I didn't give it an honest effort to become a web developer.  &nbsp;With the COVID-19 pandemic in full swing, I knew I would have time to explore my potential.
					</p> 
					<p>
						I had taken MOOC courses in the past on EdX about computer programming, but I lacked the motivation to complete them because I told myself it wouldn't amount to anything.  &nbsp;Knowing now, that there was a chance to become a web developer, &nbsp;I couldn't see how I wouldn't regret not trying to become a web developer.&nbsp; Hence the reason I dove into the<EmbeddedLink href={WEBSITE_BRIDGE_URL}>A# Maj Bridge</EmbeddedLink>project. */}
			{/* 							
						 I look at my life 10 years from now and ask what if I had completely devoted my energy to becoming a web developer?  I couldn't imagine a scenario where I would be ok with just giving up on something that I enjoyed so much.&nbsp; With the pandemic looking like it was just getting started, I decided to take a leap of faith in myself: I decided to become a web developer. */}
			{/* </p> */}

			{/* I decided, then and there, to put everything I had into realizing this goal.&nbsp; I was prepared to do whatever it takes to realize this goal.&nbsp; My biggest fear at this point was to die having not tried.&nbsp; */}

			{/* <p>
						Do I have what it takes?  Will I be able to find a job during the pandemic?  These were questions that I was scared to face, but, to me, scarier was not pursing something that I have enjoyed doing since I was a kid.
					</p> */}
			{/* </BridgeCardSection> */}
			{/* <BridgeCardSection title="The Approach">
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
						href={`${RESUME_URL}#work-history`}"
						target="_blank"
						rel="noreferrer">
						service technician position
					</a>{" "}
					at<EmbeddedLink href={`${RESUME_URL}#ricoh`} openInNewTab={true} isLocal={true}>Ricoh</EmbeddedLink>in order to free up the time and energy needed to
					whole-heartily devote myself to the project.
				</p> */}

			{/* note: not used after here 
					<p>
						First, I needed some sort of test that was sufficiently complex and representative enough of actual real-world applications, such that if I could pass it, I would know I am on the right track.&nbsp;

						This is when<EmbeddedLink href={WEBSITE_BRIDGE_URL}>A# Maj Bridge</EmbeddedLink>became a full-time endeavor.&nbsp; 
					</p> */}
			{/* </BridgeCardSection> */}
			<BridgeCardSection title="To Pay or Not To Pay?">
				<p>
					I started by learning the basics via the
					<EmbeddedLink href={ODIN_PROJECT_URL}>The Odin Project</EmbeddedLink>
					.&nbsp; There I learned the basics of Ruby, HTML5, CSS3, and JS.&nbsp;
					However, after completing most of the Ruby part of the curriculum, I
					realized I would need further resources.&nbsp;
				</p>
				<p>
					This is when I started looking into Web Developer Bootcamps. &nbsp; A
					few caught my eye, but there were no guarantees that I would land a
					job at the end.&nbsp; Ultimately, I decided that the best approach
					would be to take the self-taught path.&nbsp;The main reasons were:
				</p>
				<div className={`${BRIDGE_CLASSNAME}__subsection-grid`}>
					<span>1).</span>
					<span>
						I could go at my own pace, which would allow me to move more quickly
						through the areas that I find easy while being able to spend more
						time on the areas that I find difficult.
					</span>
					<span>2).</span>
					<span>
						Paying $15-$20K for information that it is available for free or for
						much less than $15k is hardly worth it unless you are getting
						something to make the expenditure worth it.
					</span>
					<span>3).</span>
					<span>
						At the time (June 2020), the COVID-19 pandemic was in full swing,
						and bootcamps were moving to online only, making it even less
						appealing to pay $15-20K, when I wouldn't even get the face-to-face
						interactions an in-person bootcamp provides.
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
					Admittedly, it was a bit overwhelming at first figure out which stack
					to go with for the project.&nbsp; After much research, I came to the
					conclusion that sticking to the bread and butter of web development
					would be the best choice. I figured it would be beneficial to my
					future career to get 'down and dirty' with CSS and JS.&nbsp; I could
					always layer on more complexity later.
				</p>
				<p>
					For that reason, I chose to develop the frontend of
					<EmbeddedLink href={LIVE_BRIDGE_URL}>A# Maj Bridge</EmbeddedLink>with
					vanilla HTML5, CSS3, and JS and the backend with
					NodeJS(Express).&nbsp; My choice to use paperJS for the vector
					graphics library was purely because I had learned about it in Colt
					Steele's
					<EmbeddedLink href={UDEMY_BOOTCAMP_URL} isLocal={false}>
						web developer bootcamp
					</EmbeddedLink>
					and didn't have any reason at the time to think about alternatives.
				</p>
				<BridgeCardSection title="Picking the Right Curriculum">
					<p>
						Knowing what I would use on the server-side made searching for
						resources much easier.&nbsp; After careful consideration, I decided
						on Colte Steele's
						<EmbeddedLink href={UDEMY_BOOTCAMP_URL} isLocal={false}>
							Web Developer Bootcamp (2015 version)
						</EmbeddedLink>
						to use as the foundation for learning how to build a complete
						application using HTML5, CSS3, and JS.&nbsp; The rest is hard work,
						dedication, will power, luck, and curiosity.
					</p>
				</BridgeCardSection>
				<BridgeCardSection title="The Results">
					<p>
						<EmbeddedLink href={LIVE_BRIDGE_URL}>A# Maj Bridge</EmbeddedLink>
						took roughly 4 months for me to complete starting from not knowing
						any HTML, CSS, Javascript or.&nbsp; It runs smoothly on Android 10+,
						Firefox 70+, and Chrome 70+ (but not on mobile iOS devices due to
						paperJS issues that I couldn't resolve due to the fact that I don't
						have access to an iOS device and wanted to focus on other things.).
						&nbsp; It can host multiple simultaneous games, but is unlikely to
						be able to serve more than a thousand simultaneous games in its
						current state.&nbsp;{" "}
					</p>
					<p>
						Have a look at some of the fun features in the &nbsp;
						<BridgeSectionLink
							isEmbeddedLink={true}
							name="feature's section"
							sectionToSkipTo="features"></BridgeSectionLink>
						&nbsp; or check out some of the
						<EmbeddedLink href={`${GITHUB_URL}/bridge`}>
							source code.
						</EmbeddedLink>
					</p>
				</BridgeCardSection>
			</BridgeCardSection>
		</BridgeSection>
	</SectionContainer>,
	<SectionContainer index={3} name={bridgeSectionNames[3]} pageName={BRIDGE_PAGE_NAME}>
		<BridgeSection titleSize="two" titleContent={bridgeSectionNames[3]}>
			<Quote author="Zig Ziglar" className="padding-bottom-2">
				If you are not willing to learn, no one can help you.&nbsp; If you are
				determined to learn, no one can stop you.
			</Quote>
			<BridgeCardSection title="Sometimes Bread and Butter is not enough">
				<p>
					At the time it was easy for me to justify delaying learning about
					front end frameworks with the rationale that I would need to have a
					solid understanding of Javascript in order to start learning
					them.&nbsp; While that is somewhat true, learning a framework in the
					beginning would have forced me to also learn about modules and
					importing.&nbsp; That skill alone would have made my code base much
					more readable from the get go.&nbsp; Instead, I have a code base that
					needs to be completely refactored.
				</p>
			</BridgeCardSection>
			<BridgeCardSection title="Leave No Rock Unturned">
				<p>
					Choosing to rely on paperJS for my vector graphic concerns worked out
					in the end, but had I done some upfront research, I would have been
					exposed to options like threeJS much earlier.&nbsp; I may not have
					chosen to use threeJS as it may have seemed like overkill at the time,
					but knowing about your options is important, which leads me to...
				</p>
			</BridgeCardSection>
			<BridgeCardSection title="No One Technology is 'Better'">
				<p>
					It's easy to think in the absolute terms of 'good', 'better', and
					'best'.&nbsp; My experience coding
					<EmbeddedLink href={LIVE_BRIDGE_URL}>A# Maj Bridge</EmbeddedLink>has
					shown me that this way of thinking doesn't apply very well to web
					development.&nbsp; Picking the technology that meets the requirements
					with the least amount of complexity, is a more appropriate approach
					(assuming you don't already know a technology that meets the
					requirements).
				</p>
			</BridgeCardSection>
		</BridgeSection>
	</SectionContainer>,
];

interface BridgeProps {
}

export const Bridge: React.FC<BridgeProps> = () => {
	const bridgeHeroRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const isMobile = useAppSelector(isMobileSelector);
	const hero = bridgeHeroRef.current?.querySelector(`.${BRIDGE_HERO_CLASSNAME}`);
	const heroMore = bridgeHeroRef.current?.querySelector(
		`.${BRIDGE_HERO_CLASSNAME}__more`,
	);

	useEffect(() => {
		setLinearGradientCssCustomProp();
		dispatch(setHasClickedALink(false));
	}, [setHasClickedALink, dispatch]);

	useEffect(() => {
		resetBridgeHero({ current: heroMore } as Reference);
		dispatch(setClickedBridgeInfoButtonCount(0));
		dispatch(setCurrentBridgeSection(0));

		return () => {
			dispatch(setClickedBridgeInfoButtonCount(0));
			dispatch(setCurrentBridgeSection(0));
		};
	}, [dispatch, setClickedBridgeInfoButtonCount, setCurrentBridgeSection]);

	//adding scroll listener
	useEffect(() => {
		const handleScroll = (e: React.UIEvent<HTMLElement>) => {
			if (isMobile)
				hero?.classList.remove(DISPLAY_NONE_CLASSNAME);
			if (window.scrollY >= window.innerHeight / 2) {
				document
					.querySelector(".arrow-button--right")
					?.classList.remove(DISPLAY_NONE_CLASSNAME);
			}
			if (window.scrollY >= window.innerHeight) {
				if (!isMobile) {
					
					if (hero) {
						hero.classList.add(DISPLAY_NONE_CLASSNAME);
						hero.classList.remove(BRIDGE_HERO_CLICKED_CLASSNAME);
					}
					heroMore?.classList.remove(BRIDGE_HERO_MORE__CLICKED_CLASSNAME);
					dispatch(setClickedBridgeInfoButtonCount(2));
				}
			}
		};

		window.addEventListener("scroll", handleScroll as any);

		return () => {
			window.removeEventListener("scroll", handleScroll as any);
		};
	}, [isMobile, dispatch, setClickedBridgeInfoButtonCount]);

	const renderSections = () => {
		return sectionContents.map((item, index) => {
			return <React.Fragment key={index}>{item}</React.Fragment>;
		});
	};

	function renderSourceLinks() {
		const codeSourceLink = (
			<SourceCodeLink href={`${GITHUB_URL}/${BRIDGE_PAGE_NAME}`} />
		);

		const demoSourceLink = (
			<SourceCodeLink
				className="source-link__demo"
				href={BRIDGE_DEMO_URL}
				msg={"Demo"}
			/>
		);

		const liveSourceLink = (
			<SourceCodeLink
				className="source-link__live"
				href={LIVE_BRIDGE_URL}
				msg={"Live Site"}
			/>
		);

		if (isMobile)
			return (
				<div className="source-link__container">
					{codeSourceLink}
					{liveSourceLink}
					{demoSourceLink}
				</div>
			);

		return (
			<React.Fragment>
				{codeSourceLink}
				{liveSourceLink}
				{demoSourceLink}
			</React.Fragment>
		);
	}

	return (
		<div className={BRIDGE_PAGE_NAME}>
			<BridgeHero ref={bridgeHeroRef}/>
			{renderSourceLinks()}
			{renderSections()}
			<BridgeArrowButton direction="left" />
			<BridgeArrowButton direction="right" />
		</div>
	);
};

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
