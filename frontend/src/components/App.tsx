import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect, RootStateOrAny } from "react-redux";
import history from "../history";
import { Howl } from "howler";

import {
	ABOUT_URL,
	AUTO_BID_URL,
	BRIDGE_DEMO_URL,
	BRIDGE_URL,
	DOWNLOADER_URL,
	MOBILE_BREAK_POINT_WIDTH, PERSONALITY_URL, PLAYLIST_SYNCER_URL, REPLAY_VIEWER_URL, RESUME_URL,
} from "./constants";

import Home from "../pages/home/Home";
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
import ReplayViewer from "../pages/examples/csharp/ReplayViewer";
import About from "../pages/examples/csharp/About";
import BridgeDemo from "../pages/examples/csharp/BridgeDemo";
import BigFive from "../pages/examples/csharp/BigFive/BigFive";

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
				<Route path={BRIDGE_URL} exact component={Bridge} />
				<Route path={BRIDGE_DEMO_URL} exact component={BridgeDemo} />
				<Route path={DOWNLOADER_URL} exact component={Downloader} />
				<Route
					path={PLAYLIST_SYNCER_URL}
					exact
					component={PlaylistSyncer}
				/>
				<Route path={REPLAY_VIEWER_URL} exact component={ReplayViewer} />
				<Route path={AUTO_BID_URL} exact component={Autobid} />
				<Route path={ABOUT_URL} exact component={About} />
				<Route path={RESUME_URL} exact component={Resume} />
				<Route path={PERSONALITY_URL} exact component={BigFive} />
				<Route path="*" exact component={Home} />
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
