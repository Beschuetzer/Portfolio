import React from "react";
import Carousel from "../../../components/Carousel/Carousel";
import CSharpLayout from "./CSharpLayout";

import img1 from "../../../imgs/downloader/img1.png";

import img1Thumbnail from "../../../imgs/downloader/thumbnails/img1-thumbnail.png";

import CSharpCardSection from "./CSharpCardSection";
import { C_SHARP_CLASSNAME } from "./utils";
import { CAROUSEL_CLASSNAME } from "../../../components/Carousel/util";
import {
	closeCarouselItem,
	functionToGetContainer,
} from "../../../components/utils";
import {
	AMAJ_BRIDGE_URL,
	BRIDGE_DEMO_PAGE_NAME,
	CSharpSection,
} from "../../../components/constants";
import EmbeddedLink from "../../../components/EmbeddedLink";

const sectionNames = ["Instructions", "Video Instructions"];

const sections: CSharpSection[] = [
	{
		name: sectionNames[0],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="Pre-Requisites">
					<ol>
						<li>Two separate browsers (neither can be IE)</li>
						<li>
							Browsers must have a way to create independent sessions (e.g.
							"Private Browsing")
						</li>
					</ol>
				</CSharpCardSection>
				<CSharpCardSection title="Instructions">
					<ol>
						<li>Open both browsers</li>
						<li>
							Open one private browsing window for each browser (four windows
							total)
						</li>
						<li>
							Navigate to{" "}
							<EmbeddedLink
								isLocal={false}
								href={`${AMAJ_BRIDGE_URL}/login`}
								addSpaces={false}>
								here
							</EmbeddedLink>
							&nbsp;in each window
						</li>
						<li>
							In each window login using one of the four usernames below and the
							password (each window must login with a separate username
							otherwise game-play will be impossible due to security reasons):
							<ul className="padding-top-1 padding-bottom-1">
								<li>Username 1: 'Test'</li>
								<li>Username 2: 'TEST'</li>
								<li>Username 3: 'tesT'</li>
								<li>Username 4: 'test'</li>
								<li>Password: 'test'</li>
							</ul>
						</li>
						<li>
							Explore the site and try creating a lobby to start a game to see
							the actual gameplay
						</li>
						<li>See below section for videos explaining the above info</li>
					</ol>
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
						// {
						// 	itemSrc: problemVideo,
						// 	description: "The manual way of downloading",
						// 	videoOverlayText: "A Chore",
						// 	videoOverlayChildren: (
						// 		<div>
						// 			<CSharpCardSection title="The Problem"></CSharpCardSection>
						// 		</div>
						// 	),
						// },
						{
							itemSrc: img1,
							itemThumbnailSrc: img1Thumbnail,
							description: "The User interface",
						},
					]}
					numberOfItemsInCarouselWidthWise="3"
					numberOfItemsToScrollOnClick="3"
					functionToGetContainer={functionToGetContainer}
					functionToRunOnClose={closeCarouselItem.bind(
						null,
						null as any,
						`#${sectionNames[1].toLowerCase()}`,
					)}></Carousel>
			</section>,
		],
	},
];

interface BridgeDemoProps {}

const BridgeDemo: React.FC<BridgeDemoProps> = () => {
	return (
		<CSharpLayout sections={sections} pageName={BRIDGE_DEMO_PAGE_NAME}>
			{""}
		</CSharpLayout>
	);
};

export default BridgeDemo;
