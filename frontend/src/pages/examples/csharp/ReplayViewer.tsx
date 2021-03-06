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

import img1Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-1-thumbnail.png";
import img2Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-2-thumbnail.png";
import img3Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-3-thumbnail.png";
import img4Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-4-thumbnail.png";
import img5Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-5-thumbnail.png";
import img6Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-6-thumbnail.png";
import img7Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-7-thumbnail.png";
import imgDealThumbnail from "../../../imgs/replay-viewer/thumbnails/img-deal-1-thumbnail.png";
import imgGameThumbnail from "../../../imgs/replay-viewer/thumbnails/img-game-1-thumbnail.png";
import imgUserThumbnail from "../../../imgs/replay-viewer/thumbnails/img-user-1-thumbnail.png";
import imgStoreThumbnail from "../../../imgs/replay-viewer/thumbnails/img-store-1-thumbnail.png";
import imgMobile1Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-mobile-1-thumbnail.png";
import imgMobile2Thumbnail from "../../../imgs/replay-viewer/thumbnails/img-mobile-2-thumbnail.png";
import clipAnimationsThumbnail from "../../../clips/replay-viewer/thumbnails/animations-thumbnail.png";
import clipDealPlayerThumbnail from "../../../clips/replay-viewer/thumbnails/deal-player-thumbnail.png";
import clipFiltersThumbnail from "../../../clips/replay-viewer/thumbnails/filters-thumbnail.png";

import CSharpCardSection from "./CSharpCardSection";
import { C_SHARP_CLASSNAME } from "./utils";
import Paragraph from "../../../typography/Paragraph";
import {
	closeCarouselItem,
	functionToGetContainer,
} from "../../../components/utils";
import {
	LIVE_BRIDGE_URL,
	CSharpSection,
	GITHUB_URL,
	LIVE_REPLAYS_URL,
} from "../../../components/constants";
import Quote from "../../../components/Quote";

const sectionNames = ["Motivation", "Media", "Features", "Notes"];

