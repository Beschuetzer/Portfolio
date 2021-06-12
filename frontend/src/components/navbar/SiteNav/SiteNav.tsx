import React, { RefObject } from "react";
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

interface SiteNavProps {
	isAnimating: boolean;
	match: { url: string };
	previousUrl: string;
	viewPortWidth: number;
	headerHeight: number;
	sounds: { play: (value: string) => void };
	setIsAnimating: (value: boolean) => void;
	setHeaderHeight: (value: number) => void;
	navRef: RefObject<HTMLElement>;
}

interface SiteNavState {
	currentUrl: string,
}

class SiteNav extends React.PureComponent<SiteNavProps, SiteNavState> implements SiteNavProps  {
	isAnimating: boolean;
	match: { url: string };
	previousUrl: string;
	viewPortWidth: number;
	headerHeight: number;
	sounds: { play: (value: string) => void };
	setIsAnimating: (value: boolean) => void;
	setHeaderHeight: (value: number) => void;
	navRef: RefObject<HTMLElement>;

	constructor(props: SiteNavProps){
		super(props);
		this.isAnimating = this.props.isAnimating;
		this.match = this.props.match;
		this.previousUrl = this.props.previousUrl;
		this.viewPortWidth = this.props.viewPortWidth;
		this.headerHeight = this.props.headerHeight;
		this.sounds = this.props.sounds;
		this.setIsAnimating = this.props.setIsAnimating;
		this.setHeaderHeight = this.props.setHeaderHeight;
		this.state = {
			currentUrl: '',
		}
		this.navRef = React.createRef();
	}

	
	onNavClick = (e: MouseEvent) => {
		e.stopPropagation();
		handleNavClick(this.navRef, this.sounds, setIsAnimating, e);
	};

	onNavItemClick = (e: MouseEvent) => {
		hide(this.navRef);
	};

	onMouseEnter = (e: MouseEvent) => {
		e.stopPropagation();
		handleMouseEnter(this.navRef);
	};

	componentDidMount () {
		init(this.navRef, setHeaderHeight);
	}


	componentDidUpdate(propsTwo: any) {
		setBodyStyle(this.state.currentUrl);
		setHeaderHeightOnViewPortChange(this.viewPortWidth, setHeaderHeight); //on viewport change

		//when header height changes
		if (!this.state.currentUrl || this.state.currentUrl !== this.match.url) {
			scrollToSection(document.body, this.headerHeight)
			this.setState({currentUrl: this.match.url});
		}

		//when isAnimating changes
		clearTimeout(getResetAnimatingId());
		changePage(this.state.currentUrl);
		startAnimating(this.navRef, this.isAnimating);
	}

	componentWillUnmount() {
		destroy(this.navRef);
	}

	render(){
		return ReactDOM.createPortal(
			<nav
				ref={this.navRef}
				className={`${NAVBAR_CLASSNAME} ${NAVBAR_Z_INDEX_CLASSNAME}`}
				onClick={(e: any) => this.onNavClick(e)}>
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
							onMouseEnter={this.onMouseEnter}
							onClick={this.onNavItemClick}
						/>

						<NavListItem
							imageSource={resumeImage}
							imageAlt="Resume"
							to="/resume"
							label="R&eacute;sum&eacute;"
							onMouseEnter={this.onMouseEnter}
							onClick={this.onNavItemClick}
						/>
						<NavListItem
							imageSource={examplesImage}
							imageAlt="Examples"
							isLink={false}
							to="/examples"
							label="Examples"
							onMouseEnter={this.onMouseEnter}
							onClick={this.onNavItemClick}
							className={`${NAVBAR_CLASSNAME}__item ${NAVBAR_CLASSNAME}__dropdown-container flex align-center justify-content-center`}
							triangle={<div className="triangle-down"></div>}>
							<ul className={`${NAVBAR_CLASSNAME}__dropdown`}>
								<NavListItem
									imageSource={bridgeImage}
									imageAlt="Bridge"
									to="/examples/bridge"
									label="A# Maj Bridge"
									onMouseEnter={this.onMouseEnter}
									onClick={this.onNavItemClick}
								/>
								<NavListItem
									imageSource={autoBidImage}
									imageAlt="autoBid"
									to="/examples/autobid"
									label="Auto Bid"
									onMouseEnter={this.onMouseEnter}
									onClick={this.onNavItemClick}
								/>
								<NavListItem
									imageSource={downloaderImage}
									imageAlt="Downloader"
									to="/examples/downloader"
									label="Downloader"
									onMouseEnter={this.onMouseEnter}
									onClick={this.onNavItemClick}
								/>
								<NavListItem
									imageSource={syncerImage}
									imageAlt="Syncer"
									to="/examples/playlist-syncer"
									label="Syncer"
									onMouseEnter={this.onMouseEnter}
									onClick={this.onNavItemClick}
								/>
							</ul>
						</NavListItem>
						<NavListItem
							imageSource={contactImage}
							imageAlt="Contact"
							to="/contact"
							label="Contact"
							onMouseEnter={this.onMouseEnter}
							onClick={this.onNavItemClick}
						/>
					</ul>
				</div>
				<div
					onClick={(e: any) => this.onNavClick(e)}
					className={`${NAVBAR_CLASSNAME}__background`}></div>
			</nav>,
			document.querySelector(".site-nav")!,
		);
	}
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
