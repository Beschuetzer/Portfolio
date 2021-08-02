import React from "react";
import Carousel from "../../../components/Carousel/Carousel";
import CSharpLayout from "./CSharpLayout";

import video1 from "../../../clips/bridge-demo/1.mp4";
import video2 from "../../../clips/bridge-demo/2.mp4";
import video3 from "../../../clips/bridge-demo/3.mp4";

import CSharpCardSection from "./CSharpCardSection";
import { C_SHARP_CLASSNAME } from "./utils";
import { CAROUSEL_CLASSNAME } from "../../../components/Carousel/util";
import {
	closeCarouselItem,
	functionToGetContainer,
} from "../../../components/utils";
import {
	LIVE_BRIDGE_URL,
	BRIDGE_DEMO_PAGE_NAME,
	CSharpSection,
} from "../../../components/constants";
import EmbeddedLink from "../../../components/EmbeddedLink";

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
				<CSharpCardSection title="">
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
				<CSharpCardSection title="">
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
		styles: {
			position: "relative",
		},
		name: sectionNames[2],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<section className={`${C_SHARP_CLASSNAME}__${CAROUSEL_CLASSNAME}`}>
				<Carousel
					items={[
						{
							itemSrc: video1,
							description: "Setting Up",
							videoOverlayText: "",
							videoOverlayChildren: (
								<div>
									<CSharpCardSection title="Four Windows At Once">
										This video show you how to open Chrome and Firefox and create private session windows
									</CSharpCardSection>
								</div>
							),
						},
						{
							itemSrc: video2,
							description: "Logging In",
							videoOverlayText: "",
							videoOverlayChildren: (
								<div>
									<CSharpCardSection title="Separate Usernames but Equal Passwords">
										Notice how each window uses a separate username but the password is the same.
									</CSharpCardSection>
								</div>
							),
						},
						{
							itemSrc: video3,
							description: "Starting a Game",
							videoOverlayText: "",
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
