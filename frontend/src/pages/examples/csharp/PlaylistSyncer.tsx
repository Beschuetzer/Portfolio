import React from "react";
import Carousel from "../../../components/Carousel/Carousel";
import CSharpLayout from "./CSharpLayout";
import EmbeddedLink from "../../../components/EmbeddedLink";

import img1 from "../../../imgs/playlist-syncer/img1.png";
import imgProblem from "../../../imgs/playlist-syncer/img-problem.jpg";
import img2 from "../../../imgs/playlist-syncer/img2.png";
import img3 from "../../../imgs/playlist-syncer/img3.png";
import img4 from "../../../imgs/playlist-syncer/img4.png";

import img1Thumbnail from "../../../imgs/playlist-syncer/thumbnails/img1-thumbnail.png";
import imgProblemThumbnail from "../../../imgs/playlist-syncer/thumbnails/img-problem-thumbnail.jpg";
import img2Thumbnail from "../../../imgs/playlist-syncer/thumbnails/img2-thumbnail.png";
import img3Thumbnail from "../../../imgs/playlist-syncer/thumbnails/img3-thumbnail.png";
import img4Thumbnail from "../../../imgs/playlist-syncer/thumbnails/img4-thumbnail.png";




import demoVideo from "../../../clips/playlist-syncer/demo.mp4";
import CSharpCardSection from "./CSharpCardSection";
import { C_SHARP_CLASSNAME } from "./utils";
import Paragraph from "../../../typography/Paragraph";
import { closeCarouselItem, functionToGetContainer } from "../../../components/utils";
import { CSharpSection, GITHUB_URL, OS_10_ISSUE_TRACKER_URL, WIKIPEDIA_DRM_URL, WIKIPEDIA_MTP_URL } from "../../../components/constants";

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
						promptly updated.&nbsp; Unfortunately, the update<EmbeddedLink href={OS_10_ISSUE_TRACKER_URL}>broke my ability to sync music and playlists</EmbeddedLink>to my Galaxy S9+ phone.&nbsp;
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
						protocol called the<EmbeddedLink href={WIKIPEDIA_MTP_URL}>Media Transfer Protocol</EmbeddedLink>(MTP), which is part of the<EmbeddedLink href={WIKIPEDIA_DRM_URL}>Windows Media DRM</EmbeddedLink>. Because of the<EmbeddedLink isLocal={true} href="/examples/downloader">downloader</EmbeddedLink>app I had recently started, I decided to use c# and WPF to create
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
						{
							itemSrc: imgProblem,
							itemThumbnailSrc: imgProblemThumbnail,
							description: "156 songs transferred but an empty playlist...",
						},
						{
							itemSrc: demoVideo,
							description: "Video Demonstration",
							videoOverlayText: "Transferring Files in a Crisis",
							videoOverlayChildren: (
								<div>
									<CSharpCardSection title="How It Works">
										The playlist syncer has the ability to transfer songs to either an SD card or the phone's internal memory.  &nbsp; Files in the playlist that are not found in the destination are copied to '/destination/music'. &nbsp; After that .m3u playlist file is transferred to 'destination/music/playlists'.
									</CSharpCardSection>
								</div>
							)
						},
						{
							itemSrc: img1,
							itemThumbnailSrc: img1Thumbnail,
							description: "The complete user interface",
						},
						{
							itemSrc: img2,
							itemThumbnailSrc: img2Thumbnail,
							description: 	"Left-side of UI",
						},
						{
							itemSrc: img3,
							itemThumbnailSrc: img3Thumbnail,
							description: "Playlists available section of UI",
						},
						{
							itemSrc: img4,
							itemThumbnailSrc: img4Thumbnail,
							description: "Transfer section of UI after transfer",
						},
					]}
					numberOfItemsInCarouselAtOneTime="3"
					numberOfItemsToScrollOnClick="3"
					functionToGetContainer={functionToGetContainer}
					functionToRunOnClose={closeCarouselItem.bind(null, null as any, `#${sectionNames[1].toLowerCase()}`)}
				/>
			</section>
		]
	},

];

interface PlaylistSyncerProps {

}

const PlaylistSyncer: React.FC<PlaylistSyncerProps> = () => {
	return (
		<CSharpLayout
			sections={sections}
			pageName="playlist-syncer"
			sourceCodeLink={`${GITHUB_URL}/playlist-syncer`}>
		</CSharpLayout>
	);
};

export default PlaylistSyncer;

