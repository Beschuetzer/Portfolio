import React from "react";
import { Carousel } from "../../../components/Carousel/Carousel";

import { CSharpLayout } from "./CSharpLayout";

import video1 from "../../../clips/bridge-demo/1.mp4";
import video2 from "../../../clips/bridge-demo/2.mp4";
import video3 from "../../../clips/bridge-demo/3.mp4";

import { C_SHARP_CLASSNAME } from "./utils";
import {
	LIVE_BRIDGE_URL,
	BRIDGE_DEMO_PAGE_NAME,
	CAROUSEL_CLASSNAME,
} from "../../../components/constants";
import { EmbeddedLink } from "../../../components/EmbeddedLink";
import { CSharpCardSection } from "./CSharpCardSection";
import { CSharpSection } from "../../../types";
import { functionToGetContainer, closeCarouselItem } from "../../../helpers";

const sectionNames = [
	"Requirements",
	"Written Instructions",
	"Video Instructions",
];

const sections: CSharpSection[] = [
	{
		name: sectionNames[0],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection>
					<p>
						Since there is no AI currently implemented, runing a demo of A#Maj Bridge requires one to open two different browsers with two tabs in each browser (one of which has to be a "Private Browsing" tab or "Incognito" tab).  
					</p>
					<ol>
						<li>Two separate browsers (neither can be IE)</li>
						<li>
							Browsers must have a way to create independent sessions (e.g.
							"Private Window" in Firefox and "Incognito Mode" in Crome)
						</li>
					</ol>
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[1],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection>
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
								href={`${LIVE_BRIDGE_URL}/login`}
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
		hasCarousel: false,
		name: sectionNames[2],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<section className={`${C_SHARP_CLASSNAME}__${CAROUSEL_CLASSNAME}`}>
				<Carousel
					items={[
						{
							itemSrc: video1,
							description: "Setting Up",
							videoOverlayText: "Four Windows At Once",
							videoOverlayChildren: (
								<div>
									<CSharpCardSection>
										This video show you how to open Chrome and Firefox and create private session windows
									</CSharpCardSection>
								</div>
							),
						},
						{
							itemSrc: video2,
							description: "Logging In",
							videoOverlayText: "Test is the Password ",
							videoOverlayChildren: (
								<div>
									<CSharpCardSection>
										Notice how each window uses a separate username but the password is the same.
									</CSharpCardSection>
								</div>
							),
						},
						{
							itemSrc: video3,
							description: "Starting a Game",
							videoOverlayText: "Starting",
							videoOverlayChildren: (
								<div>
									<CSharpCardSection title="Create a Lobby">
										After logging in, create a lobby by entering a name an clicking 'Go'.
									</CSharpCardSection>
									<CSharpCardSection title="Join the Lobby">
									    Clicking 'Go' with a lobby name that is open will join that lobby.
									</CSharpCardSection>
								</div>
							),
						},
					]}
					numberOfItemsInCarouselWidthWise="3"
					numberOfItemsToScrollOnClick="3"
					functionToGetContainer={functionToGetContainer}
					functionToRunOnClose={closeCarouselItem.bind(
						null,
						null as any,
						`#${sectionNames[2].toLowerCase()}`,
					)}
				/>
			</section>,
		],
	},
];

interface BridgeDemoProps {}

export const BridgeDemo: React.FC<BridgeDemoProps> = () => {
	return (
		<CSharpLayout sections={sections} pageName={BRIDGE_DEMO_PAGE_NAME}/>
	);
};