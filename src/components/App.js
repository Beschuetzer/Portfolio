
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from '../history';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import SiteNav from './navbar/SiteNav';
import Footer from './Footer';
import "../css/style.css";
import GithubButton from "./GithubButton";


const App = () => {
	return (
        <Router history={history}>
            <SiteNav/>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/works" exact component={Projects} />
                <Route path="/about" exact component={About} />
                <Route path="/resume" exact component={Resume} />
                <Route path="/contact" exact component={Contact} />

            </Switch>
            <GithubButton/>
            {/* <Footer/> */}
        </Router>
    );
}

export default App;

    
