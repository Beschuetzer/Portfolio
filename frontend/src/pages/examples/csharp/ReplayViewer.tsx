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
import imgMobile1 from "../../../imgs/replay-viewer/img-mobile-1.png";
import imgMobile2 from "../../../imgs/replay-viewer/img-mobile-2.png";
import CSharpCardSection from "./CSharpCardSection";
import { C_SHARP_CLASSNAME } from "./utils";
import Paragraph from "../../../typography/Paragraph";
import {
	fixZIndexIssue,
	functionToGetContainer,
} from "../../../components/utils";
import {
	CSharpSection,
	WEBSITE_REPLAYS_URL,
} from "../../../components/constants";

const sectionNames = ["Motivation", "Media", "Hands On"];

const sections: CSharpSection[] = [
	{
		name: sectionNames[0],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="The Reasons">
					<Paragraph size="four">
						There are two reasons why I chose to build the
						<EmbeddedLink isLocal={false} href={WEBSITE_REPLAYS_URL}>
							A# Maj Replay Viewer
						</EmbeddedLink>.
					</Paragraph>
					<Paragraph size="four" classNameToAdd="margin-top-1">
						First, in March of 2021, I finished
						<EmbeddedLink isLocal={false} href="">
							A# Maj Bridge
						</EmbeddedLink>, which saves games, deals, and user statistics in a mongoDB database.&nbsp; There have been multiple times where it would have been nice to review games without having to login to the db and look at the decipher the raw data.&nbsp; 
					</Paragraph>

					<Paragraph size="four" classNameToAdd="margin-top-1">
						Second, I wanted to improve my Angular familiarity by creating a "real-world" application.&nbsp;  What better way to do that than to do something useful at the same time?
					</Paragraph>
				</CSharpCardSection>

				<CSharpCardSection title="How It Works">
					<Paragraph size="four">
						The application works by utilizing local storage to cache games and deals for each player that a user searchs.&nbsp; Only new games and deals are downloaded on each subsequent query of a given player's username.&nbsp; 
					</Paragraph>
					<Paragraph size="four" classNameToAdd="margin-top-1">
						It should be noted that the current implementation would not scale nicely as a player with tens of thousands of deals would have to download most of those deals on every query, leading to an unacceptably-long delay.&nbsp; However, my main concern was getting the app working and making it extensible, if the future requires it to be extended (given that the most deals any user has is less than a thousand, these concerns are currently irrelevant).
					</Paragraph>
				</CSharpCardSection>

				<CSharpCardSection title="Approach">
					<Paragraph size="four">
						First I needed to figure out how to sync music to an Android device.
						It turns out that the main way to do that is through a protocol
						called the
						<EmbeddedLink href="https://en.wikipedia.org/wiki/Media_Transfer_Protocol">
							Media Transfer Protocol
						</EmbeddedLink>
						(MTP), which is part of the
						<EmbeddedLink href="https://en.wikipedia.org/wiki/Windows_Media_DRM">
							Windows Media DRM
						</EmbeddedLink>
						. Because of the
						<EmbeddedLink isLocal={true} href="/examples/downloader">
							downloader
						</EmbeddedLink>
						app I had recently started, I decided to use c# and WPF to create
						the playlist syncing app.
					</Paragraph>
					<Paragraph size="four" classNameToAdd="margin-top-1">
						Creating the application was fairly straight forward due to what I
						had already learned from the downloader after I had thoroughly
						understood the problem and had a firm grasp on how task factories
						work and async code in general.
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
						// {
						// itemSrc: demoVideo,
						// 	description: "Video Demonstration",
						// },
						{
							itemSrc: img1,
							description: "First impressions matter.",
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
];

interface ReplayViewerProps {}

const ReplayViewer: React.FC<ReplayViewerProps> = () => {
	return (
		<CSharpLayout
			href={WEBSITE_REPLAYS_URL}
			sections={sections}
			pageName="replay-viewer"
			sourceCodeLink="https://github.com/Beschuetzer/nxBridge"
			demoLink={WEBSITE_REPLAYS_URL}></CSharpLayout>
	);
};

export default ReplayViewer;
