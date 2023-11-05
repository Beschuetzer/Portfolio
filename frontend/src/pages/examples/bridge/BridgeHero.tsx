import React, { useEffect, useState, forwardRef } from "react";
import { useRef } from "react";
import bgVideo from "../../../clips/bridge/animation-roundEndDummy.mp4";
import {
	handleBridgeNavigation,
	showBridgeHero,
	toggleSecondInfoButtonClick,
} from "./utils";
import { clickedBridgeInfoButtonCountSelector, setClickedBridgeInfoButtonCount } from "../../../slices/bridgeSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { isMobileSelector } from "../../../slices/generalSlice";
import { loadedSoundsSelector } from "../../../slices/soundsSlice";
import { ANIMATION_DURATION, BRIDGE_HERO_CLASSNAME } from "../../../components/constants";
import { Video } from "../../../components/VideoPlayer/Video";
import { BridgeSectionHidingLogic } from "./BridgeSectionHidingLogic";

type BridgeHeroProps = {}

export const BridgeHero = forwardRef<HTMLDivElement, BridgeHeroProps> ((props, ref) => {
	//#region Init
	const clickedBridgeInfoButtonCount = useAppSelector(clickedBridgeInfoButtonCountSelector);
	const isMobile = useAppSelector(isMobileSelector);
	const [isVisible, setIsVisible] = useState(!isMobile);
	const dispatch = useAppDispatch();
	const sounds = useAppSelector(loadedSoundsSelector);
	const checkBoxRef = useRef<any>(null);
	const backgroundRef = useRef<any>(null);
	const hero = useRef<any>(null);
	const heroMore = useRef<any>(null);
	const displayNoneTimeoutRef = useRef<any>(null);
	const bridgeSectionHidingLogic = new BridgeSectionHidingLogic(clickedBridgeInfoButtonCount, 0, 0, isMobile);
	//#endregion

	//#region Functions/Handlers
	const onMoreClick = (e: MouseEvent) => {
		if (clickedBridgeInfoButtonCount % 2 === 0) {
			showBridgeHero(heroMore);
		  } else if (clickedBridgeInfoButtonCount > 0) {
			toggleSecondInfoButtonClick(hero.current, heroMore.current, isMobile);
		  }
		
		handleBridgeNavigation(
			checkBoxRef.current as any,
			backgroundRef.current,
			sounds as any,
			isMobile,
		  );
		  dispatch(setClickedBridgeInfoButtonCount(clickedBridgeInfoButtonCount + 1));
	};
	//#endregion

	//#region Side Fx
	useEffect(() => {
		clearInterval(displayNoneTimeoutRef.current);
		displayNoneTimeoutRef.current = setTimeout(() => {
			setIsVisible(bridgeSectionHidingLogic.isBridgeHeroVisible);
		}, ANIMATION_DURATION * 1.25)
	}, [bridgeSectionHidingLogic.isBridgeHeroVisible, clickedBridgeInfoButtonCount])
	//#endregion

	//#region JSX
	if (!isVisible) return null;
	return (
		<div ref={ref}>
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
					ref={backgroundRef}>
				</div>

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
		</div>
	);
	//#endregion
});