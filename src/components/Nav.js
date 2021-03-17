import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

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
    return ReactDOM.createPortal(
      <nav className="navbar">
        <Link className="navbar__button" to="/">
          <img className="navbar__logo" src="../../img/logo.jpg" alt="Logo"/>
        </Link>
        <div className="navbar__content">
          <ul className="navbar__list">
            <li className="navbar__item">
              <Link className="navbar__link" to="/about">About</Link>
            </li>
            <li className="navbar__item flex align-center justify-content-center">
              <Link className="navbar__link" to="/projects">Projects</Link>
              <div className="triangle-down"></div>
            </li>
            <li data-a className="navbar__item">
              <Link className="navbar__link" to="/resume">Resume</Link>
            </li>
            <li className="navbar__item">
              <Link className="navbar__link" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>,
      document.querySelector('#header')
    );
  }
}

export default Nav;