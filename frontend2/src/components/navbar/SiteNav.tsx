import React from "react";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { NavListItem } from "./NavListItem";

import aboutImage from "../../imgs/site-nav/about.jpg";
import autoBidImage from "../../imgs/site-nav/autobid.jpg";
import bridgeImage from "../../imgs/site-nav/bridge.jpg";
import contactImage from "../../imgs/site-nav/contact.jpg";
import downloaderImage from "../../imgs/site-nav/downloader.jpg";
import examplesImage from "../../imgs/site-nav/examples.jpg";
import resumeImage from "../../imgs/site-nav/resume.jpg";
import syncerImage from "../../imgs/site-nav/syncer.jpg";
import replayImage from "../../imgs/site-nav/replay.jpg";

import {
	NAVBAR_ACTIVE_CLASSNAME,
	NAVBAR_CLASSNAME,
	NAVBAR_DEFAULT_CLASSNAME,
	NAVBAR_DONE_CLASSNAME,
	NAVBAR_IS_ANIMATING_CLASSNAME,
	setHeaderHeightCSSPropertyValue,
} from "./utils";
import {
	ABOUT_PAGE_NAME,
	ABOUT_URL,
	AUTO_BID_PAGE_NAME,
	AUTO_BID_URL,
	BRIDGE_PAGE_NAME,
	BRIDGE_URL,
	DOWNLOADER_PAGE_NAME,
	DOWNLOADER_URL,
	EMAIL,
	PLAYLIST_SYNCER_URL,
	REPLAY_VIEWER_URL,
	RESUME_PAGE_NAME,
	RESUME_URL,
	OVERFLOW_HIDDEN_CLASSNAME,
	ANIMATION_DURATION,
	UNCLICKABLE_CLASSNAME,
	Z_INDEX_HIGHEST_CLASSNAME,
	HEADER_ID,
	SITE_NAV_CLASSNAME,
	SITE_NAV_MINIMAL_CLASSNAME,
	SITE_NAV_CLOSE_DELAY,
	PERSONALITY_URL,
} from "../constants";
import { useLocation } from "react-router-dom";
import { currentlyViewingImageSelector, isSiteNavMinimizedSelector, setHeaderHeight } from "../../slices/generalSlice";
import { capitalize } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useHandleChangePage } from "../../hooks/useHandleChangePage";
import { Match } from "../../types";
import { NavListItemExpandedDirections } from "./NavListItemExpanded";
import { ABOUT_SECTION_NAMES, RESUME_SECTION_TITLES } from "../../pages";

interface SiteNavProps {
	match: Match
}

