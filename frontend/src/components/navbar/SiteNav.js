import React from "react";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import NavListItem from "./NavListItem";

import aboutImage from '../../imgs/site-nav-about.jpg';
import autoBidImage from '../../imgs/site-nav-autobid.jpg';
import bridgeImage from '../../imgs/bridge-section-6.jpg';
import contactImage from '../../imgs/site-nav-contact.jpg';
import downloaderImage from '../../imgs/site-nav-downloader.jpg';
import examplesImage from '../../imgs/site-nav-examples.jpg';
import resumeImage from '../../imgs/site-nav-resume.jpg';
import syncerImage from '../../imgs/site-nav-syncer.jpg';


import { setHeaderHeight, setIsAnimating } from "../../actions";
import { checkForParentOfType } from "../../helpers";
import {
	NAVBAR_ACTIVE_CLASSNAME,
	NAVBAR_DONE_CLASSNAME,
	NAVBAR_IS_ANIMATING_CLASSNAME,
	ANIMATION_DURATION,
	MOBILE_BREAK_POINT_WIDTH,
} from "../constants";

const SiteNav = ({ isAnimating, setIsAnimating, match, previousUrl, viewPortWidth, sounds, setHeaderHeight }) => {
	const [ currentUrl, setCurrentUrl ] = useState(null);
	const navRef = useRef();
	// const noFilterPages = ['/bridge'];

	const hide = () => {
		navRef.current.classList.add("overflow--hidden");
	};

	const handleSound = (e) => {
		const isActive = e.currentTarget.className.match(/--active/i);
		const isMenu = e.target?.className?.match(/navbar__menu/i);
		const isNavbar = e.target.classList.contains('navbar');

		if (!isActive && isMenu) sounds.play('siteNavOpen');
		else if ((!isActive && !isNavbar) || (isActive && isMenu)) sounds.play('siteNavClose');
	}

	const onNavClick = (e) => {
		console.log('nav click------------------------------------------------');
		e.stopPropagation();
		const navBar = navRef.current;
		const isChildOfNavBar = checkForParentOfType(e.target, "nav", "navbar");

		if (!navBar) return;
		handleSound(e);

		if (isChildOfNavBar) navBar.classList.add("overflow--hidden");
		
		if (
			!navBar.classList?.contains(NAVBAR_ACTIVE_CLASSNAME) &&
			isChildOfNavBar
		) {
			navBar.classList.add("overflow--hidden");
			navBar.classList?.add(NAVBAR_ACTIVE_CLASSNAME);
			document.querySelector('#header').classList.add('z-index-highest')
			setIsAnimating(true);
		} else {
			navBar.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
			navBar.classList?.remove(NAVBAR_DONE_CLASSNAME);

			setTimeout(() => {
				document.querySelector('#header').classList.remove('z-index-highest')

			}, ANIMATION_DURATION);

			setIsAnimating(false);
		}
	};

	const onNavItemClick = (e) => {
		hide();
	};

	const onMouseEnter = (e) => {
		e.stopPropagation();
		if (
			!navRef.current ||
			!navRef.current?.classList.contains(NAVBAR_ACTIVE_CLASSNAME)
		) {
			navRef.current?.classList.add("overflow--hidden");
			return;
		} else if (
			navRef.current.classList.contains(NAVBAR_IS_ANIMATING_CLASSNAME) ||
			navRef.current.classList.contains(NAVBAR_DONE_CLASSNAME)
		) {
			navRef.current?.classList.remove("overflow--hidden");
		}
	};

	const setBodyStyle = (page) => {
		if (page === '') document.body.className = "body-background";
		else {
			document.body.className = `body-background ${page.slice(1)}-page`;
		}
	}

	useEffect(() => {
		const navbarContent = document.querySelector('.navbar__content');
		const header = document.querySelector('.header');
		const headerBoundingRect = header.getBoundingClientRect();

		let newTop = `calc(${headerBoundingRect.height}px)`;
		if (viewPortWidth > MOBILE_BREAK_POINT_WIDTH) {
			newTop = 'auto';
		}
		navbarContent.style.top = newTop;

		const headerHeight = document.querySelector('#header').getBoundingClientRect().height;
		setHeaderHeight(headerHeight);
	}, [viewPortWidth, setHeaderHeight])

	useEffect(() => {
		if (!currentUrl) return; 

		let docStyle = getComputedStyle(document.documentElement);
		const colorVarRoot = '--color-primary';
		const colorVarPages = ['', '/bridge', '/resume', '/csharp'];
		const colorVarNumbers = ['-1','-2','-3','-4'];
		// const colorVarHSL = ['-h', '-s', '-l'];

		const temp = colorVarPages.indexOf(currentUrl.slice(currentUrl.lastIndexOf('/')));
		const index = temp !== -1 ? temp : 0;
		setBodyStyle(colorVarPages[index]);
		const colorVarSuffix = colorVarPages[index].slice(1);
	
		for (let i = 0; i < colorVarNumbers.length; i++) {
			const colorVarNumber = colorVarNumbers[i];
			const colorVarToChange = `${colorVarRoot}${colorVarNumber}`;
			const colorVarTarget = `${colorVarRoot}${colorVarSuffix !== '' ? `-${colorVarSuffix}` : ''}${colorVarNumber}`;
			const targetValue = docStyle.getPropertyValue(colorVarTarget);
			document.documentElement.style.setProperty(colorVarToChange, targetValue);
		}
	}, [currentUrl])

	//When url changes
	useEffect(() => {
		if (!currentUrl || currentUrl !== match.url) {
			setCurrentUrl(match.url);
		}
	}, [match, currentUrl, previousUrl])

	//initial
	useEffect(() => {
		const onBodyClick = (e) => {
			const isNavClick = e.target?.classList?.contains(NAVBAR_ACTIVE_CLASSNAME)
				? true
				: false;
			if (!isNavClick) {
				navRef?.current?.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
				// navRef?.current?.classList?.add("overflow--hidden");
			}
			// root.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
		};
		document.body.addEventListener("click", onBodyClick);

		setTimeout(() => {
			const headerHeight = document.querySelector('#header').getBoundingClientRect().height;
			setHeaderHeight(headerHeight);
		}, 100);

		return (() => {
			document.body.removeEventListener("click", onBodyClick);
		});
	}, [setHeaderHeight]);

	useEffect(() => {
		const navBar = navRef.current;
		const resetAnimatingId = setTimeout(() => {
			navBar?.classList?.remove("navbar--isAnimating");
			navBar?.classList?.remove("overflow--hidden");
			if (isAnimating && navBar.classList?.contains(NAVBAR_ACTIVE_CLASSNAME)) {
				// root.classList?.add(NAVBAR_DONE_CLASSNAME);
				navBar.classList?.add(NAVBAR_DONE_CLASSNAME);
			} else {
				// root.classList?.remove(NAVBAR_DONE_CLASSNAME);
				navBar.classList?.remove(NAVBAR_DONE_CLASSNAME);
			}
		}, ANIMATION_DURATION * 1.2);
		navBar?.classList?.add("navbar--isAnimating");

		return () => {
			clearTimeout(resetAnimatingId);
		};
	}, [isAnimating]);

	return ReactDOM.createPortal(
		<nav
			ref={navRef}
			className="navbar z-index-navbar"
			onClick={onNavClick}>
			<div className="navbar__button" to="/">
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
			<div onClick={onNavClick} className="navbar__background"></div>
		</nav>,
		document.querySelector(".site-nav"),
	);
};

const mapStateToProps = (state, ownProps) => {
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
