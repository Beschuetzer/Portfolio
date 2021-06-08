import React from "react";
import { useRef } from "react";
import { connect, RootStateOrAny } from "react-redux";

import { setClickedBridgeInfoButtonCount } from "../../../actions";

import Video from "../../../components/VideoPlayer/Video";
import bgVideo from "../../../clips/bridge/animation-roundEndDummy.mp4";
import {
	BRIDGE_HERO_CLASSNAME,
	handleMoreClick,
} from "./utils";
import { HEADER_ID } from "../../../components/navbar/SiteNav/utils";

interface BridgeHeroProps {
	sounds: { play: (sound: string) => void };
	isMobile: boolean;
	setClickedBridgeInfoButtonCount: (value: number) => void;
	clickedBridgeInfoButtonCount: number;
}

const BridgeHero: React.FC<BridgeHeroProps> = ({
	sounds,
	isMobile,
	setClickedBridgeInfoButtonCount,
	clickedBridgeInfoButtonCount,
}) => {
	const checkBoxRef = useRef<any>(null);
	const backgroundRef = useRef<any>(null);
	const hero = useRef<any>(null);
	const heroMore = useRef<any>(null);
	const headerHeight = document
		.querySelector(HEADER_ID)!
		.getBoundingClientRect().height;

	const onMoreClick = (e: MouseEvent) => {
		handleMoreClick(
			clickedBridgeInfoButtonCount,
			headerHeight,
			isMobile,
			heroMore,
			hero,
			checkBoxRef,
			backgroundRef,
			sounds,
			setClickedBridgeInfoButtonCount,
		);
	};

	return (
		<React.Fragment>
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link
				href="https://fonts.googleapis.com/css2?family=New+Tegomin&display=swap"
				rel="stylesheet"
			/>

			<input
				ref={checkBoxRef}
				id={`${BRIDGE_HERO_CLASSNAME}__more-checkbox`}
				type="checkbox"></input>
			<div className="hero" ref={hero}>
				<div
					onClick={(e: any) => onMoreClick(e)}
					className={`${BRIDGE_HERO_CLASSNAME}__more`}
					ref={heroMore}>
					<label htmlFor={`${BRIDGE_HERO_CLASSNAME}__more-checkbox`}>
						<svg className={`${BRIDGE_HERO_CLASSNAME}__svg1`}>
							<use xlinkHref="/sprite.svg#icon-help"></use>
						</svg>
						<svg className={`${BRIDGE_HERO_CLASSNAME}__svg2`}>
							<use xlinkHref="/sprite.svg#icon-arrow-with-circle-down"></use>
						</svg>
					</label>
					<div className={`${BRIDGE_HERO_CLASSNAME}__bridge-logo`}></div>
				</div>
				<div
					className={`${BRIDGE_HERO_CLASSNAME}__background`}
					ref={backgroundRef}></div>

				<Video src={bgVideo} type="mp4" className="bg-video" />
				<span className={`${BRIDGE_HERO_CLASSNAME}__heading heading--one`}>
					Making
				</span>
				<span className={`${BRIDGE_HERO_CLASSNAME}__heading heading--one`}>
					A#
				</span>
				<span className={`${BRIDGE_HERO_CLASSNAME}__heading heading--one`}>
					Maj
				</span>
				<span className={`${BRIDGE_HERO_CLASSNAME}__heading heading--one`}>
					Bridge
				</span>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		sounds: state.sounds,
		isMobile: state.general.isMobile,
		clickedBridgeInfoButtonCount: state.bridge.clickedBridgeInfoButtonCount,
	};
};

export default connect(mapStateToProps, {
	setClickedBridgeInfoButtonCount,
})(BridgeHero);
