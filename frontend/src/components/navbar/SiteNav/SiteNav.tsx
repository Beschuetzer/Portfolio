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

import { setHeaderHeight, setIsAnimating } from "../../../actions";
import {
	NAVBAR_ACTIVE_CLASSNAME,
	NAVBAR_CLASSNAME,
	NAVBAR_DEFAULT_CLASSNAME,
	setHeaderHeaderCSSPropertyValue as setHeaderHeightCSSPropertyValue,
} from "../utils";
import {
	changePage,
	destroy,
	startAnimating,
	init,
	setBodyStyle,
	getResetAnimatingId,
	hide,
	handleNavClick,
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
	ANIMATION_DURATION_WAIT_FACTOR,
} from "../../constants";
import { LoadedSounds } from "../../../reducers/soundsReducer";
import { capitalize } from "../../../helpers";
import { Dispatch } from "react";

export const SITE_NAV_CLASSNAME = "site-nav";
export const SITE_NAV_MINIMAL_CLASSNAME = "site-nav--nav-switch-minimal";

interface SiteNavProps {
	isAnimating: boolean;
	match: { url: string };
	previousUrl: string;
	viewPortWidth: number;
	headerHeight: number;
	sounds: LoadedSounds;
	setIsAnimating: (value: boolean) => void;
	setHeaderHeight: (value: number) => void;
}

const SiteNav: React.FC<SiteNavProps> = ({
	isAnimating,
	setIsAnimating,
	match,
	previousUrl,
	viewPortWidth,
	headerHeight,
	sounds,
	setHeaderHeight,
}) => {
	const CLOSE_WINDOW_WAIT = 750;
	const RESET_HAS_PINGED_CONTAINER_DURATION = 900000;
	const [currentUrl, setCurrentUrl] = useState<string>("");
	const navRef = useRef<HTMLElement>(null);
	const [hasPingedBridgeHerokuContainer, setHasPingedBridgeHerokuContainer] =
		useState(false);
	const [hasPingedReplayHerokuContainer, setHasPingedReplayHerokuContainer] =
		useState(false);

	const onNavClick = (e: MouseEvent) => {
		e.stopPropagation();
		handleNavClick(navRef, sounds, setIsAnimating, e);
	};

	const onNavItemClick = (e: MouseEvent) => {
		hide(navRef);
		const target = e.target as HTMLElement;

		if (!target) return;

		//note: this starts heroku container from sleep
		if (!hasPingedBridgeHerokuContainer && target.baseURI.match(BRIDGE_URL))
			pingContainer(setHasPingedBridgeHerokuContainer, LIVE_BRIDGE_URL);
		if (
			!hasPingedReplayHerokuContainer &&
			target.baseURI.match(REPLAY_VIEWER_URL)
		)
			pingContainer(setHasPingedReplayHerokuContainer, LIVE_REPLAYS_URL);
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
		setHeaderHeightOnViewPortChange(viewPortWidth, setHeaderHeight);
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

	//initial
	useEffect(() => {
		init(navRef, setHeaderHeight);

		return () => {
			destroy(navRef);
		};
	}, [setHeaderHeight]);

	useEffect(() => {
		const navRefEl = navRef.current as HTMLElement;
		let waitDurationFactor = ANIMATION_DURATION_WAIT_FACTOR;
		if (navRefEl?.classList.contains(NAVBAR_ACTIVE_CLASSNAME)) waitDurationFactor = 0;
		startAnimating(navRef, isAnimating, waitDurationFactor);

		return () => {
			clearTimeout(getResetAnimatingId());
		};
	}, [isAnimating]);

	return ReactDOM.createPortal(
		<div
			ref={navRef as any}
			className={NAVBAR_DEFAULT_CLASSNAME}
			onClick={(e: any) => onNavClick(e)}>
			<div className={`${NAVBAR_CLASSNAME}__button`}>
				<div className={`${NAVBAR_CLASSNAME}__menu`}>
					<div className={`${NAVBAR_CLASSNAME}__menu-bar`}></div>
				</div>
			</div>
			<div className={`${NAVBAR_CLASSNAME}__content`}>
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
						imageAlt="Examples"
						isLink={false}
						to="/examples"
						label="Examples"
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
			</div>
			<div
				onClick={(e: any) => onNavClick(e)}
				className={`${NAVBAR_CLASSNAME}__background`}></div>
		</div>,
		document.querySelector(".site-nav")!,
	);
};

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		isAnimating: state.general.isAnimating,
		previousUrl: state.general.previousUrl,
		viewPortWidth: state.general.viewPortWidth,
		headerHeight: state.general.headerHeight,
		sounds: state.sounds,
	};
};

export default connect(mapStateToProps, {
	setIsAnimating,
	setHeaderHeight,
})(SiteNav);
