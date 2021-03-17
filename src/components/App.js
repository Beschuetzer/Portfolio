
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from '../history';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Nav from './navbar/Nav';
import Footer from './Footer';
import "../css/style.css";


const App = () => {
	return (
        <Router history={history}>
            <Nav/>
            <main>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/projects" exact component={Projects} />
                    <Route path="/about" exact component={About} />
                    <Route path="/resume" exact component={Resume} />
                    <Route path="/contact" exact component={Contact} />

                </Switch>
            </main>
            {/* <Footer/> */}
        </Router>
    );
}

export default App;

    
