import React from "react";
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

import { setHeaderHeight, setIsAnimating } from "../../../actions";
import { checkForParentOfType } from "../../../helpers";
import {
	ANIMATION_DURATION,
	HEADER_ID,
	OVERFLOW_HIDDEN_CLASSNAME,
	Reference,
	Z_INDEX_HIGHEST_CLASSNAME,
} from "../../constants";
import {
	NAVBAR_ACTIVE_CLASSNAME,
	NAVBAR_DONE_CLASSNAME,
	NAVBAR_IS_ANIMATING_CLASSNAME,
} from "../utils";
import {
	changePage,
	destroy,
	startAnimating,
	init,
	setBodyStyle,
	setHeaderHeightOnViewPortChange,
	getResetAnimatingId,
} from "./utils";

interface SiteNavProps {
	isAnimating: boolean;
	match: { url: string };
	previousUrl: string;
	viewPortWidth: number;
	sounds: { play: (value: string) => void };
	setIsAnimating: (value: boolean) => void;
	setHeaderHeight: (value: number) => void;
}

const SiteNav: React.FC<SiteNavProps> = ({
	isAnimating,
	setIsAnimating,
	match,
	previousUrl,
	viewPortWidth,
	sounds,
	setHeaderHeight,
}) => {
	const [currentUrl, setCurrentUrl] = useState<string>("");
	const navRef = useRef<HTMLElement>(null);
	// const noFilterPages = ['/bridge'];

	const hide = () => {
		(navRef as Reference)?.current.classList.add(OVERFLOW_HIDDEN_CLASSNAME);
	};

	const handleSound = (e: MouseEvent) => {
		const isActive = (e.currentTarget as HTMLElement).className.match(
			/--active/i,
		) as RegExpMatchArray;
		const isMenu = (e.target as HTMLElement)?.className?.match(
			/navbar__menu/i,
		) as RegExpMatchArray;
		const isNavbar = (e.target as HTMLElement).classList.contains("navbar");

		if (!isActive && isMenu) sounds.play("siteNavOpen");
		else if ((!isActive && !isNavbar) || (isActive && isMenu))
			sounds.play("siteNavClose");
	};

	const onNavClick = (e: MouseEvent) => {
		e.stopPropagation();
		const navBar = navRef.current;
		const isChildOfNavBar = checkForParentOfType(
			e.target as HTMLElement,
			"nav",
			"navbar",
		);

		if (!navBar) return;
		handleSound(e);

		if (isChildOfNavBar) navBar.classList.add(OVERFLOW_HIDDEN_CLASSNAME);

		if (
			!navBar.classList?.contains(NAVBAR_ACTIVE_CLASSNAME) &&
			isChildOfNavBar
		) {
			navBar.classList.add(OVERFLOW_HIDDEN_CLASSNAME);
			navBar.classList?.add(NAVBAR_ACTIVE_CLASSNAME);
			document
				.querySelector(HEADER_ID)!
				.classList.add(Z_INDEX_HIGHEST_CLASSNAME);
			setIsAnimating(true);
		} else {
			navBar.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
			navBar.classList?.remove(NAVBAR_DONE_CLASSNAME);

			setTimeout(() => {
				document
					.querySelector(HEADER_ID)!
					.classList.remove(Z_INDEX_HIGHEST_CLASSNAME);
			}, ANIMATION_DURATION);

			setIsAnimating(false);
		}
	};

	const onNavItemClick = (e: MouseEvent) => {
		hide();
	};

	const onMouseEnter = (e: MouseEvent) => {
		e.stopPropagation();
		if (
			!navRef.current ||
			!navRef.current?.classList.contains(NAVBAR_ACTIVE_CLASSNAME)
		) {
			navRef.current?.classList.add(OVERFLOW_HIDDEN_CLASSNAME);
			return;
		} else if (
			navRef.current.classList.contains(NAVBAR_IS_ANIMATING_CLASSNAME) ||
			navRef.current.classList.contains(NAVBAR_DONE_CLASSNAME)
		) {
			navRef.current?.classList.remove(OVERFLOW_HIDDEN_CLASSNAME);
		}
	};

	useEffect(() => {
		setBodyStyle(currentUrl);
	}, [currentUrl]);

	useEffect(() => {
		setHeaderHeightOnViewPortChange(viewPortWidth, setHeaderHeight);
	}, [viewPortWidth, setHeaderHeight]);

	useEffect(() => {
		if (!currentUrl || currentUrl !== match.url) {
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
		startAnimating(navRef, isAnimating);

		return () => {
			clearTimeout(getResetAnimatingId());
		};
	}, [isAnimating]);

	return ReactDOM.createPortal(
		<nav
			ref={navRef}
			className="navbar z-index-navbar"
			onClick={(e: any) => onNavClick(e)}>
			<div className="navbar__button">
				<div className="navbar__menu">
					<div className="navbar__menu-bar"></div>
				</div>
			</div>
			<div className="navbar__content">
				<ul className="navbar__list">
					<NavListItem
						imageSource={aboutImage}
						imageAlt="About"
						to="/about"
						label="About"
						onMouseEnter={onMouseEnter}
						onClick={onNavItemClick}
					/>

					<NavListItem
						imageSource={resumeImage}
						imageAlt="Resume"
						to="/resume"
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
						className="navbar__item navbar__dropdown-container flex align-center justify-content-center"
						triangle={<div className="triangle-down"></div>}>
						<ul className="navbar__dropdown">
							<NavListItem
								imageSource={downloaderImage}
								imageAlt="Downloader"
								to="/examples/downloader"
								label="Downloader"
								onMouseEnter={onMouseEnter}
								onClick={onNavItemClick}
							/>
							<NavListItem
								imageSource={syncerImage}
								imageAlt="Syncer"
								to="/examples/playlist-syncer"
								label="Syncer"
								onMouseEnter={onMouseEnter}
								onClick={onNavItemClick}
							/>
							<NavListItem
								imageSource={bridgeImage}
								imageAlt="Bridge"
								to="/examples/bridge"
								label="A# Maj Bridge"
								onMouseEnter={onMouseEnter}
								onClick={onNavItemClick}
							/>
							<NavListItem
								imageSource={autoBidImage}
								imageAlt="autoBid"
								to="/examples/autobid"
								label="Auto Bid"
								onMouseEnter={onMouseEnter}
								onClick={onNavItemClick}
							/>
							{/* <NavListItem
								to="/examples"
								label="All"
								onMouseEnter={onMouseEnter}
								onClick={onNavItemClick}
							/> */}
						</ul>
					</NavListItem>
					<NavListItem
						imageSource={contactImage}
						imageAlt="Contact"
						to="/contact"
						label="Contact"
						onMouseEnter={onMouseEnter}
						onClick={onNavItemClick}
					/>
				</ul>
			</div>
			<div
				onClick={(e: any) => onNavClick(e)}
				className="navbar__background"></div>
		</nav>,
		document.querySelector(".site-nav")!,
	);
};

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		isAnimating: state.general.isAnimating,
		previousUrl: state.general.previousUrl,
		viewPortWidth: state.general.viewPortWidth,
		sounds: state.sounds,
	};
};

export default connect(mapStateToProps, {
	setIsAnimating,
	setHeaderHeight,
})(SiteNav);
