import React from "react";
import { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import history from "../history";
import {Howl} from 'howler';

import {
	MOBILE_BREAK_POINT_WIDTH,
} from './constants';

import Home from "../pages/Home/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Examples from "../pages/examples/Examples";
import PlaylistSyncer from "../pages/examples/csharp/PlaylistSyncer";
import Downloader from "../pages/examples/csharp/Downloader";
import Bridge from "../pages/examples/Bridge/Bridge";
import Autobid from "../pages/examples/Autobid";
import Resume from "../pages/resume/Resume";
import SiteNav from "./Navbar/SiteNav";
import PageNav from "./Navbar/PageNav";
import NavToggler from "./Navbar/NavToggler";
import "../css/style.css";
import GithubButton from "./GithubButton";
import { setIsAnimating, setIsMobile, setViewPortWidth, setSounds } from "../actions";
import { NAVBAR_ACTIVE_CLASSNAME, NAVBAR_DONE_CLASSNAME } from "./Navbar/constants";
import soundsSpriteMp3 from '../sounds/soundsSprite.mp3';
import soundsSpriteOgg from '../sounds/soundsSprite.ogg';

const App = ({ isMobile, setIsMobile, isAnimating, setIsAnimating, setViewPortWidth, setSounds }) => {
	const mobileBreakPointWidth = MOBILE_BREAK_POINT_WIDTH;
	setIsMobile(window.innerWidth <= mobileBreakPointWidth, window.innerWidth);

	//setup window resize listener
	useEffect(() => {
		const windowResize = (e) => {
			if (window.innerWidth <= mobileBreakPointWidth && !isMobile) {
				const newValue = `--bridge-gradient-direction: to bottom`;
				document.documentElement.style.cssText += newValue;
				return setIsMobile(true, window.innerWidth);
			} else if (window.innerWidth > mobileBreakPointWidth && isMobile) {
				const newValue = `--bridge-gradient-direction: to right`;
				document.documentElement.style.cssText += newValue;
				return setIsMobile(false, window.innerWidth);
			}
			return setViewPortWidth(window.innerWidth);
		};

		const keypressHandler = (e) => {
			if (!e.altKey || !e.ctrlKey) return;
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
				
				case "c":
					history.push("/contact");
					break;
				case "e":
				case "w":
					history.push("/examples");
					break;
				case "b":
					history.push("/examples/bridge");
					break;
				case "s":
					history.push("/examples/csharp");
					break;
				case "u":
					history.push("/examples/autoBid");
					break;
				case "r":
					history.push("/resume");
					break;
				case "t":
					history.push("/about");
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

	//Loading Sounds, etc
	useEffect(() => {
		const sounds = new Howl({
      src: [soundsSpriteMp3, soundsSpriteOgg],
			volume: .1,
      sprite: {
        doorFast: [0, 1500],
        doorNormal: [1500, 1000],
        sonicBoom: [2500, 1000],
        siteNavOpen: [3500, 1000],
        siteNavClose: [4500, 1000],
      },
		});
		setSounds(sounds);

	}, [setSounds])

	return (
		<Router history={history}>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/examples" exact component={Examples} />
				<Route path="/examples/bridge" exact component={Bridge} />
				<Route path="/examples/downloader" exact component={Downloader} />
				<Route path="/examples/playlist-syncer" exact component={PlaylistSyncer} />
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
	setSounds,
})(App);
