import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';




class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.navRef = React.createRef();
    this.navbarActiveClassname = 'navbar--active';
    this.navbarMenuClassname = 'navbar__menu';
  }

  componentDidMount() {
    document.body.addEventListener('click', this.onBodyClick);
  }

  onBodyClick = (e) => {
    console.dir(e.target);
    const isNavClick = e.target?.classList?.contains(this.navbarActiveClassname) ? true : false;
    if (!isNavClick) {
      this.navRef?.current?.classList?.remove(this.navbarActiveClassname);
    }
  }

  onNavClick = (e) => {
    e.stopPropagation();
    this.navRef?.current?.classList?.toggle(this.navbarActiveClassname);
  }

  render() {
    return ReactDOM.createPortal(
      <nav ref={this.navRef} className="navbar" onClick={this.onNavClick}>
        <div className="navbar__button" to="/">
          {/* <img className="navbar__logo" src="../../img/logo.jpg" alt="Logo"/> */}
          <div className="navbar__menu">
            <div className="navbar__menu-bar"></div>
          </div>
        </div>
        <div className="navbar__content">
          <ul className="navbar__list">
            <li className="navbar__item">
              <Link className="navbar__link" to="/about">About</Link>
            </li>
            <li className="navbar__item navbar__dropdown-container flex align-center justify-content-center">
              <Link className="navbar__link" to="/projects">Projects</Link>
              <div className="triangle-down"></div>
              <ul className="navbar__dropdown">
                <li className="navbar__item">
                  <Link className="navbar__link" to="/projects/1">Bridge</Link>
                </li>
                <li className="navbar__item">
                  <Link className="navbar__link" to="/projects/2">Python</Link>
                </li>
                <li className="navbar__item">
                  <Link className="navbar__link" to="/projects/3">C#</Link>
                </li>
              </ul>
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