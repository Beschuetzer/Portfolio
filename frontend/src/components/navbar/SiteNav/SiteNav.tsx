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
import {
	NAVBAR_CLASSNAME,
	NAVBAR_Z_INDEX_CLASSNAME,
} from "../utils";
import {
	changePage,
	destroy,
	startAnimating,
	init,
	setBodyStyle,
	setHeaderHeightOnViewPortChange,
	getResetAnimatingId,
	hide,
	handleNavClick,
	handleMouseEnter,
} from "./utils";
import { scrollToSection } from "../../utils";
import { email } from "../../constants";

interface SiteNavProps {
	isAnimating: boolean;
	match: { url: string };
	previousUrl: string;
	viewPortWidth: number;
	headerHeight: number;
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
	headerHeight,
	sounds,
	setHeaderHeight,
}) => {
	const [currentUrl, setCurrentUrl] = useState<string>("");
	const navRef = useRef<HTMLElement>(null);
	
	const onNavClick = (e: MouseEvent) => {
		e.stopPropagation();
		handleNavClick(navRef, sounds, setIsAnimating, e);
	};

	const onNavItemClick = (e: MouseEvent) => {
		hide(navRef);
	};

	const onMouseEnter = (e: MouseEvent) => {
		e.stopPropagation();
		handleMouseEnter(navRef);
	};

	useEffect(() => {
		setBodyStyle(currentUrl);
	}, [currentUrl]);

	useEffect(() => {
		setHeaderHeightOnViewPortChange(viewPortWidth, setHeaderHeight);
	}, [viewPortWidth, setHeaderHeight]);

	useEffect(() => {
		if (!currentUrl || currentUrl !== match.url) {
			scrollToSection(document.body, headerHeight)
			setCurrentUrl(match.url);
		}
	}, [match, currentUrl, previousUrl, setCurrentUrl, headerHeight]);

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
			className={`${NAVBAR_CLASSNAME} ${NAVBAR_Z_INDEX_CLASSNAME}`}
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
						className={`${NAVBAR_CLASSNAME}__item ${NAVBAR_CLASSNAME}__dropdown-container flex align-center justify-content-center`}
						triangle={<div className="triangle-down"></div>}>
						<ul className={`${NAVBAR_CLASSNAME}__dropdown`}>
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
						</ul>
					</NavListItem>
					<NavListItem
						imageSource={contactImage}
						imageAlt="Contact"
						to={`mailto:${email}`}
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
		</nav>,
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
