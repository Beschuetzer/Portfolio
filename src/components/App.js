import React from "react";
import { useEffect } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import history from "../history";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Resume from "./pages/resume/Resume";
import SiteNav from "./navbar/SiteNav";
import PageNav from "./navbar/PageNav";
import NavToggler from "./navbar/NavToggler";
import Footer from "./Footer";
import "../css/style.css";
import GithubButton from "./GithubButton";
import { setIsAnimating, setIsMobile } from "../actions";
import { NAVBAR_ACTIVE_CLASSNAME, NAVBAR_DONE_CLASSNAME } from './constants';

const App = ({isMobile, setIsMobile, isAnimating, setIsAnimating}) => {
  const mobileBreakPointWidth = 1100;
  setIsMobile(window.innerWidth <= mobileBreakPointWidth);
  
  //setup window resize listener
  useEffect(() => {
		const windowResize = (e) => {
      if (window.innerWidth <= mobileBreakPointWidth && !isMobile){
        setIsMobile(true);
      }
      else if (window.innerWidth > mobileBreakPointWidth && isMobile){
        setIsMobile(false);
      }
    }
  
		const keypressHandler = (e) => {
			switch (e.key) {
				case 'a':
					const navbar = document.querySelector('.navbar');
					const root = document.querySelector('#root');
					setIsAnimating(!isAnimating);
					if (isAnimating) {
						navbar?.classList?.add(NAVBAR_ACTIVE_CLASSNAME);
						root?.classList?.add(NAVBAR_ACTIVE_CLASSNAME);
					}
					else {
						navbar?.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
						navbar?.classList?.remove(NAVBAR_DONE_CLASSNAME);
						navbar?.classList?.add('overflow--hidden');
						root?.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);

					}
          break;
				case 'b':
					history.push('/about');
					break;
				case 'c': 
					history.push('/contact');
					break;
				case 'e': case 'w':
					history.push('/works');
					break;
				case 'r':
					history.push('/resume');
					break;
				default:
					break;
			}
		};

    window.addEventListener('resize', windowResize);
		window.addEventListener("keydown", keypressHandler);

		return (() => {
      window.removeEventListener('resize', windowResize);
      window.removeEventListener('keydown', keypressHandler);
    });

  }, [isMobile, setIsMobile, mobileBreakPointWidth, isAnimating, setIsAnimating]);

	return (
		<Router history={history}>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/works" exact component={Projects} />
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

const mapStateToProps = (state, ownProps) => {
	return {
		isAnimating: state.general.isAnimating,
		isMobile: state.general.isMobile,
	}
}

export default connect(mapStateToProps, {
	setIsAnimating,
	setIsMobile,
})(App);
