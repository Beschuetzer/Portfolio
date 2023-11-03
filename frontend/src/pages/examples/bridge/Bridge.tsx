import React, { useRef } from "react";
import { useEffect } from "react";
import {
	DISPLAY_NONE_CLASSNAME,
	LIVE_BRIDGE_URL,
	GITHUB_URL,
	BRIDGE_PAGE_NAME,
	BRIDGE_DEMO_URL,
	BRIDGE_HERO_CLASSNAME,
	BRIDGE_HERO_CLICKED_CLASSNAME,
	BRIDGE_HERO_MORE__CLICKED_CLASSNAME,
} from "../../../components/constants";
import { BridgeHero } from "./BridgeHero";
import { SourceCodeLink } from "../../../components/SourceCodeLink";
import { BridgeArrowButton } from "./BridgeArrowButton";
import { setHasClickedALink, setClickedBridgeInfoButtonCount, setCurrentBridgeSection } from "../../../slices/bridgeSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { isMobileSelector } from "../../../slices/generalSlice";
import { setLinearGradientCssCustomProp, resetBridgeHero } from "./utils";
import { BridgeSectionContainer } from "./BridgeSectionContainer";

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
	}, [dispatch]);

	useEffect(() => {
		resetBridgeHero(bridgeHeroRef);
		dispatch(setClickedBridgeInfoButtonCount(0));
		dispatch(setCurrentBridgeSection(0));

		return () => {
			dispatch(setClickedBridgeInfoButtonCount(0));
			dispatch(setCurrentBridgeSection(0));
		};
	}, [dispatch]);

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
	}, [isMobile, dispatch, hero, heroMore?.classList]);


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
			<BridgeSectionContainer/>
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
