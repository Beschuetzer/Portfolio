import React from 'react';
import {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import NavListItem from './NavListItem';

const SiteNav = (props) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const navRef = useRef();
  const navbarActiveClassname = 'navbar--active';
  const animationDuration = 500;
  const root = document.querySelector('#root');

  const hide = () => {
    navRef.current.classList.add('overflow--hidden');
  }

  const onBodyClick = (e) => {
    const isNavClick = e.target?.classList?.contains(navbarActiveClassname) ? true : false;
    if (!isNavClick) {
      navRef?.current?.classList?.remove(navbarActiveClassname);
      navRef?.current?.classList?.add('overflow--hidden');
    }
    root.classList?.remove(navbarActiveClassname);
  }

  const onNavClick = (e) => {
    const navBar = navRef.current;
    if (!navBar) return;
    root.classList?.toggle(navbarActiveClassname);
    navBar.classList?.toggle(navbarActiveClassname);

    if (!navBar.classList?.contains(navbarActiveClassname)) {
      navBar.classList.add('overflow--hidden');
      setIsAnimating(true);

    }
    else {
      e.stopPropagation();
      setIsAnimating(false);
    }
  }

  const onNavItemClick = (e) => {
    hide();
  }

  const onMouseEnter = (e) => {
    navRef.current.classList.remove('overflow--hidden');
  }

  useEffect(() => {
    document.body.addEventListener('click', onBodyClick);
  }, [onBodyClick]);

  useEffect(() => {
    const resetAnimatingId = setTimeout(() => {
      navRef.current?.classList?.remove('navbar--isAnimating');
    }, animationDuration);
    navRef.current?.classList?.add('navbar--isAnimating');

    return (() => {
      console.log('reset timeout------------------------------------------------');
      clearTimeout(resetAnimatingId);
    });

  }, [isAnimating])
  
  return ReactDOM.createPortal(
    <nav ref={navRef} className="navbar overflow--hidden" onClick={onNavClick}>
      <div className="navbar__button" to="/">
        <div className="navbar__menu">
          <div className="navbar__menu-bar"></div>
        </div>
      </div>
      <div className="navbar__content">
        <ul className="navbar__list">
          <NavListItem to="/about" label="About" onMouseEnter={onMouseEnter} onClick={onNavItemClick}/>
          <NavListItem 
            to="/works" 
            label="Examples" 
            onMouseEnter={onMouseEnter} onClick={onNavItemClick}
            className="navbar__item navbar__dropdown-container flex align-center justify-content-center"
          >
            <div className="triangle-down"></div>
            <ul className="navbar__dropdown">
              <NavListItem to="/works/bridge" label="Bridge" onMouseEnter={onMouseEnter} onClick={onNavItemClick}/>
              <NavListItem to="/works/csharp" label="C#" onMouseEnter={onMouseEnter} onClick={onNavItemClick}/>
              <NavListItem to="/works/python" label="Python" onMouseEnter={onMouseEnter} onClick={onNavItemClick}/>
              <NavListItem to="/works" label="All" onMouseEnter={onMouseEnter} onClick={onNavItemClick}/>
            </ul>
          </NavListItem>
          <NavListItem to="/resume" label="Resume" onMouseEnter={onMouseEnter} onClick={onNavItemClick}/>
          <NavListItem to="/contact" label="Contact" onMouseEnter={onMouseEnter} onClick={onNavItemClick}/>
        </ul>
      </div>
    </nav>,
    document.querySelector('#header')
  );
}

export default SiteNav;