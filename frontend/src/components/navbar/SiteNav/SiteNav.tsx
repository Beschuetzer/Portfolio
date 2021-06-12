import React, { RefObject } from "react";
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

import { setHeaderHeight, setIsAnimating, setViewPortWidth, setIsMobile } from "../../../actions";
import {
	NAVBAR_ACTIVE_CLASSNAME,
	NAVBAR_CLASSNAME,
	NAVBAR_CONTENT_CLASSNAME,
	NAVBAR_DONE_CLASSNAME,
	NAVBAR_Z_INDEX_CLASSNAME,
} from "../utils";
import {
	changePage,
	destroy,
	startAnimating,
	init,
	setBodyStyle,
	getResetAnimatingId,
	hide,
	handleMouseEnter,
	HEADER_ID,
	handleSound,
	HEADER_TOGGLER_CLASSNAME,
} from "./utils";
import { scrollToSection } from "../../utils";
import { checkForParentOfType } from "../../../helpers";
import { ANIMATION_DURATION, DISPLAY_NONE_CLASSNAME, MOBILE_BREAK_POINT_WIDTH, OVERFLOW_HIDDEN_CLASSNAME, TRANSPARENT_CLASSNAME, Z_INDEX_HIGHEST_CLASSNAME } from "../../constants";

interface SiteNavProps {
	match: { url: string };
	previousUrl: string;
	headerHeight: number;
	sounds: { play: (value: string) => void };
	setIsAnimating: (value: boolean) => void;
	setHeaderHeight: (value: number) => void;
	setViewPortWidth:  (value: number) => void;
	setIsMobile:  (value: boolean, windowWidth: number) => void;
	navRef: RefObject<HTMLElement>;
}

interface SiteNavState {
	currentUrl: string,
	isAnimating: boolean,
	headerHeight: number,
	viewPortWidth: number;
	isMobile: boolean,
}

class SiteNav extends React.PureComponent<SiteNavProps, SiteNavState> implements SiteNavProps  {
	match: { url: string };
	previousUrl: string;
	headerHeight: number;
	sounds: { play: (value: string) => void };
	setIsAnimating: (value: boolean) => void;
	setHeaderHeight: (value: number) => void;
	setIsMobile: (value: boolean, windowWidth: number) => void;
	setViewPortWidth: (value: number) => void;
	navRef: RefObject<HTMLElement>;

	constructor(props: SiteNavProps){
		super(props);
		this.match = this.props.match;
		this.previousUrl = this.props.previousUrl;
		this.headerHeight = this.props.headerHeight;
		this.sounds = this.props.sounds;
		this.setIsAnimating = this.props.setIsAnimating;
		this.setHeaderHeight = this.props.setHeaderHeight;
		this.setIsMobile = this.props.setIsMobile;
		this.setViewPortWidth = this.props.setViewPortWidth;
		this.state = {
			currentUrl: '',
			isAnimating: false,
			headerHeight: 0,
			viewPortWidth: window.innerWidth,
			isMobile: window.innerWidth <= MOBILE_BREAK_POINT_WIDTH,
		}
		this.navRef = React.createRef();
	}

	onNavClick = (e: MouseEvent) => {
		e.stopPropagation();
		const navBar = this.navRef.current;
		const isChildOfNavBar = checkForParentOfType(
			e.target as HTMLElement,
			"nav",
			NAVBAR_CLASSNAME,
		);
	
		if (!navBar) return;
		if (this.sounds !== undefined) {
			handleSound(this.sounds, e);
		}
	
		if (isChildOfNavBar) navBar.classList.add(OVERFLOW_HIDDEN_CLASSNAME);
	
		if (!navBar.classList?.contains(NAVBAR_ACTIVE_CLASSNAME) && isChildOfNavBar) {
			navBar.classList.add(OVERFLOW_HIDDEN_CLASSNAME);
			navBar.classList?.add(NAVBAR_ACTIVE_CLASSNAME);
			document.querySelector(HEADER_ID)!.classList.add(Z_INDEX_HIGHEST_CLASSNAME);
			if (this.state.isAnimating === false) {
				this.setIsAnimating(true);
				this.setState({isAnimating: true});
			}
		} else {
			navBar.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
			navBar.classList?.remove(NAVBAR_DONE_CLASSNAME);
	
			setTimeout(() => {
				document
					.querySelector(HEADER_ID)!
					.classList.remove(Z_INDEX_HIGHEST_CLASSNAME);
			}, ANIMATION_DURATION);
	
			if (this.state.isAnimating === true) {
				this.setIsAnimating(false);
				this.setState({isAnimating: false})
			}
		}
	};

