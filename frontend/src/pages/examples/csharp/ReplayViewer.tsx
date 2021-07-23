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
import { fixZIndexIssue, functionToGetContainer } from "../../../components/utils";
import { CSharpSection } from "../../../components/constants";

const sectionNames = [
	'Description',
	'Media',
	'Notes'
]

const sections: CSharpSection[] = [
	{
		name: sectionNames[0],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="Purpose">
					<Paragraph size="four">
						Around the end of Febraury 2020, Samsung updated their Android OS
						to version 10.&nbsp; Eager to check out the newest Android OS, I
						promptly updated.&nbsp; Unfortunately, the update<EmbeddedLink href="https://issuetracker.google.com/issues/150054563">broke my ability to sync music and playlists</EmbeddedLink>to my Galaxy S9+ phone.&nbsp;
					</Paragraph>
					<Paragraph size="four" classNameToAdd="margin-top-1">
						Thinking it would get resolved in a prompt manner, I waited a few
						months.&nbsp; In the meantime, I looked into other ways of easily
						syncing music/playlists to my phone.&nbsp; After looking for over
						a month to no avail and realizing Google was in no hurry to fix
						the bug, I decided it would be an interesting programming exercise
						to create a simple application that could sync music and playlists
						to my phone.
					</Paragraph>
				</CSharpCardSection>

				<CSharpCardSection title="The Problem">
					<Paragraph size="four">
						It was clear from the experiences others were having that the
						problem stemmed from how Android 10 handled the playlist
						information with regards to the media database.&nbsp; After doing
						some more digging, I came across a workaround that involved simple
						filename path changes.&nbsp; After successfully trying this
						workaround out for myself, I began thinking about how to integrate
						it into the app I was planning on building.
					</Paragraph>
				</CSharpCardSection>

				<CSharpCardSection title="Approach">
					<Paragraph size="four">
						First I needed to figure out how to sync music to an Android
						device. It turns out that the main way to do that is through a
						protocol called the<EmbeddedLink href="https://en.wikipedia.org/wiki/Media_Transfer_Protocol">Media Transfer Protocol</EmbeddedLink>(MTP), which is part of the<EmbeddedLink href="https://en.wikipedia.org/wiki/Windows_Media_DRM">Windows Media DRM</EmbeddedLink>. Because of the<EmbeddedLink isLocal={true} href="/examples/downloader">downloader</EmbeddedLink>app I had recently started, I decided to use c# and WPF to create
						the playlist syncing app.
					</Paragraph>
					<Paragraph size="four" classNameToAdd="margin-top-1">
						Creating the application was fairly straight forward due to what I had already learned from the downloader after I had thoroughly understood the problem and had a firm grasp on how task factories work and async code in general.
					</Paragraph>
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		styles: {
			position: 'relative',
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
							description: 	"Overall Layout",
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
					functionToRunOnClose={fixZIndexIssue.bind(null, null as any, `#${sectionNames[1].toLowerCase()}`)}
				/>
			</section>
		]
	},
	// {
	// 	name: sectionNames[2],
	// 	pageName: C_SHARP_CLASSNAME,
	// 	children: [
	// 		<React.Fragment>
	// 			<CSharpCardSection title="MTP">
	// 				In order to facilitate the 
	// 			</CSharpCardSection>
	// 			<CSharpCardSection title="ANother thing?">
	// 				What to write here?
	// 				<EmbeddedLink isLocal={true} href="/examples/playlist-syncer">
	// 					another problem
	// 				</EmbeddedLink>
	// 				I was facing at the time.
	// 			</CSharpCardSection>
	// 		</React.Fragment>,
	// 	],
	// },
];

interface ReplayViewerProps {

}

const ReplayViewer: React.FC<ReplayViewerProps> = () => {
	return (
		<CSharpLayout
			href="http://amajreplays.herokuapp.com"
			sections={sections}
			pageName="replay-viewer"
			sourceCodeLink="https://github.com/Beschuetzer/nxBridge"
			demoLink="https://amajreplays.herokuapp.com">
		</CSharpLayout>
	);
};

export default ReplayViewer;

