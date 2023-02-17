import React from "react";
import { Carousel } from "../../../components/Carousel/Carousel";
import { CSharpLayout } from "./CSharpLayout";

import { EmbeddedLink } from "../../../components/EmbeddedLink";
import img1 from "../../../imgs/downloader/img1.png";
import img2 from "../../../imgs/downloader/img2.png";
import img3 from "../../../imgs/downloader/img3.png";
import img4 from "../../../imgs/downloader/img4.png";
import img5 from "../../../imgs/downloader/img5.png";
import img6 from "../../../imgs/downloader/img6.png";
import problemVideo from "../../../clips/downloader/problem.mp4";
import demoVideo from "../../../clips/downloader/demo.mp4";

import img1Thumbnail from "../../../imgs/downloader/thumbnails/img1-thumbnail.png";
import img2Thumbnail from "../../../imgs/downloader/thumbnails/img2-thumbnail.png";
import img3Thumbnail from "../../../imgs/downloader/thumbnails/img3-thumbnail.png";
import img4Thumbnail from "../../../imgs/downloader/thumbnails/img4-thumbnail.png";
import img5Thumbnail from "../../../imgs/downloader/thumbnails/img5-thumbnail.png";
import img6Thumbnail from "../../../imgs/downloader/thumbnails/img6-thumbnail.png";

import { CSharpCardSection } from "./CSharpCardSection";
import { C_SHARP_CLASSNAME } from "./utils";
import {
	CAROUSEL_CLASSNAME,
	DOWNLOADER_PAGE_NAME,
	GITHUB_URL,
	KH_INSIDER_URL,
	OC_REMIX_URL,
	PLAYLIST_SYNCER_URL,
} from "../../../components/constants";
import { Quote } from "../../../components/Quote";
import { CSharpSection } from "../../../types";
import { closeCarouselItem, functionToGetContainer } from "../../../helpers";

const sectionNames = ["Description", "Media", "Notes"];

const sections: CSharpSection[] = [
	{
		name: sectionNames[0],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<Quote author="Peter Drucker" className="padding-top-1">
					Efficiency is doing better what is already being done.
				</Quote>
				<CSharpCardSection title="Why">
					Websites like
					<EmbeddedLink href={OC_REMIX_URL}>OCRemix</EmbeddedLink> and
					<EmbeddedLink href={KH_INSIDER_URL}>
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
					it looks for download links that match the Regular Expression and adds
					them to a download queue. &nbsp;It works best on sites like
					<EmbeddedLink href={KH_INSIDER_URL}>
						Kingdom Hearts Insider
					</EmbeddedLink>
					where each album page only has links to that specific album.
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
			<section className={`${C_SHARP_CLASSNAME}__${CAROUSEL_CLASSNAME}`}>
				<Carousel
					items={[
						{
							itemSrc: problemVideo,
							description: "The manual way of downloading",
							videoOverlayText: "A Chore",
							videoOverlayChildren: (
								<div>
									<CSharpCardSection title="The Problem">
										Downloading new releases from{" "}
										<EmbeddedLink isLocal={false} href={OC_REMIX_URL}>
											ocremix.org
										</EmbeddedLink>{" "}
										is exciting, but having to download a few months worth is
										more of a chore.&nbsp;
									</CSharpCardSection>
									<CSharpCardSection title="Reality Check">
										This is what it takes to download one song.
									</CSharpCardSection>
								</div>
							),
						},
						{
							itemSrc: demoVideo,
							description: "The automated way of downloading",
							videoOverlayText: "Automation FTW",
							videoOverlayChildren: (
								<div>
									<CSharpCardSection title="Embedded Links">
										The downloader app not only downloads links it finds
										matching the given criteria, but will do the same for any
										embedded links it finds.
									</CSharpCardSection>
									<CSharpCardSection title="Buggy but functional">
										The download logs aren't always correct, but there's no
										denying the result.
									</CSharpCardSection>
								</div>
							),
						},
						{
							itemSrc: img1,
							itemThumbnailSrc: img1Thumbnail,
							description: "The User interface",
						},
						{
							itemSrc: img2,
							itemThumbnailSrc: img2Thumbnail,
							description: "Options available",
						},
						{
							itemSrc: img3,
							itemThumbnailSrc: img3Thumbnail,
							description: "Full-screen user interface when downloading",
						},
						{
							itemSrc: img4,
							itemThumbnailSrc: img4Thumbnail,
							description: "Integrated file-renaming tool",
						},
						{
							itemSrc: img5,
							itemThumbnailSrc: img5Thumbnail,
							description:
								"A list of songs from ocremix.org. A pain to download manually...",
						},
						{
							itemSrc: img6,
							itemThumbnailSrc: img6Thumbnail,
							description: "Result of using Downloader",
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
			</section>,
		],
	},
	{
		name: sectionNames[2],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="Multi-threading">
					Downloader uses three threads.&nbsp; One thread analyzes the html
					looking for sub-links and urls matching the Regular Expression. If it
					finds a link to download it adds it to the download queue, which is
					handled by the second thread.&nbsp; The last thread handles the GUI
					updates.
				</CSharpCardSection>
				<CSharpCardSection title="A Challenging Concept">
					At this point in time (March-April 2020), I had never written an
					app/script that used multiple threads.&nbsp; It took a few days to
					firmly grasp the concept, but once I had it, I was able to do
					everything I wanted to do, namely analyze html, download files, and
					update the GUI all at the same time. I took this understanding and
					applied it to
					<EmbeddedLink isLocal={true} href={PLAYLIST_SYNCER_URL}>
						another problem
					</EmbeddedLink>
					I was facing at the time.
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
];

interface DownloaderProps {}

export const Downloader: React.FC<DownloaderProps> = () => {
	return (
		<CSharpLayout
			sections={sections}
			pageName={DOWNLOADER_PAGE_NAME}
			sourceCodeLink={`${GITHUB_URL}/${DOWNLOADER_PAGE_NAME}`}
		/>
	);
};