import React from 'react';
import ReactDOM from 'react-dom';
import NavListItem from './NavListItem';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnimating: false,
      animationId: null,
    }
    this.navRef = React.createRef();
    this.navbarActiveClassname = 'navbar--active';
    this.navbarMenuClassname = 'navbar__menu';
    this.animationDuration = 500;
  }

  hide = () => {
    this.navRef.current.classList.add('overflow--hidden');
  }

  componentDidMount() {
    document.body.addEventListener('click', this.onBodyClick);
  }

  componentDidUpdate() {
    console.log('update------------------------------------------------');
    clearTimeout(this.state.animationId);
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
    const navBar = this.navRef.current;
    e.stopPropagation();
    if (!navBar) return;
    navBar.classList?.toggle(this.navbarActiveClassname);

    if (!navBar.classList?.contains(this.navbarActiveClassname)) navBar.classList.add('overflow--hidden');
 
    const resetAnimatingId = setTimeout(() => {
      this.navRef.current?.classList?.remove('navbar--isAnimating');
    }, this.animationDuration);
    navBar.classList.add('navbar--isAnimating');

    this.setState({isAnimating: true, animationId: resetAnimatingId});
  }

  onNavItemClick = (e) => {
    // e.stopPropagation();
    console.log('click------------------------------------------------');
    this.hide();
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
            <NavListItem to="/about" label="About" onMouseEnter={this.onMouseEnter} onClick={this.onNavItemClick}/>
            <NavListItem 
              to="/works" 
              label="Experiences" 
              onMouseEnter={this.onMouseEnter} onClick={this.onNavItemClick}
              className="navbar__item navbar__dropdown-container flex align-center justify-content-center"
            >
              <div className="triangle-down"></div>
              <ul className="navbar__dropdown">
                <NavListItem to="/works/bridge" label="Bridge" onMouseEnter={this.onMouseEnter} onClick={this.onNavItemClick}/>
                <NavListItem to="/works/csharp" label="C#" onMouseEnter={this.onMouseEnter} onClick={this.onNavItemClick}/>
                <NavListItem to="/works/python" label="Python" onMouseEnter={this.onMouseEnter} onClick={this.onNavItemClick}/>
                <NavListItem to="/works/all" label="All" onMouseEnter={this.onMouseEnter} onClick={this.onNavItemClick}/>
              </ul>
            </NavListItem>
            <NavListItem to="/resume" label="Resume" onMouseEnter={this.onMouseEnter} onClick={this.onNavItemClick}/>
            <NavListItem to="/contact" label="Contact" onMouseEnter={this.onMouseEnter} onClick={this.onNavItemClick}/>
          </ul>
        </div>
      </nav>,
      document.querySelector('#header')
    );
  }
}

export default Nav;