	onNavItemClick = (e: MouseEvent) => {
		hide(this.navRef);
	};

	onMouseEnter = (e: MouseEvent) => {
		e.stopPropagation();
		handleMouseEnter(this.navRef);
	};

	handleResize = (e: any) => {
		const viewPortWidth = window.innerWidth;
		if (this.state.viewPortWidth !== viewPortWidth) this.setState({viewPortWidth});
	}

	handleScroll = (e: any) => {
		const headerHeight = document.querySelector('#header')!.getBoundingClientRect().height;
		if (this.state.headerHeight !== headerHeight)	this.setState({headerHeight})
	}

	componentDidMount () {
		init(this.navRef, this.props.setHeaderHeight);
		document.addEventListener('scroll', this.handleScroll);
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		destroy(this.navRef);
		document.removeEventListener('scroll', this.handleScroll);
		window.removeEventListener('resize', this.handleResize);
	}

	componentDidUpdate(prevProps: any, prevState: any) {
		// if (prevProps.headerHeight !== this.props.headerHeight || this.state.headerHeight !== prevState.headerHeight) {
			if (this.props.match.url !== '/') {
				document.querySelector(`${HEADER_ID}`)!.classList.remove(TRANSPARENT_CLASSNAME);
				document.querySelector(`.${HEADER_TOGGLER_CLASSNAME}`)!.classList.remove(DISPLAY_NONE_CLASSNAME);
			} else {
				document.querySelector(`${HEADER_ID}`)!.classList.add(TRANSPARENT_CLASSNAME);
				document.querySelector(`.${HEADER_TOGGLER_CLASSNAME}`)!.classList.add(DISPLAY_NONE_CLASSNAME);
			}
		// }

			if (!this.state.currentUrl || this.state.currentUrl !== this.props.match.url) {
				scrollToSection(document.body, this.headerHeight)
				if (this.state.currentUrl !== this.props.match.url) this.setState({currentUrl: this.props.match.url});
			}
		// }

		if (this.state.currentUrl !== this.props.match.url || this.state.currentUrl === prevState.currentUrl) {
			setBodyStyle(this.props.match.url);
		}

		//on viewport changed
		if (prevState.viewPort !== this.state.viewPortWidth) {
			const navbarContent = document.querySelector(
				`.${NAVBAR_CONTENT_CLASSNAME}`,
			) as HTMLElement;
			const header = document.querySelector(HEADER_ID) as HTMLElement;
			const headerBoundingRect = header.getBoundingClientRect();
		
			let newTop = `calc(${headerBoundingRect.height}px)`;
			if (this.state.viewPortWidth > MOBILE_BREAK_POINT_WIDTH) {
				newTop = "auto";
			}
			navbarContent.style.top = newTop;
		
			const headerHeight = header.getBoundingClientRect().height;
			if (this.state.headerHeight !== headerHeight) this.setState({headerHeight});
		}

		//when isAnimating changes
		if (prevState.isAnimating !== this.state.isAnimating) {
			clearTimeout(getResetAnimatingId());
			changePage(this.state.currentUrl);
			startAnimating(this.navRef, this.state.isAnimating);
		}
	}

	listOfItems = (<ul className={`${NAVBAR_CLASSNAME}__list`}>
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
	</ul>);

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
					{this.listOfItems}
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
	setIsMobile,
	setViewPortWidth
})(SiteNav as any);
