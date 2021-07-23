import React from "react";
import Carousel from "../../../components/Carousel/Carousel";
import CSharpLayout from "./CSharpLayout";
import EmbeddedLink from "../../../components/EmbeddedLink";

import img1 from "../../../imgs/replay-viewer/img-1.png";
import img2 from "../../../imgs/replay-viewer/img-2.png";
import img3 from "../../../imgs/replay-viewer/img-3.png";
import img4 from "../../../imgs/replay-viewer/img-4.png";
import img5 from "../../../imgs/replay-viewer/img-5.png";
import img6 from "../../../imgs/replay-viewer/img-6.png";
import img7 from "../../../imgs/replay-viewer/img-7.png";
import imgDeal from "../../../imgs/replay-viewer/img-deal-1.png";
import imgGame from "../../../imgs/replay-viewer/img-game-1.png";
import imgUser from "../../../imgs/replay-viewer/img-user-1.png";
import imgStore from "../../../imgs/replay-viewer/img-store-1.png";
import imgMobile1 from "../../../imgs/replay-viewer/img-mobile-1.png";
import imgMobile2 from "../../../imgs/replay-viewer/img-mobile-2.png";
import clipAnimations from "../../../clips/replay-viewer/animations.mp4";
import clipDealPlayer from "../../../clips/replay-viewer/deal-player.mp4";
import clipFilters from "../../../clips/replay-viewer/filters.mp4";
import CSharpCardSection from "./CSharpCardSection";
import { C_SHARP_CLASSNAME } from "./utils";
import Paragraph from "../../../typography/Paragraph";
import {
	fixZIndexIssue,
	functionToGetContainer,
} from "../../../components/utils";
import {
	CSharpSection,
	GITHUB_URL,
	REPLAYS_URL,
} from "../../../components/constants";

const sectionNames = ["Motivation", "Media", "Features", "Notes"];

const sections: CSharpSection[] = [
	{
		name: sectionNames[0],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="The Reasons">
					<Paragraph size="four">
						There are two reasons why I chose to build the
						<EmbeddedLink isLocal={false} href={REPLAYS_URL}>
							A# Maj Replay Viewer
						</EmbeddedLink>
						.
					</Paragraph>
					<Paragraph size="four" classNameToAdd="margin-top-1">
						First, in March of 2021, I finished
						<EmbeddedLink isLocal={false} href="">
							A# Maj Bridge
						</EmbeddedLink>
						, which saves games, deals, and user statistics in a mongoDB
						database.&nbsp; There have been multiple times where it would have
						been nice to review games without having to login to the db and look
						at the decipher the raw data.&nbsp;
					</Paragraph>

					<Paragraph size="four" classNameToAdd="margin-top-1">
						Second, I wanted to improve my Angular familiarity by creating a
						"real-world" application.&nbsp; What better way to do that than to
						do something useful at the same time?
					</Paragraph>
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		styles: {
			position: "relative",
		},
		name: sectionNames[1],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<section className="csharp__carousel">
				<Carousel
					items={[
						{
							itemSrc: img1,
							description: "First impressions matter.",
						},
						{
							itemSrc: clipFilters,
							description: "Applying Filters",
						},
						{
							itemSrc: clipDealPlayer,
							description: "Using the deal player",
						},
						{
							itemSrc: clipAnimations,
							description: "Misc. Animations",
						},
						{
							itemSrc: img2,
							description: "Overall Layout",
						},
						{
							itemSrc: img3,
							description: "Filters en masse",
						},
						{
							itemSrc: img4,
							description: "Filters applied and results shown.",
						},
						{
							itemSrc: img5,
							description: "Game detail screen collapsed",
						},
						{
							itemSrc: img6,
							description: "Game detail screen expanded",
						},
						{
							itemSrc: img7,
							description: "Deal player layout",
						},
						{
							itemSrc: imgMobile1,
							description: "Mobile game detail",
						},
						{
							itemSrc: imgMobile2,
							description: "Mobile deal player",
						},
						{
							itemSrc: imgStore,
							description: "What the store looks like",
						},
						{
							itemSrc: imgGame,
							description: "Example of a game cached in local storage",
						},
						{
							itemSrc: imgDeal,
							description: "Example of a deal cached in local storage",
						},
						{
							itemSrc: imgUser,
							description: "Example of a user cached in local storage",
						},
					]}
					numberOfItemsInCarouselAtOneTime="3"
					numberOfItemsToScrollOnClick="3"
					functionToGetContainer={functionToGetContainer}
					functionToRunOnClose={fixZIndexIssue.bind(
						null,
						null as any,
						`#${sectionNames[1].toLowerCase()}`,
					)}
				/>
			</section>,
		],
	},
	{
		name: sectionNames[2],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="Filters">
					<Paragraph size="four">
						There are two type of filters that can be applied: Game-level and
						Deal-level.&nbsp; Game-level filters work by checking the
						currently-displayed games only.&nbsp; Deal-level filters work by
						checking only the deals of the currently-displayed games.&nbsp; If
						both types of filters are applied at the same time, the game is
						first checked, then the deals are checked to see if a match is
						found.&nbsp; If so, the game is send to an array of filtered games
						and if one of the deal filters matches, then that deal is sent to an
						array of matching deals.&nbsp;{" "}
					</Paragraph>
				</CSharpCardSection>
				<CSharpCardSection title="Preferences">
					<Paragraph size="four">
						There are three preferences the user can select from: size, sort,
						and resultsPerPage.
					</Paragraph>
					<Paragraph size="four" classNameToAdd="margin-top-1">
						Size refers to the size of the game detail card in the games list
						view.&nbsp; There are three options: Large, Medium, and Small.
					</Paragraph>
					<Paragraph size="four" classNameToAdd="margin-top-1">
						Sort refers to whether the matched games are sorted in descending or
						ascending order based on the completion date.
					</Paragraph>
					<Paragraph size="four" classNameToAdd="margin-top-1">
						Results per page refers to how many matched games are displayed at
						one time.&nbsp; The choices are: 1, 2, 5, 10, 25, 50, and 100.
					</Paragraph>
				</CSharpCardSection>
				<CSharpCardSection title="Caching">
					<Paragraph size="four">
						The results of each query are stored in local storage, allowing for
						faster load times on subsequent queries of the same username as well
						as any other usernames that were part of any of the cached
						deals/games.&nbsp; Preferences, users, userIds, deals, and games are
						all stored in local storage as separate items.&nbsp; The keys are
						the id of the item and the value is the relevant data for that item.
					</Paragraph>
					{/* <Paragraph size="four">
						The application works by utilizing local storage to cache games and
						deals for each player that a user searchs.&nbsp; Only new games and
						deals are downloaded on each subsequent query of a given player's
						username.&nbsp;
					</Paragraph> */}
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[3],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="On Caching">
					<Paragraph size="four">
						It should be noted that the current implementation would not scale
						nicely as a player with tens of thousands of deals would have to
						download most of those deals on every query (local storage max is
						5mb and each deal is around 2kb), leading to an unacceptably-long
						delay.&nbsp; Given that the most deals any user has is less than a
						thousand, this concern is currently irrelevant (adding pagination
						would remedy this concern).
					</Paragraph>
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
];

interface ReplayViewerProps {}

const ReplayViewer: React.FC<ReplayViewerProps> = () => {
	return (
		<CSharpLayout
			href={REPLAYS_URL}
			sections={sections}
			pageName="replay-viewer"
			sourceCodeLink={`${GITHUB_URL}/nxBridge`}
			demoLink={REPLAYS_URL}>
			{" "}
		</CSharpLayout>
	);
};

export default ReplayViewer;
