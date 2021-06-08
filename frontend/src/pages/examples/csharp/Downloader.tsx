import React from "react";
import Carousel from "../../../components/Carousel/Carousel";
import CSharpLayout from "./CSharpLayout";

import EmbeddedLink from "../../../components/EmbeddedLink";
import img1 from "../../../imgs/downloader/img1.png";
import img2 from "../../../imgs/downloader/img2.png";
import img3 from "../../../imgs/downloader/img3.png";
import img4 from "../../../imgs/downloader/img4.png";
import img5 from "../../../imgs/downloader/img5.png";
import img6 from "../../../imgs/downloader/img6.png";
import problemVideo from "../../../clips/downloader/problem.mp4";
import demoVideo from "../../../clips/downloader/demo.mp4";
import CSharpCardSection from "./CSharpCardSection";
import { C_SHARP_LAYOUT_CSS_NAME as C_SHARP_CLASSNAME } from "./utils";
import { CAROUSEL_CLASSNAME } from "../../../components/Carousel/util";

const sections = [
	{
		name: "Description",
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="Purpose">
					Websites like
					<EmbeddedLink href="https://www.ocremix.org">
						OCRemix
					</EmbeddedLink>{" "}
					and{" "}
					<EmbeddedLink href="https://downloads.khinsider.com">
						Kingdom Hearts Insider
					</EmbeddedLink>
					offer mp3 files for downloading.&nbsp;&nbsp;It can be tedious
					downloading each file by hand, so I decided to create a c# app that
					takes in a Regular Expression and recursively downloads files that
					match the expression given.
				</CSharpCardSection>
				<CSharpCardSection title="How">
					The app finds any links that are on the url provided and recursively
					crawls any sub-links until it runs out of links. &nbsp;On each page,
					it looks for download links that match the Regular Expression and
					adds them to a download queue. &nbsp;It works best on sites like
					<EmbeddedLink href="https://downloads.khinsider.com">
						Kingdom Hearts Insider
					</EmbeddedLink>
					where each album page only has links to that specific album.
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: "Notes",
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="Multi-threading">
					Downloader uses three threads.&nbsp; One thread analyzes the html
					looking for sub-links and urls matching the Regular Expression. If
					it finds a link to download it adds it to the download queue, which
					is handled by the second thread.&nbsp; The last thread handles the
					GUI updates.
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

interface DownloaderProps {

}

const Downloader: React.FC<DownloaderProps> = () => {
	return (
		<CSharpLayout
			sections={sections}
			pageName="downloader"
			sourceCodeLink="https://github.com/Beschuetzer/Downloader">
			<section className={`${C_SHARP_CLASSNAME}__${CAROUSEL_CLASSNAME}`}>
				<Carousel
					items={[problemVideo, demoVideo, img1, img2, img3, img4, img5, img6]}
					alts={[
            "The manual way of downloading",
						"The automated way of downloading",
						"The User interface",
						"Options available",
						"Full-screen user interface when downloading",
						"Integrated file-renaming tool used to standardize file names of downloads",
						"A list of songs from ocremix.org. A pain to download manually...",
						"Songs downloaded from OCRemix.org (including sub-linked songs)",
					]}
					numberOfItemsInCarouselAtOneTime="3"
					numberOfItemsToScrollOnClick="3"
				/>
			</section>
		</CSharpLayout>
	);
};

export default Downloader;