const sections: CSharpSection[] = [
	{
		name: sectionNames[0],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<Quote author="Anonymous">
					When the why is clear, the how is easy.
				</Quote>
				<CSharpCardSection title="The Reasons">
					<Paragraph size="five">
						There are two reasons why I chose to build the
						<EmbeddedLink addSpaces={false} isLocal={false} href={LIVE_REPLAYS_URL}>
							A# Maj Replay Viewer
						</EmbeddedLink>
						.
					</Paragraph>
					<Paragraph size="five" classNameToAdd="margin-top-1">
						First, in March of 2021, I finished&nbsp;
						<EmbeddedLink addSpaces={false} isLocal={false} href={LIVE_BRIDGE_URL}>
							A# Maj Bridge
						</EmbeddedLink>
						, which saves games, deals, and user statistics into a mongoDB
						database.&nbsp; There have been multiple times where it would have
						been nice to review games without having to log into the database
						and decipher the raw data.&nbsp;
					</Paragraph>

					<Paragraph size="five" classNameToAdd="margin-top-1">
						Second, I wanted to improve my familiarity with Narwahl's NX
						workspace and Angular.&nbsp; What better way to do that than to
						create a real-world application with a practical use?
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
			<div className="csharp__carousel">
				<Carousel
					items={[
						{
							itemSrc: img1,
							itemThumbnailSrc: img1Thumbnail,
							description: "First impressions matter.",
						},
						{
							itemSrc: clipFilters,
							itemThumbnailSrc: clipFiltersThumbnail,
							description: "Applying Filters",
							videoOverlayText: "Applying Filters",
							videoOverlayChildren: (
								<div>
									<CSharpCardSection title="Contract is 1&clubs;">
										The first part of the video highlights the process of
										applying the contract matching filter.&nbsp; There are two
										matches found.
									</CSharpCardSection>
									<CSharpCardSection title="Two Filters = Double the Filtering">
										The second filter applied requires 'Ann' to have the
										2&clubs;. In one of the filtered games, she does and in the
										other one she doesn't.
									</CSharpCardSection>
								</div>
							),
						},
						{
							itemSrc: clipDealPlayer,
							itemThumbnailSrc: clipDealPlayerThumbnail,
							description: "Using the deal player",
							videoOverlayText: "Watching Replays",
							videoOverlayChildren: (
								<div>
									<CSharpCardSection title="Critical Analysis">
										One of the main reasons I created the{" "}
										<EmbeddedLink isLocal={false} href={LIVE_REPLAYS_URL}>
											Replay Viewer
										</EmbeddedLink>{" "}
										was to be able to easily review the trick-taking phase of
										games completed on{" "}
										<EmbeddedLink isLocal={false} href={LIVE_BRIDGE_URL}>
											A# Maj Bridge
										</EmbeddedLink>
										.
									</CSharpCardSection>
									<CSharpCardSection title="Viewing Options">
										There are two ways to get to the questionable play:&nbsp; by
										turning on auto play or by skipping ahead to the trick in
										question.
									</CSharpCardSection>
								</div>
							),
						},
						{
							itemSrc: clipAnimations,
							itemThumbnailSrc: clipAnimationsThumbnail,
							description: "Misc. Animations",
							ideoOverlayText: "Watching Replays",
							videoOverlayChildren: (
								<div>
									<CSharpCardSection title="Cherry on Top">
										Animations can turn a boring app into an interesting one,
										assuming the user experience is good.
									</CSharpCardSection>
								</div>
							),
						},
						{
							itemSrc: img2,
							itemThumbnailSrc: img2Thumbnail,
							description: "Overall Layout",
						},
						{
							itemSrc: img3,
							itemThumbnailSrc: img3Thumbnail,
							description: "Filters en masse",
						},
						{
							itemSrc: img4,
							itemThumbnailSrc: img4Thumbnail,
							description: "Filters applied and results shown.",
						},
						{
							itemSrc: img5,
							itemThumbnailSrc: img5Thumbnail,
							description: "Game detail screen collapsed",
						},
						{
							itemSrc: img6,
							itemThumbnailSrc: img6Thumbnail,
							description: "Game detail screen expanded",
						},
						{
							itemSrc: img7,
							itemThumbnailSrc: img7Thumbnail,
							description: "Deal player layout",
						},
						{
							itemSrc: imgMobile1,
							itemThumbnailSrc: imgMobile1Thumbnail,
							description: "Mobile game detail",
						},
						{
							itemSrc: imgMobile2,
							itemThumbnailSrc: imgMobile2Thumbnail,
							description: "Mobile deal player",
						},
						{
							itemSrc: imgStore,
							itemThumbnailSrc: imgStoreThumbnail,
							description: "What the store looks like",
						},
						{
							itemSrc: imgGame,
							itemThumbnailSrc: imgGameThumbnail,
							description: "Example of a game cached in local storage",
						},
						{
							itemSrc: imgDeal,
							itemThumbnailSrc: imgDealThumbnail,
							description: "Example of a deal cached in local storage",
						},
						{
							itemSrc: imgUser,
							itemThumbnailSrc: imgUserThumbnail,
							description: "Example of a user cached in local storage",
						},
					]}
					numberOfItemsInCarouselWidthWise="3"
					numberOfItemsToScrollOnClick="3"
					functionToGetContainer={functionToGetContainer}
					functionToRunOnClose={closeCarouselItem.bind(
						null,
						null as any,
						`#${sectionNames[1].toLowerCase()}`,
					)}
				/>
			</div>,
		],
	},
	{
		name: sectionNames[2],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<Quote author="Tim Cook" className="padding-top-1">
					A great product isn't just a collection of features. &nbsp;It's how it
					all works together.
				</Quote>

				<CSharpCardSection title="Filters">
					<Paragraph size="five">
						There are two type of filters that can be applied: game-level and
						deal-level.&nbsp; Game-level filters work by checking the games in
						the current currently-displayed games array.&nbsp; Deal-level
						filters work by checking the deals of the games that pass the
						game-level filters.
					</Paragraph>
					<Paragraph size="five" classNameToAdd="margin-top-1">
						When both types of filters are applied at the same time, games are
						checked first.&nbsp; If a match is found, that game is added to the
						filtered games.
					</Paragraph>
					<Paragraph size="five" classNameToAdd="margin-top-1">
						Thereafter, the game's deals are checked to see if any of them match
						any of the applied deal-level filters.&nbsp; If a match is found on
						the deal-level, that deal is sent to an array of deals which is used
						to highlight that deal when the game detail is opened. &nbsp; If
						there are no deal-level filters applied, then deal checking is
						skipped.&nbsp;
					</Paragraph>
				</CSharpCardSection>
				<CSharpCardSection title="Preferences">
					<Paragraph size="five">
						There are three preferences the user can select from: size, sort,
						and resultsPerPage.
					</Paragraph>
					<Paragraph size="five" classNameToAdd="margin-top-1">
						Size refers to the size of the game detail card in the games list
						view.&nbsp; There are three options: large, medium, and small.
					</Paragraph>
					<Paragraph size="five" classNameToAdd="margin-top-1">
						Sort refers to whether the matched games are sorted in descending or
						ascending order based on the completion date.
					</Paragraph>
					<Paragraph size="five" classNameToAdd="margin-top-1">
						Results per page refers to how many matched games are displayed at
						one time.&nbsp; The options are: 1, 2, 5, 10, 25, 50, and 100.
					</Paragraph>
				</CSharpCardSection>
				<CSharpCardSection title="Caching">
					<Paragraph size="five">
						The results of each query are stored in local storage, allowing for
						faster load times on subsequent queries of the same username as well
						as any other usernames that were part of any of the cached
						deals/games.&nbsp; Preferences, users, userIds, deals, and games are
						all stored in local storage as separate items.&nbsp; The keys are
						the id of the item and the value is the relevant data for that item.
					</Paragraph>
					{/* <Paragraph size="five">
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
					<Paragraph size="five">
						It should be noted that the current implementation would not scale
						nicely as a player with tens of thousands of deals would have to
						download most of those deals on every query (local storage max is
						5mb and each deal is around 2kb), leading to an unacceptably-long
						delay.
					</Paragraph>
					<Paragraph size="five" classNameToAdd="margin-top-1">
						However, given that the most deals any user has is less than six
						hundred at this time, this concern is currently secondary in
						nature.&nbsp; It would be fairly easy to fix though by adding
						pagination.
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
			href={LIVE_REPLAYS_URL}
			sections={sections}
			pageName="replay-viewer"
			sourceCodeLink={`${GITHUB_URL}/nxBridge`}
			demoLink={LIVE_REPLAYS_URL}>
			{" "}
		</CSharpLayout>
	);
};

export default ReplayViewer;
