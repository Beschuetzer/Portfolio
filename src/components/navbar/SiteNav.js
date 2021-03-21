import React from 'react';
import {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import NavListItem from './NavListItem';

import { checkForParentOfType } from '../../helpers';

const SiteNav = (props) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const navRef = useRef();
  const navbarActiveClassname = 'navbar--active';
  const animationDuration = 500;
  const root = document.querySelector('#root');

  const hide = () => {
    navRef.current.classList.add('overflow--hidden');
  }

  

  const onNavClick = (e) => {
    e.stopPropagation();
    const navBar = navRef.current;
    let docStyle = getComputedStyle(document.documentElement);
    const isValid = e.clientX <= (11 * parseInt(docStyle.fontSize));
    const isChildOfNavBar = checkForParentOfType(e.target, 'nav', 'navbar');


    console.log('!navBar.classList?.contains(navbarActiveClassname) =', !navBar.
    classList?.contains(navbarActiveClassname));
    console.log('isChildOfNavBar =', isChildOfNavBar);
    
    console.log('isValid =', isValid);
    
    if (!navBar) return;

    if (!navBar.classList?.contains(navbarActiveClassname) && isChildOfNavBar && isValid ) {
      console.log('add------------------------------------------------');
      navBar.classList.add('overflow--hidden');
      root.classList?.add(navbarActiveClassname);
      navBar.classList?.add(navbarActiveClassname);
      setIsAnimating(true);
    }
    else {
      console.log('remove------------------------------------------------');
      root.classList?.remove(navbarActiveClassname);
      navBar.classList?.remove(navbarActiveClassname);
      setIsAnimating(false);
    }
  }

  const onNavItemClick = (e) => {
    hide();
  }

  const onMouseEnter = (e) => {
    console.log('navRef.Current =', navRef.Current);
    navRef.current?.classList.remove('overflow--hidden');
  }

  useEffect(() => {
    const onBodyClick = (e) => {
      const isNavClick = e.target?.classList?.contains(navbarActiveClassname) ? true : false;
      if (!isNavClick) {
        navRef?.current?.classList?.remove(navbarActiveClassname);
        navRef?.current?.classList?.add('overflow--hidden');
      }
      root.classList?.remove(navbarActiveClassname);
    }
    document.body.addEventListener('click', onBodyClick);
  });

  useEffect(() => {
    const resetAnimatingId = setTimeout(() => {
      navRef.current?.classList?.remove('navbar--isAnimating');
    }, animationDuration * .7);
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