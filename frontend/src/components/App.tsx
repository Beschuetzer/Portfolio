import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import {
	ABOUT_URL,
	AUTO_BID_URL,
	BRIDGE_DEMO_URL,
	BRIDGE_GRADIENT_DIRECTION_CUSTOM_PROPERTY_NAME,
	BRIDGE_URL,
	DOWNLOADER_URL,
	MOBILE_BREAK_POINT_WIDTH, PERSONALITY_URL, PLAYLIST_SYNCER_URL, REPLAY_VIEWER_URL, RESUME_URL,
} from "./constants";

import { SiteNav } from "./navbar/SiteNav";
import { PageNav } from "./navbar/PageNav";
import { NavToggler } from "./navbar/NavToggler";
import "../css/style.css";
import { GithubButton } from "./GithubButton";
import { AudioPlayer } from "./AudioPlayer/AudioPlayer";
import { BigFive, AutoBid, Bridge, About, BridgeDemo, Downloader, PlaylistSyncer, ReplayViewer, Home, Resume } from "../pages";
import { useAppDispatch, useAppSelector } from "../hooks";
import { isMobileSelector, setIsMobile, setViewPortWidth } from "../slices/generalSlice";
import { useSetHeaderCssStyle } from "../hooks/useSetHeaderCssStyle";
import { keypressHandler } from "../helpers";
import { Test } from "../pages/examples/csharp/Test";

type AppProps = {}

export const App: React.FC<AppProps> = ({
}) => {
	const dispatch = useAppDispatch();
	const isMobile = useAppSelector(isMobileSelector);
	const mobileBreakPointWidth = MOBILE_BREAK_POINT_WIDTH;

	useSetHeaderCssStyle();
	useEffect(() => {
		dispatch(setIsMobile({isMobile: window.innerWidth <= mobileBreakPointWidth, viewPortWidth: window.innerWidth}));
	}, [dispatch, setIsMobile, mobileBreakPointWidth])

	//setup window resize listener
	useEffect(() => {
		const windowResize = (e: Event) => {
			if (window.innerWidth <= mobileBreakPointWidth && !isMobile) {
				const newValue = `${BRIDGE_GRADIENT_DIRECTION_CUSTOM_PROPERTY_NAME}: to bottom`;
				document.documentElement.style.cssText += newValue;
				return dispatch(setIsMobile({isMobile: true, viewPortWidth: window.innerWidth}));
			} else if (window.innerWidth > mobileBreakPointWidth && isMobile) {
				const newValue = `${BRIDGE_GRADIENT_DIRECTION_CUSTOM_PROPERTY_NAME}: to right`;
				document.documentElement.style.cssText += newValue;
				return dispatch(setIsMobile({isMobile: false,viewPortWidth:  window.innerWidth}));
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
		dispatch,
		isMobile,
		setIsMobile,
		mobileBreakPointWidth,
		setViewPortWidth,
	]);

	// //Loading Sounds, etc
	// useEffect(() => {
	// 	const sounds = new Howl({
	// 		src: [soundsSpriteMp3, soundsSpriteOgg],
	// 		volume: 0.1,
	// 		sprite: {
	// 			doorFast: [0, 1500],
	// 			doorNormal: [1500, 1000],
	// 			sonicBoom: [2500, 1000],
	// 			siteNavOpen: [3500, 1000],
	// 			siteNavClose: [4500, 1000],
	// 		},
	// 	});
	// 	dispatch(setSounds(sounds as unknown as LoadedSounds));
	// }, [setSounds]);

	return (
		<Router history={history}>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/test" exact component={Test} />
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