
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import "../css/style.css";

const App = () => {
	return (
    <div className="grid">
      <Router history={history}>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
      </Router>
    </div>
}

export default App;

    
