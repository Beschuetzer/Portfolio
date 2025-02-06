import React, { useMemo, useRef } from "react";
import { useEffect } from "react";
import {
	DISPLAY_NONE_CLASSNAME,
	LIVE_BRIDGE_URL,
	GITHUB_URL,
	BRIDGE_PAGE_NAME,
	BRIDGE_DEMO_URL,
	BRIDGE_HERO_CLASSNAME,
	BRIDGE_HERO_CLICKED_CLASSNAME,
	BRIDGE_HERO_MORE__CLICKED_CLASSNAME,
} from "../../../components/constants";
import { BridgeHero } from "./BridgeHero";
import { SourceCodeLink } from "../../../components/SourceCodeLink";
import { BridgeArrowButton } from "./BridgeArrowButton";
import { setHasClickedALink, setClickedBridgeInfoButtonCount, setCurrentBridgeSection } from "../../../slices/bridgeSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { isMobileSelector } from "../../../slices/generalSlice";
import { setLinearGradientCssCustomProp, resetBridgeHero } from "./utils";
import { BridgeSectionContainer } from "./BridgeSectionContainer";

interface BridgeProps {
}

export const Bridge: React.FC<BridgeProps> = () => {
	const bridgeHeroRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const isMobile = useAppSelector(isMobileSelector);
	const hero = useMemo(() => bridgeHeroRef.current?.querySelector(`.${BRIDGE_HERO_CLASSNAME}`), []);
	const heroMore = useMemo(() => bridgeHeroRef.current?.querySelector(
		`.${BRIDGE_HERO_CLASSNAME}__more`,
	), []);

	useEffect(() => {
		setLinearGradientCssCustomProp();
		dispatch(setHasClickedALink(false));
	}, [dispatch]);

	useEffect(() => {
		resetBridgeHero(bridgeHeroRef);
		dispatch(setClickedBridgeInfoButtonCount(0));
		dispatch(setCurrentBridgeSection(0));

		return () => {
			dispatch(setClickedBridgeInfoButtonCount(0));
			dispatch(setCurrentBridgeSection(0));
		};
	}, [dispatch]);

	//adding scroll listener
	useEffect(() => {
		const handleScroll = (e: React.UIEvent<HTMLElement>) => {
			if (isMobile)
				hero?.classList.remove(DISPLAY_NONE_CLASSNAME);
			if (window.scrollY >= window.innerHeight / 2) {
				document
					.querySelector(".arrow-button--right")
					?.classList.remove(DISPLAY_NONE_CLASSNAME);
			}
			if (window.scrollY >= window.innerHeight) {
				if (!isMobile) {
					
					if (hero) {
						hero.classList.add(DISPLAY_NONE_CLASSNAME);
						hero.classList.remove(BRIDGE_HERO_CLICKED_CLASSNAME);
					}
					heroMore?.classList.remove(BRIDGE_HERO_MORE__CLICKED_CLASSNAME);
					dispatch(setClickedBridgeInfoButtonCount(2));
				}
			}
		};

		window.addEventListener("scroll", handleScroll as any);

		return () => {
			window.removeEventListener("scroll", handleScroll as any);
		};
	}, [isMobile, dispatch, hero, heroMore?.classList]);


	function renderSourceLinks() {
		const codeSourceLink = (
			<SourceCodeLink href={`${GITHUB_URL}/${BRIDGE_PAGE_NAME}`} />
		);

		const demoSourceLink = (
			<SourceCodeLink
				className="source-link__demo"
				href={BRIDGE_DEMO_URL}
				msg={"Demo"}
			/>
		);

		const liveSourceLink = (
			<SourceCodeLink
				className="source-link__live"
				href={LIVE_BRIDGE_URL}
				msg={"Live Site"}
			/>
		);

		if (isMobile)
			return (
				<div className="source-link__container">
					{codeSourceLink}
					{liveSourceLink}
					{demoSourceLink}
				</div>
			);

		return (
			<React.Fragment>
				{codeSourceLink}
				{liveSourceLink}
				{demoSourceLink}
			</React.Fragment>
		);
	}

	return (
		<div className={BRIDGE_PAGE_NAME}>
			<BridgeHero ref={bridgeHeroRef}/>
			{renderSourceLinks()}
			<BridgeSectionContainer/>
			<BridgeArrowButton direction="left" />
			<BridgeArrowButton direction="right" />
		</div>
	);
};