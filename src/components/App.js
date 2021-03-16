
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from '../history';

import Home from './pages/Home';
import Personal from './pages/Personal';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import "../css/style.css";


const App = () => {
	return (
        <div className="grid">
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/projects" exact component={Projects} />
                <Route path="/personal" exact component={Personal} />
                <Route path="/resume" exact component={Resume} />
            </Switch>
        </Router>
        </div>
    );
}

export default App;

    
