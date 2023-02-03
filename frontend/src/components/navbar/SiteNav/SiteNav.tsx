import React, { SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import { connect, RootStateOrAny } from "react-redux";
import ReactDOM from "react-dom";
import NavListItem from "../NavListItem";

import aboutImage from "../../../imgs/site-nav-about.jpg";
import autoBidImage from "../../../imgs/site-nav-autobid.jpg";
import bridgeImage from "../../../imgs/bridge-section-6.jpg";
import contactImage from "../../../imgs/site-nav-contact.jpg";
import downloaderImage from "../../../imgs/site-nav-downloader.jpg";
import examplesImage from "../../../imgs/site-nav-examples.jpg";
import resumeImage from "../../../imgs/site-nav-resume.jpg";
import syncerImage from "../../../imgs/site-nav-syncer.jpg";
import replayImage from "../../../imgs/site-nav-replay.jpg";

import { setHeaderHeight } from "../../../actions";
import {
	NAVBAR_ACTIVE_CLASSNAME,
	NAVBAR_CLASSNAME,
	NAVBAR_DEFAULT_CLASSNAME,
	NAVBAR_DONE_CLASSNAME,
	NAVBAR_IS_ANIMATING_CLASSNAME,
	setHeaderHeaderCSSPropertyValue as setHeaderHeightCSSPropertyValue,
} from "../utils";
import {
	changePage,
	destroy,
	init,
	setBodyStyle,
	handleMouseEnter,
	resetPageNavMinWidth,
	setHeaderHeightOnViewPortChange,
} from "./utils";
import { scrollToSection } from "../../utils";
import {
	ABOUT_PAGE_NAME,
	ABOUT_URL,
	LIVE_BRIDGE_URL,
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
	LIVE_REPLAYS_URL,
	OVERFLOW_HIDDEN_CLASSNAME,
	ANIMATION_DURATION,
	UNCLICKABLE_CLASSNAME,
} from "../../constants";
import { LoadedSounds } from "../../../reducers/soundsReducer";
import { capitalize } from "../../../helpers";
import { Dispatch } from "react";
import { useLocation } from "react-router-dom";

export const SITE_NAV_CLASSNAME = "site-nav";
export const SITE_NAV_MINIMAL_CLASSNAME = "site-nav--nav-switch-minimal";

interface SiteNavProps {
	match: { url: string };
	previousUrl: string;
	viewPortWidth: number;
	headerHeight: number;
	sounds: LoadedSounds;
	setHeaderHeight: (value: number) => void;
}

const SiteNav: React.FC<SiteNavProps> = ({
	match,
	previousUrl,
	viewPortWidth,
	setHeaderHeight,
}) => {
	const CLOSE_WINDOW_WAIT = 750;
	const RESET_HAS_PINGED_CONTAINER_DURATION = 900000;
	const [currentUrl, setCurrentUrl] = useState<string>("");
	const location = useLocation();
	const navRef = useRef<HTMLElement>(null);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [hasPingedBridgeHerokuContainer, setHasPingedBridgeHerokuContainer] =
		useState(false);
	const [hasPingedReplayHerokuContainer, setHasPingedReplayHerokuContainer] =
		useState(false);


	//#region Functions/Handlers
	const onNavClick = (e: MouseEvent) => {
		e && e.stopPropagation();
		if (!!isTransitioning) {
			return;
		}
		setIsTransitioning(true);
		setIsOpen(!isOpen);
		setTimeout(() => {
			setIsTransitioning(false);
		}, ANIMATION_DURATION + 40)
	};

	const onNavItemClick = (e: MouseEvent) => {
		e && e.stopPropagation();
		const target = e.target as HTMLElement;
		
		//do nothing if it is a nav group
		if (target.children?.length > 0) {
			return;
		}

		if (!target) return;

		//note: this starts heroku container from sleep (no longer necessary as free tier gone)
		// if (!hasPingedBridgeHerokuContainer && target.baseURI.match(BRIDGE_URL))
		// 	pingContainer(setHasPingedBridgeHerokuContainer, LIVE_BRIDGE_URL);
		// if (
		// 	!hasPingedReplayHerokuContainer &&
		// 	target.baseURI.match(REPLAY_VIEWER_URL)
		// )
		// 	pingContainer(setHasPingedReplayHerokuContainer, LIVE_REPLAYS_URL);

		//need timeout to ensure page has loaded first (may need to increase if overflow hidden glitch still occurs)
		setTimeout(() => {
			onNavClick(e);
		}, 1)
	};

	const onMouseEnter = (e: MouseEvent) => {
		e.stopPropagation();
		handleMouseEnter(navRef);
	};

	function pingContainer(
		setStateAction: Dispatch<SetStateAction<boolean>>,
		href: string,
	) {
		const currentWindow = window;
		const openedWindow = window.open(href);

		currentWindow.focus();

		setTimeout(() => {
			if (openedWindow) openedWindow.close();
			setStateAction(true);
		}, CLOSE_WINDOW_WAIT);

		setTimeout(() => {
			setStateAction(false);
		}, RESET_HAS_PINGED_CONTAINER_DURATION);
	}
	//#endregion

	//#region Side FXs
	useEffect(() => {
		//need timeout to wait for PageNav to render
		setTimeout(() => {
			setHeaderHeightCSSPropertyValue();
		}, 1);
	});

	useEffect(() => {
		setBodyStyle(currentUrl);
	}, [currentUrl]);

	useEffect(() => {
		// setHeaderHeightOnViewPortChange(viewPortWidth, setHeaderHeight);
		resetPageNavMinWidth(viewPortWidth);
		setHeaderHeightCSSPropertyValue();
	}, [viewPortWidth, setHeaderHeight]);

	useEffect(() => {
		if (!currentUrl || currentUrl !== match.url) {
			scrollToSection(document.body);
			setCurrentUrl(match.url);
		}
	}, [match, currentUrl, previousUrl, setCurrentUrl]);

	useEffect(() => {
		changePage(currentUrl);
	}, [currentUrl]);

	useEffect(() => {
		init(navRef, setHeaderHeight);

		return () => {
			destroy(navRef);
		};
	}, [setHeaderHeight, location]);
	//#endregion

	//#region JSX
	const dynamicClassnames = isOpen 
		? `
			${NAVBAR_ACTIVE_CLASSNAME} 
			${NAVBAR_DONE_CLASSNAME} 
			${isTransitioning ? OVERFLOW_HIDDEN_CLASSNAME: ''}
			${isTransitioning ? UNCLICKABLE_CLASSNAME: ''}
		  ` 
		: `
			${isTransitioning ? NAVBAR_DONE_CLASSNAME : ''} 
			${OVERFLOW_HIDDEN_CLASSNAME}
			${isTransitioning ? NAVBAR_IS_ANIMATING_CLASSNAME : ''}
		` ;

	console.log({isOpen, isTransitioning});
	
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
						imageSource={aboutImage}
						imageAlt={capitalize(ABOUT_PAGE_NAME)}
						to={ABOUT_URL}
						label={capitalize(ABOUT_PAGE_NAME)}
						onMouseEnter={onMouseEnter}
						onClick={onNavItemClick}
					/>
					<NavListItem
						imageSource={resumeImage}
						imageAlt={capitalize(RESUME_PAGE_NAME)}
						to={RESUME_URL}
						label="R&eacute;sum&eacute;"
						onMouseEnter={onMouseEnter}
						onClick={onNavItemClick}
					/>
					<NavListItem
						imageSource={examplesImage}
						imageAlt="projects"
						isLink={false}
						to="/projects"
						label="Projects"
						onMouseEnter={onMouseEnter}
						onClick={onNavItemClick}
						className={`${NAVBAR_CLASSNAME}__item ${NAVBAR_CLASSNAME}__dropdown-container flex align-center justify-content-center`}
						triangle={<div className="triangle-down"></div>}>
						<ul className={`${NAVBAR_CLASSNAME}__dropdown`}>
							<NavListItem
								imageSource={replayImage}
								imageAlt="Replay Viewer"
								to={REPLAY_VIEWER_URL}
								label="Replay Viewer"
								onMouseEnter={onMouseEnter}
								onClick={onNavItemClick}
							/>
							<NavListItem
								imageSource={bridgeImage}
								imageAlt={capitalize(BRIDGE_PAGE_NAME)}
								to={BRIDGE_URL}
								label="A# Maj Bridge"
								onMouseEnter={onMouseEnter}
								onClick={onNavItemClick}
							/>
							<NavListItem
								imageSource={autoBidImage}
								imageAlt={AUTO_BID_PAGE_NAME}
								to={AUTO_BID_URL}
								label={capitalize(AUTO_BID_PAGE_NAME)}
								onMouseEnter={onMouseEnter}
								onClick={onNavItemClick}
							/>
							<NavListItem
								imageSource={downloaderImage}
								imageAlt={capitalize(DOWNLOADER_PAGE_NAME)}
								to={DOWNLOADER_URL}
								label={capitalize(DOWNLOADER_PAGE_NAME)}
								onMouseEnter={onMouseEnter}
								onClick={onNavItemClick}
							/>
							<NavListItem
								imageSource={syncerImage}
								imageAlt="Syncer"
								to={PLAYLIST_SYNCER_URL}
								label="Syncer"
								onMouseEnter={onMouseEnter}
								onClick={onNavItemClick}
							/>
						</ul>
					</NavListItem>
					<NavListItem
						imageSource={contactImage}
						imageAlt="Contact"
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
		document.querySelector(".site-nav")!,
	);
	//#endregion
};

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		previousUrl: state.general.previousUrl,
		viewPortWidth: state.general.viewPortWidth,
		headerHeight: state.general.headerHeight,
		sounds: state.sounds,
	};
};

export default connect(mapStateToProps, {
	setHeaderHeight,
})(SiteNav);
