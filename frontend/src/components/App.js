import React from "react";
import { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import history from "../history";
import Howler from 'howler';

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Examples from "./pages/examples/Examples";
import CSharp from "./pages/examples/CSharp";
import Bridge from "./pages/examples/Bridge/Bridge";
import Autobid from "./pages/examples/Autobid";
import Resume from "./pages/resume/Resume";
import SiteNav from "./navbar/SiteNav";
import PageNav from "./navbar/PageNav";
import NavToggler from "./navbar/NavToggler";
import "../css/style.css";
import GithubButton from "./GithubButton";
import { setIsAnimating, setIsMobile, setViewPortWidth } from "../actions";
import { NAVBAR_ACTIVE_CLASSNAME, NAVBAR_DONE_CLASSNAME } from "./constants";
import doorSpriteMp3 from '../../sounds/doorSprite.mp3'
import doorSpriteOgg from '../../sounds/doorSprite.ogg'

const App = ({ isMobile, setIsMobile, isAnimating, setIsAnimating, setViewPortWidth }) => {
	const mobileBreakPointWidth = 1100;
	setIsMobile(window.innerWidth <= mobileBreakPointWidth, window.innerWidth);

	//setup window resize listener
	useEffect(() => {
		const windowResize = (e) => {
			if (window.innerWidth <= mobileBreakPointWidth && !isMobile) {
				return setIsMobile(true, window.innerWidth);
			} else if (window.innerWidth > mobileBreakPointWidth && isMobile) {
				return setIsMobile(false, window.innerWidth);
			}
			return setViewPortWidth(window.innerWidth);
		};

		const keypressHandler = (e) => {
			switch (e.key) {
				case "a":
					const navbar = document.querySelector(".navbar");
					const root = document.querySelector("#root");
					setIsAnimating(!isAnimating);
					if (isAnimating) {
						navbar?.classList?.add(NAVBAR_ACTIVE_CLASSNAME);
						root?.classList?.add(NAVBAR_ACTIVE_CLASSNAME);
					} else {
						navbar?.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
						navbar?.classList?.remove(NAVBAR_DONE_CLASSNAME);
						navbar?.classList?.add("overflow--hidden");
						root?.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
					}
					break;
				case "b":
					history.push("/about");
					break;
				case "c":
					history.push("/contact");
					break;
				case "e":
				case "w":
					history.push("/examples");
					break;
				case "r":
					history.push("/resume");
					break;
				default:
					break;
			}
		};

		window.addEventListener("resize", windowResize);
		window.addEventListener("keydown", keypressHandler);

		return () => {
			window.removeEventListener("resize", windowResize);
			window.removeEventListener("keydown", keypressHandler);
		};
	}, [
		isMobile,
		setIsMobile,
		mobileBreakPointWidth,
		isAnimating,
		setIsAnimating,
		setViewPortWidth,
	]);

	//Loading Sounds
	useEffect(() => {
		const Howl = new Howler();
		sounds = new Howl({
      src: [doorSpriteMp3, doorSpriteOgg],
      sprite: {
        doorNormal: [0, 1063],
        doorFast: [2000, 1063],
      }
	}, [])

	return (
		<Router history={history}>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/examples" exact component={Examples} />
				<Route path="/examples/bridge" exact component={Bridge} />
				<Route path="/examples/csharp" exact component={CSharp} />
				<Route path="/examples/autobid" exact component={Autobid} />
				<Route path="/about" exact component={About} />
				<Route path="/resume" exact component={Resume} />
				<Route path="/contact" exact component={Contact} />
			</Switch>
			<Route path="*" exact component={NavToggler} />
			<Route path="*" exact component={PageNav} />
			<Route path="*" exact component={SiteNav} />
			<Route path="*" exact component={GithubButton} />
			{/* <Footer/> */}
		</Router>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		isAnimating: state.general.isAnimating,
		isMobile: state.general.isMobile,
	};
};

export default connect(mapStateToProps, {
	setIsAnimating,
	setIsMobile,
	setViewPortWidth,
})(App);
