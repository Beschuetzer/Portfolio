import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

import { SiteNav } from "./navbar/SiteNav/SiteNav";
import { PageNav } from "./navbar/PageNav/PageNav";
import { NavToggler } from "./navbar/NavToggler";
import "../css/style.css";
import { GithubButton } from "./GithubButton";
import {
	setIsMobile,
	setViewPortWidth,
	setSounds,
} from "../actions";
import soundsSpriteMp3 from "../sounds/soundsSprite.mp3";
import soundsSpriteOgg from "../sounds/soundsSprite.ogg";
import { keypressHandler } from "./utils";
import { AudioPlayer } from "./AudioPlayer/AudioPlayer";
import { RootState } from "../reducers";
import { BigFive, AutoBid, Bridge, About, BridgeDemo, Downloader, PlaylistSyncer, ReplayViewer, Home, Resume } from "../pages/";
import { LoadedSounds } from "../reducers/soundsReducer";

interface AppProps {}

export const App: React.FC<AppProps> = ({
}) => {
	const dispatch = useDispatch();
	const isMobile = useSelector((state: RootState) => state.general.isMobile);
	const mobileBreakPointWidth = MOBILE_BREAK_POINT_WIDTH;
	dispatch(setIsMobile(window.innerWidth <= mobileBreakPointWidth, window.innerWidth));

	//setup window resize listener
	useEffect(() => {
		const windowResize = (e: Event) => {
			if (window.innerWidth <= mobileBreakPointWidth && !isMobile) {
				const newValue = `--bridge-gradient-direction: to bottom`;
				document.documentElement.style.cssText += newValue;
				return dispatch(setIsMobile(true, window.innerWidth));
			} else if (window.innerWidth > mobileBreakPointWidth && isMobile) {
				const newValue = `--bridge-gradient-direction: to right`;
				document.documentElement.style.cssText += newValue;
				return dispatch(setIsMobile(false, window.innerWidth));
			}
			dispatch(setViewPortWidth(window.innerWidth));
			return;
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
		dispatch(setSounds(sounds as unknown as LoadedSounds));
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
				<Route path={AUTO_BID_URL} exact component={AutoBid} />
				<Route path={ABOUT_URL} exact component={About} />
				<Route path={RESUME_URL} exact component={Resume} />
				<Route path={PERSONALITY_URL} exact component={BigFive} />
				<Route path="*" exact component={Home} />
			</Switch>
			<Route path="*" exact component={NavToggler} />
			<Route path="*" exact component={PageNav} />
			<Route path="*" exact component={SiteNav} />
			<Route path="*" exact component={AudioPlayer} />
			<Route path="*" exact component={GithubButton} />
			{/* <Footer/> */}
		</Router>
	);
};