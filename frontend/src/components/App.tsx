import React from "react";
import { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect, RootStateOrAny } from "react-redux";
import history from "../history";
import { Howl } from "howler";

import {
	MOBILE_BREAK_POINT_WIDTH,
} from "./constants";

import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import PlaylistSyncer from "../pages/examples/csharp/PlaylistSyncer";
import Downloader from "../pages/examples/csharp/Downloader";
import Bridge from "../pages/examples/bridge/Bridge";
import Autobid from "../pages/examples/autobid/Autobid";
import Resume from "../pages/resume/Resume";
import SiteNav from "./navbar/SiteNav/SiteNav";
import PageNav from "./navbar/PageNav/PageNav";
import NavToggler from "./navbar/NavToggler";
import "../css/style.css";
import GithubButton from "./GithubButton";
import {
	setIsAnimating,
	setIsMobile,
	setViewPortWidth,
	setSounds,
} from "../actions";
import soundsSpriteMp3 from "../sounds/soundsSprite.mp3";
import soundsSpriteOgg from "../sounds/soundsSprite.ogg";
import { keypressHandler } from "./utils";

interface AppProps {
	isMobile: boolean,
	isAnimating: boolean,
	setIsMobile: (value: boolean, windowWidth: number) => void,
	setIsAnimating: (value: boolean) => void,
	setViewPortWidth: (value: number) => void,
	setSounds: (value: {}) => void,
}

const App: React.FC<AppProps> = ({
	isMobile,
	setIsMobile,
	isAnimating,
	setIsAnimating,
	setViewPortWidth,
	setSounds,
}) => {
	const mobileBreakPointWidth = MOBILE_BREAK_POINT_WIDTH;
	setIsMobile(window.innerWidth <= mobileBreakPointWidth, window.innerWidth);

	//setup window resize listener
	useEffect(() => {
		const windowResize = (e: Event) => {
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

		window.addEventListener("resize", windowResize);
		window.addEventListener("keydown", keypressHandler.bind(null, isAnimating, setIsAnimating));

		return () => {
			window.removeEventListener("resize", windowResize);
			window.removeEventListener("keydown", keypressHandler.bind(null, isAnimating, setIsAnimating));
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
			volume: 0.1,
			sprite: {
				doorFast: [0, 1500],
				doorNormal: [1500, 1000],
				sonicBoom: [2500, 1000],
				siteNavOpen: [3500, 1000],
				siteNavClose: [4500, 1000],
			},
		});
		setSounds(sounds);
	}, [setSounds]);

	return (
		<Router history={history}>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/examples/bridge" exact component={Bridge} />
				<Route path="/examples/downloader" exact component={Downloader} />
				<Route
					path="/examples/playlist-syncer"
					exact
					component={PlaylistSyncer}
				/>
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

const mapStateToProps = (state: RootStateOrAny) => {
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
})(App as any);