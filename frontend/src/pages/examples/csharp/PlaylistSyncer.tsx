import React from "react";
import Carousel from "../../../components/Carousel/Carousel";
import CSharpLayout from "./CSharpLayout";
import EmbeddedLink from "../../../components/EmbeddedLink";

import img1 from "../../../imgs/playlist-syncer/img1.png";
import imgProblem from "../../../imgs/playlist-syncer/img-problem.jpg";
import img2 from "../../../imgs/playlist-syncer/img2.png";
import img3 from "../../../imgs/playlist-syncer/img3.png";
import img4 from "../../../imgs/playlist-syncer/img4.png";
import img5 from "../../../imgs/playlist-syncer/img5.png";
import demoVideo from "../../../clips/playlist-syncer/demo.mp4";
import CSharpCardSection from "./CSharpCardSection";
import { C_SHARP_LAYOUT_CSS_NAME } from "./utils";
import Paragraph from "../../../typography/Paragraph";

const sections = [
	{
		name: "Description",
		pageName: C_SHARP_LAYOUT_CSS_NAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="Purpose">
					<Paragraph size="four">
						Around the end of Febraury 2020, Samsung updated their Android OS
						to version 10.&nbsp; Eager to check out the newest Android OS, I
						promptly updated.&nbsp; Unfortunately, the update
						<EmbeddedLink href="https://issuetracker.google.com/issues/150054563">
							broke my ability to sync music and playlists
						</EmbeddedLink>{" "}
						to my Galaxy S9+ phone.&nbsp;
					</Paragraph>
					<Paragraph size="four">
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

				<CSharpCardSection title="How">
					<Paragraph size="four">
						First I needed to figure out how to sync music to an Android
						device. It turns out that the main way to do that is through a
						protocol called the{" "}
						<EmbeddedLink href="https://en.wikipedia.org/wiki/Media_Transfer_Protocol">
							Media Transfer Protocol
						</EmbeddedLink>{" "}
						(MTP), which is part of the{" "}
						<EmbeddedLink href="https://en.wikipedia.org/wiki/Windows_Media_DRM">
							Windows Media DRM
						</EmbeddedLink>
						. Because of the{" "}
						<EmbeddedLink isLocal={true} href="/examples/downloader">
							downloader
						</EmbeddedLink>{" "}
						app I had recently started, I decided to use c# and WPF to create
						the playlist syncing app.
					</Paragraph>
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: "Notes",
		pageName: C_SHARP_LAYOUT_CSS_NAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="Multi-threading">
					PlaylistSyncer uses three threads.&nbsp; One thread analyzes the
					html looking for sub-links and urls matching the Regular Expression.
					If it finds a link to download it adds it to the download queue,
					which is handled by the second thread.&nbsp; The last thread handles
					the GUI updates.
				</CSharpCardSection>
				<CSharpCardSection title="Challenging Concept">
					At this point in time (March-April 2020), I had never written an
					app/script that used multiple threads.&nbsp; It took a few days to
					firmly grasp the concept, but once I had it, I was able to do
					everything I wanted to do, namely analyze html, download files, and
					update the GUI all at the same time. I took this understanding and
					applied it to
					<EmbeddedLink isLocal={true} href="/examples/playlist-syncer">
						another problem
					</EmbeddedLink>
					I was facing at the time.
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
];

interface PlaylistSyncerProps {

}

const PlaylistSyncer: React.FC<PlaylistSyncerProps> = () => {
	return (
		<CSharpLayout
			sections={sections}
			pageName="playlist-syncer"
			sourceCodeLink="https://github.com/Beschuetzer/Playlist-syncer">
			<section className="csharp__carousel">
				<Carousel
					items={[imgProblem, demoVideo, img1, img2, img3, img4, img5]}
					alts={[
						"156 songs transferred but an empty playlist...",
						"Video Demonstration",
						"The complete user interface",
						"Left-side of UI",
						"Playlists available section of UI",
						"Transfer section of UI after transfer",
						"Transfer section of UI during transfer",
					]}
					numberOfItemsInCarouselAtOneTime="3"
					numberOfItemsToScrollOnClick="3"
				/>
			</section>
		</CSharpLayout>
	);
};

export default PlaylistSyncer;
