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
	setHeaderHeight,
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
	setHeaderHeight: (value: {}) => void,
}

interface AppState {
	isMobile: boolean,
	isAnimating: boolean,
}

class App extends React.PureComponent<AppProps, AppState> {
	setIsMobile: (value: boolean, windowWidth: number) => void;
	setIsAnimating: (value: boolean) => void;
	setViewPortWidth: (value: number) => void;
	setHeaderHeight: (value: number) => void;
	setSounds: (value: {}) => void;

	constructor(props: any) {

		super(props);
		this.setViewPortWidth = this.props.setViewPortWidth;
		this.setIsMobile = this.props.setIsMobile;
		this.setIsAnimating = this.props.setIsAnimating;
		this.setSounds = this.props.setSounds;
		this.setHeaderHeight = this.props.setHeaderHeight;
		this.state = {
			isMobile: window.innerWidth <= MOBILE_BREAK_POINT_WIDTH,
			isAnimating: false,
		
		}

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


		this.props.setIsMobile(window.innerWidth <= MOBILE_BREAK_POINT_WIDTH, window.innerWidth);
		this.props.setSounds(sounds);
	}

	componentDidMount() {
		window.addEventListener("keydown", keypressHandler.bind(null, this.state.isAnimating, this.setIsAnimating));
		window.addEventListener("resize", this.windowResize);
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", keypressHandler.bind(null, this.state.isAnimating, this.setIsAnimating));
		window.removeEventListener("resize", this.windowResize);
	}

	componentDidUpdate(prevProps: any, prevState: any) {
		if (prevProps.isAnimating !== this.props.isAnimating) {
			console.log('this.props.isAnimating =', this.props.isAnimating);
			this.setState({isAnimating: this.props.isAnimating})
		}
	}

	windowResize = (e: Event) => {
		if (window.innerWidth <= MOBILE_BREAK_POINT_WIDTH && !this.state.isMobile) {
			const newValue = `--bridge-gradient-direction: to bottom`;
			document.documentElement.style.cssText += newValue;
			this.setIsMobile(true, window.innerWidth);
		} else if (window.innerWidth > MOBILE_BREAK_POINT_WIDTH && this.state.isMobile) {
			const newValue = `--bridge-gradient-direction: to right`;
			document.documentElement.style.cssText += newValue;
			this.setIsMobile(false, window.innerWidth);
		}
		this.setViewPortWidth(window.innerWidth);
		this.setHeaderHeight(document.querySelector('#header')!.getBoundingClientRect().height);
	};



	render() {
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
	}
};

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		isAnimating: state.general.isAnimating,
		isMobile: state.general.isMobile,
	};
};

export default connect(mapStateToProps, {
	setIsAnimating,
	setHeaderHeight,
	setIsMobile,
	setViewPortWidth,
	setSounds,
})(App as any);
