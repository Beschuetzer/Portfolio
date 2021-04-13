import React from "react";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import NavListItem from "./NavListItem";


import { setIsAnimating } from "../../actions";
import { checkForParentOfType } from "../../helpers";
import {
	NAVBAR_ACTIVE_CLASSNAME,
	NAVBAR_DONE_CLASSNAME,
	NAVBAR_IS_ANIMATING_CLASSNAME,
	ANIMATION_DURATION,
} from "../constants";

const SiteNav = ({ isAnimating, setIsAnimating, match, previousUrl, viewPortWidth }) => {
	const [ currentUrl, setCurrentUrl ] = useState(null);
	const navRef = useRef();
	const root = document.querySelector("#root");

	const hide = () => {
		navRef.current.classList.add("overflow--hidden");
	};

	const onNavClick = (e) => {
		e.stopPropagation();
		const navBar = navRef.current;
		const isChildOfNavBar = checkForParentOfType(e.target, "nav", "navbar");

		if (!navBar) return;
		navBar.classList.add("overflow--hidden");

		if (
			!navBar.classList?.contains(NAVBAR_ACTIVE_CLASSNAME) &&
			isChildOfNavBar
		) {
			root.classList?.add(NAVBAR_ACTIVE_CLASSNAME);
			navBar.classList?.add(NAVBAR_ACTIVE_CLASSNAME);
			setIsAnimating(true);
		} else {
			root.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
			navBar.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
			navBar.classList?.remove(NAVBAR_DONE_CLASSNAME);
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
		console.log('setting width------------------------------------------------');
		const navbarContent = document.querySelector('.navbar__content');
		const header = document.querySelector('.header');
		const headerBoundingRect = header.getBoundingClientRect();

		let newTop = `calc(${headerBoundingRect.height}px)`;
		if (viewPortWidth > 1100) {
			newTop = 'auto';
		}
		navbarContent.style.top = newTop;
	}, [viewPortWidth])

	useEffect(() => {
		if (!currentUrl) return; 

		let docStyle = getComputedStyle(document.documentElement);
		const colorVarRoot = '--color-primary';
		const colorVarPages = ['', '/bridge', '/resume', '/csharp'];
		const colorVarNumbers = ['-1','-2','-3','-4'];
		const colorVarHSL = ['-h', '-s', '-l'];

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

			let targetHSLValues =  targetValue.replace('hsl(', '').replace(')', '').trim().split(', ');
			// for (let j = 0; j < colorVarHSL.length; j++) {
			// 	const hslSuffix = colorVarHSL[j];
			// 	const colorVarToChangeWithSuffix = colorVarToChange + hslSuffix;
			// 	document.documentElement.style.setProperty(colorVarToChangeWithSuffix, targetHSLValues[j]);
			// }
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
				navRef?.current?.classList?.add("overflow--hidden");
			}
			root.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
		};
		document.body.addEventListener("click", onBodyClick);

		return (() => {
			document.body.removeEventListener("click", onBodyClick);
		})
	}, [root]);

	useEffect(() => {
		const navBar = navRef.current;
		const resetAnimatingId = setTimeout(() => {
			navBar?.classList?.remove("navbar--isAnimating");
			if (isAnimating && navBar.classList?.contains(NAVBAR_ACTIVE_CLASSNAME)) {
				root.classList?.add(NAVBAR_DONE_CLASSNAME);
				navBar.classList?.add(NAVBAR_DONE_CLASSNAME);
			} else {
				root.classList?.remove(NAVBAR_DONE_CLASSNAME);
				navBar.classList?.remove(NAVBAR_DONE_CLASSNAME);
			}
		}, ANIMATION_DURATION * 1.1);
		navBar?.classList?.add("navbar--isAnimating");

		return () => {
			clearTimeout(resetAnimatingId);
		};
	}, [isAnimating, root]);

	return ReactDOM.createPortal(
		<nav
			ref={navRef}
			className="navbar z-index-navbar overflow--hidden"
			onClick={onNavClick}>
			<div className="navbar__button" to="/">
				<div className="navbar__menu">
					<div className="navbar__menu-bar"></div>
				</div>
			</div>
			<div className="navbar__content">
				<ul className="navbar__list">
					<NavListItem
						to="/about"
						label="About"
						onMouseEnter={onMouseEnter}
						onClick={onNavItemClick}
					/>

					<NavListItem
						to="/resume"
						label="Resume"
						onMouseEnter={onMouseEnter}
						onClick={onNavItemClick}
					/>
					<NavListItem
						to="/examples"
						label="Examples"
						onMouseEnter={onMouseEnter}
						onClick={onNavItemClick}
						className="navbar__item navbar__dropdown-container flex align-center justify-content-center"
						triangle={<div className="triangle-down"></div>}>
						<ul className="navbar__dropdown">
							<NavListItem
								to="/examples/bridge"
								label="Bridge"
								onMouseEnter={onMouseEnter}
								onClick={onNavItemClick}
							/>
							<NavListItem
								to="/examples/csharp"
								label="C#"
								onMouseEnter={onMouseEnter}
								onClick={onNavItemClick}
							/>
							<NavListItem
								to="/examples/python"
								label="Python"
								onMouseEnter={onMouseEnter}
								onClick={onNavItemClick}
							/>
							<NavListItem
								to="/examples"
								label="All"
								onMouseEnter={onMouseEnter}
								onClick={onNavItemClick}
							/>
						</ul>
					</NavListItem>
					<NavListItem
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
	};
};

export default connect(mapStateToProps, {
	setIsAnimating,
})(SiteNav);
