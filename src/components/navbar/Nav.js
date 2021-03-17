import React from 'react';
import ReactDOM from 'react-dom';
import NavListItem from './NavListItem';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.navRef = React.createRef();
    this.navbarActiveClassname = 'navbar--active';
    this.navbarMenuClassname = 'navbar__menu';
    this.animationDuration = 500;
  }

  componentDidMount() {
    document.body.addEventListener('click', this.onBodyClick);
  }

  onBodyClick = (e) => {
    console.dir(e.target);
    const isNavClick = e.target?.classList?.contains(this.navbarActiveClassname) ? true : false;
    if (!isNavClick) {
      this.navRef?.current?.classList?.remove(this.navbarActiveClassname);
      this.navRef?.current?.classList?.add('overflow--hidden');
    }
  }

  onNavClick = (e) => {
    e.stopPropagation();
    let waitDuration =  this.navRef?.current?.classList?.contains('overflow--hidden') ? 1000 : 0;
    this.navRef?.current?.classList?.toggle(this.navbarActiveClassname);
    setTimeout(() => {
      // this.navRef?.current?.classList?.toggle('overflow--hidden');
    }, waitDuration);
  }

  onMouseEnter = (e) => {
    console.log('enter------------------------------------------------');
    this.navRef.current.classList.remove('overflow--hidden');
  }

  render() {
    return ReactDOM.createPortal(
      <nav ref={this.navRef} className="navbar overflow--hidden" onClick={this.onNavClick}>
        <div className="navbar__button" to="/">
          <div className="navbar__menu">
            <div className="navbar__menu-bar"></div>
          </div>
        </div>
        <div className="navbar__content">
          <ul className="navbar__list">
            <NavListItem to="/about" label="About" onMouseEnter={this.onMouseEnter}/>
            <NavListItem 
              to="/about" 
              label="About" 
              onMouseEnter={this.onMouseEnter}
              className="navbar__item navbar__dropdown-container flex align-center justify-content-center"
            >
              <div className="triangle-down"></div>
              <ul className="navbar__dropdown">
                <NavListItem to="/work/bridge" label="Bridge" onMouseEnter={this.onMouseEnter}/>
                <NavListItem to="/work/csharp" label="C#" onMouseEnter={this.onMouseEnter}/>
                <NavListItem to="/work/python" label="Python" onMouseEnter={this.onMouseEnter}/>
                <NavListItem to="/work/all" label="All" onMouseEnter={this.onMouseEnter}/>
              </ul>
            </NavListItem>
            <NavListItem to="/resume" label="Resume" onMouseEnter={this.onMouseEnter}/>
            <NavListItem to="/contact" label="Contact" onMouseEnter={this.onMouseEnter}/>
          </ul>
        </div>
      </nav>,
      document.querySelector('#header')
    );
  }
}

export default Nav;