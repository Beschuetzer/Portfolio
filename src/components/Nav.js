import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //initializing props to keep track of here
    };
    //you have to create a ref for each element you are planning to interact with in the DOM for each component
    this.imageRef = React.createRef();
  }
  render() {
    return (
      <nav className="navbar">
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link className="navbar__link" to="/">Home</Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link" to="/about">About</Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link" to="/projects">Projects</Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link" to="/resume">Resume</Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link" to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;