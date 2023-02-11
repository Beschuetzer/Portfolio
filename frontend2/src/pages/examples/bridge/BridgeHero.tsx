import React from "react";
import { useRef } from "react";
import { Video } from "../../../components/VideoPlayer";
import bgVideo from "../../../clips/bridge/animation-roundEndDummy.mp4";
import {
	handleBridgeHeroSounds,
	showBridgeHero,
	toggleSecondInfoButtonClick,
} from "./utils";
import { clickedBridgeInfoButtonCountSelector, setClickedBridgeInfoButtonCount } from "../../../slices/bridgeSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { isMobileSelector } from "../../../slices/generalSlice";
import { loadedSoundsSelector } from "../../../slices/soundsSlice";
import { BRIDGE_HERO_CLASSNAME, HEADER_ID } from "../../../components/constants";

type BridgeHeroProps = {}

export const BridgeHero: React.FC<BridgeHeroProps> = () => {
	const dispatch = useAppDispatch();
	const sounds = useAppSelector(loadedSoundsSelector);
	const isMobile = useAppSelector(isMobileSelector);
	const clickedBridgeInfoButtonCount = useAppSelector(clickedBridgeInfoButtonCountSelector);
	const checkBoxRef = useRef<any>(null);
	const backgroundRef = useRef<any>(null);
	const hero = useRef<any>(null);
	const heroMore = useRef<any>(null);
	const headerHeight = document
		.querySelector(HEADER_ID)!
		.getBoundingClientRect().height;

	const onMoreClick = (e: MouseEvent) => {
		if (clickedBridgeInfoButtonCount % 2 === 0) {
			showBridgeHero(heroMore);
		  } else if (clickedBridgeInfoButtonCount > 0) {
			toggleSecondInfoButtonClick(hero.current, heroMore.current, isMobile);
		  }
		
		handleBridgeHeroSounds(
			checkBoxRef.current as any,
			backgroundRef.current,
			sounds as any,
			isMobile,
			headerHeight,
		  );
		  dispatch(setClickedBridgeInfoButtonCount(clickedBridgeInfoButtonCount + 1));
	};

	return (
		<React.Fragment>
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