export const SiteNav: React.FC<SiteNavProps> = ({
	match,
}) => {
	const isSiteNavMinimized = useAppSelector(isSiteNavMinimizedSelector);
	const currentlyViewingImage = useAppSelector(currentlyViewingImageSelector);
	const dispatch = useAppDispatch();
	const SET_INITIAL_HEADER_HEIGHT_DELAY = 100;
	const location = useLocation();
	const navRef = useRef<HTMLElement>(null);
	const toggleTransitioningTimeoutIdRef = useRef<any>(null);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const header = document.querySelector(`${HEADER_ID}`) as HTMLElement;
	
	if (currentlyViewingImage) {
		header?.classList.remove(Z_INDEX_HIGHEST_CLASSNAME);
	} else {
		header?.classList.add(Z_INDEX_HIGHEST_CLASSNAME);
	}

	//#region Functions/Handlers
	const onBodyClick = (e: Event) => {
		const isNavClick = (e.target as any)?.classList?.contains(
			NAVBAR_ACTIVE_CLASSNAME,
		)
			? true
			: false;
		if (!isNavClick) {
			navRef?.current?.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
		}
	};

	const onNavClick = (e: MouseEvent) => {
		e && e.stopPropagation();
		toggleState();
	};

	const onNavItemClick = (e: MouseEvent) => {
		e && e.stopPropagation();
		const target = e.target as HTMLElement;

		//do nothing if it is a nav group
		if (target.children?.length > 0) {
			return;
		}

		//need timeout to ensure page has loaded first (may need to increase if overflow hidden glitch still occurs)
		setTimeout(() => {
			onNavClick(e);
		}, SITE_NAV_CLOSE_DELAY)
	};

	const onMouseEnter = (e: MouseEvent) => {
		e.stopPropagation();
		if (
			!navRef.current ||
			!navRef.current?.classList.contains(NAVBAR_ACTIVE_CLASSNAME) ||
			navRef.current.classList.contains(NAVBAR_IS_ANIMATING_CLASSNAME)
		) {
			navRef.current?.classList.add(OVERFLOW_HIDDEN_CLASSNAME);
			return;
		} else if (navRef.current.classList.contains(NAVBAR_DONE_CLASSNAME)) {
			navRef.current?.classList.remove(OVERFLOW_HIDDEN_CLASSNAME);
		}
	};

	function toggleState() {
		setIsOpen((currentValue) => !currentValue);
		setIsTransitioning(true);

		if (toggleTransitioningTimeoutIdRef.current) clearTimeout(toggleTransitioningTimeoutIdRef.current);
		toggleTransitioningTimeoutIdRef.current = setTimeout(() => {
			setIsTransitioning(false);
		}, ANIMATION_DURATION + 50)
	}
	//#endregion

	//#region Side FXs
	useHandleChangePage(match);
	useEffect(() => {
		//need timeout to wait for PageNav to render
		setTimeout(() => {
			setHeaderHeightCSSPropertyValue();
		}, 1);
	});

	useEffect(() => {
		function handleKeypress(e: KeyboardEvent) {
			switch (e.key) {
				case "o":
					toggleState();
					break;
				default:
					break;
			}
		}

		setTimeout(() => {
			const headerHeight = (
				document.querySelector(HEADER_ID) as HTMLElement
			).getBoundingClientRect().height;
			dispatch(setHeaderHeight(headerHeight));
		}, SET_INITIAL_HEADER_HEIGHT_DELAY);

		window.addEventListener("keydown", handleKeypress);
		document.body.addEventListener("click", onBodyClick);

		return () => {
			window.removeEventListener("keydown", handleKeypress);
			document.body.removeEventListener("click", onBodyClick);
		};
	}, [setHeaderHeight, location]);

	useEffect(() => {
		if (navRef.current) {
			const siteNav = document.querySelector(`.${SITE_NAV_CLASSNAME}`) as HTMLDivElement;
			if (!siteNav) return;
			siteNav.classList.toggle(SITE_NAV_MINIMAL_CLASSNAME);
		}
	}, [isSiteNavMinimized, navRef])
	//#endregion

	//#region JSX
	const dynamicClassnames = isOpen
		? `
			${NAVBAR_ACTIVE_CLASSNAME} 
			${NAVBAR_DONE_CLASSNAME} 
			${isTransitioning ? OVERFLOW_HIDDEN_CLASSNAME : ''}
			${isTransitioning ? UNCLICKABLE_CLASSNAME : ''}
		  `
		: `
			${isTransitioning ? NAVBAR_DONE_CLASSNAME : ''} 
			${OVERFLOW_HIDDEN_CLASSNAME}
			${isTransitioning ? NAVBAR_IS_ANIMATING_CLASSNAME : ''}
		` ;
	return ReactDOM.createPortal(
		<div
			ref={navRef as any}
			className={`${NAVBAR_DEFAULT_CLASSNAME} ${dynamicClassnames}`}
			onClick={(e: any) => onNavClick(e)}>
			<button
				aria-label="show pages"
				className={`${NAVBAR_CLASSNAME}__button`}>
				<div aria-hidden="true" className={`${NAVBAR_CLASSNAME}__menu`}>
					<div className={`${NAVBAR_CLASSNAME}__menu-bar`}></div>
				</div>
			</button>
			<section aria-label="pages" className={`${NAVBAR_CLASSNAME}__content`}>
				<ul className={`${NAVBAR_CLASSNAME}__list`}>
					<NavListItem
						expandedItemOptions={{
							items: [
								...RESUME_SECTION_TITLES.map((name) => {
									const nameToUse = name.replace('-', ' ');
									//todo: add images here
									return {
										to: `${RESUME_URL}#${nameToUse?.toLowerCase()}`,
										label: capitalize(nameToUse),
										onMouseEnter: onMouseEnter,
										onClick: onNavItemClick,
									}
								})
							]
						}}
						image={{
							source: resumeImage,
							alt: capitalize(RESUME_PAGE_NAME),
						}}
						label="R&eacute;sum&eacute;"
						onMouseEnter={onMouseEnter}
						onClick={onNavItemClick}
					/>
					<NavListItem
						expandedItemOptions={{
							items: [
								...ABOUT_SECTION_NAMES.map((name) => {
									const nameToUse = name.replace('-', ' ');

									//todo: add images here
									return {
										to: `${ABOUT_URL}#${nameToUse?.toLowerCase()}`,
										label: capitalize(nameToUse),
										onMouseEnter: onMouseEnter,
										onClick: onNavItemClick,
									}
								}),
								{
									// image: {
									// 	source: replayImage,
									// 	alt: "Personality",
									// },
									to: PERSONALITY_URL,
									label: "Personality",
									onMouseEnter: onMouseEnter,
									onClick: onNavItemClick,
								},
							]
						}}
						image={{
							source: aboutImage,
							alt: capitalize(ABOUT_PAGE_NAME),
						}}
						label={capitalize(ABOUT_PAGE_NAME)}
						onMouseEnter={onMouseEnter}
						onClick={onNavItemClick}
					/>
					<NavListItem
						image={{
							source: examplesImage,
							alt: "Projects",
						}}
						label="Projects"
						onMouseEnter={onMouseEnter}
						onClick={onNavItemClick}
						expandedItemOptions={{
							items: [
								{
									image: {
										source: replayImage,
										alt: "Replay Viewer",
									},
									to: REPLAY_VIEWER_URL,
									label: "Replay Viewer",
									onMouseEnter: onMouseEnter,
									onClick: onNavItemClick,
								},
								{
									image: {
										source: bridgeImage,
										alt: capitalize(BRIDGE_PAGE_NAME),
									},
									to: BRIDGE_URL,
									label: "A# Maj Bridge",
									onMouseEnter: onMouseEnter,
									onClick: onNavItemClick,
								},
								{
									image:{
										source: autoBidImage,
										alt: AUTO_BID_PAGE_NAME,
									},
									to: AUTO_BID_URL,
									label: capitalize(AUTO_BID_PAGE_NAME),
									onMouseEnter: onMouseEnter,
									onClick: onNavItemClick,
								},
								{
									image: {
										source: downloaderImage,
										alt: capitalize(DOWNLOADER_PAGE_NAME),
									},
									to: DOWNLOADER_URL, 
									label: capitalize(DOWNLOADER_PAGE_NAME), 
									onMouseEnter: onMouseEnter, 
									onClick: onNavItemClick, 
								},
								{
									image: {
										source: syncerImage,
										alt: "Syncer",
									},
									to: PLAYLIST_SYNCER_URL,
									label: "Syncer",
									onMouseEnter: onMouseEnter,
									onClick: onNavItemClick,
								}
							]
						}
					}/>
					<NavListItem
						image={{
							source: contactImage,
							alt: "Contact",
						}}
						to={`mailto:${EMAIL}`}
						label="Contact"
						isEmail={true}
						onMouseEnter={onMouseEnter}
						onClick={onNavItemClick}
					/>
				</ul>
			</section>
			<div
				onClick={(e: any) => onNavClick(e)}
				className={`${NAVBAR_CLASSNAME}__background`}
				aria-hidden="true"></div>
		</div>,
		document.querySelector(`.${SITE_NAV_CLASSNAME}`)!,
	);
	//#endregion
};

