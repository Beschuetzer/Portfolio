import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import history from "../history";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Resume from "./pages/resume/Resume";
import SiteNav from "./navbar/SiteNav";
import Footer from "./Footer";
import "../css/style.css";
import GithubButton from "./GithubButton";
import { setIsAnimating } from "../actions";
import { NAVBAR_ACTIVE_CLASSNAME } from './constants';

class App extends React.Component {
	componentDidMount() {
		const keypressHandler = (e) => {
			switch (e.key) {
				case 'a':
					const navbar = document.querySelector('.navbar');
					const root = document.querySelector('#root');
					if (this.props.isAnimating) navbar?.classList?.add('navbar--active');
					else navbar?.classList?.remove('navbar--active');
					this.props.setIsAnimating(!this.props.isAnimating);
          break;
				default:
					break;
			}
		};
		window.addEventListener("keydown", keypressHandler);
	}

	render() {
		return (
			<Router history={history}>
				<SiteNav />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/works" exact component={Projects} />
					<Route path="/about" exact component={About} />
					<Route path="/resume" exact component={Resume} />
					<Route path="/contact" exact component={Contact} />
				</Switch>
				<GithubButton />
				{/* <Footer/> */}
			</Router>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		isAnimating: state.isAnimating,
	}
}

export default connect(mapStateToProps, {
	setIsAnimating,
})(App);
