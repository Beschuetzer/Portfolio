import React from 'react';
import {useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import NavListItem from './NavListItem';

import { setIsAnimating } from '../../actions';
import { checkForParentOfType } from '../../helpers';
import {
  NAVBAR_ACTIVE_CLASSNAME,
  NAVBAR_DONE_CLASSNAME,
  NAVBAR_IS_ANIMATING_CLASSNAME,
  ANIMATION_DURATION,
} from '../constants';

const SiteNav = ({isAnimating, setIsAnimating}) => {

  const navRef = useRef();
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

    if (!navBar) return;
    navBar.classList.add('overflow--hidden');

    if (!navBar.classList?.contains(NAVBAR_ACTIVE_CLASSNAME) && isChildOfNavBar && isValid ) {
      root.classList?.add(NAVBAR_ACTIVE_CLASSNAME);
      navBar.classList?.add(NAVBAR_ACTIVE_CLASSNAME);
      setIsAnimating(true);
    }
    else {
      root.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
      navBar.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
      navBar.classList?.remove(NAVBAR_DONE_CLASSNAME);
      setIsAnimating(false);
    }
  }

  const onNavItemClick = (e) => {
    hide();
  }

  const onMouseEnter = (e) => {
    e.stopPropagation();
    if (!navRef.current || !navRef.current?.classList.contains(NAVBAR_ACTIVE_CLASSNAME)
    ) { 
      navRef.current?.classList.add('overflow--hidden');
      return;
    }
    else if (navRef.current.classList.contains(NAVBAR_IS_ANIMATING_CLASSNAME) ||navRef.current.classList.contains(NAVBAR_DONE_CLASSNAME)) {
      navRef.current?.classList.remove('overflow--hidden');
    }
  } 

  useEffect(() => {
    const onBodyClick = (e) => {
      const isNavClick = e.target?.classList?.contains(NAVBAR_ACTIVE_CLASSNAME) ? true : false;
      if (!isNavClick) {
        navRef?.current?.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
        navRef?.current?.classList?.add('overflow--hidden');
      }
      root.classList?.remove(NAVBAR_ACTIVE_CLASSNAME);
    }
    document.body.addEventListener('click', onBodyClick);
  });

  useEffect(() => {
    console.log('isAnimating change------------------------------------------------');
    const navBar = navRef.current;
    const resetAnimatingId = setTimeout(() => {
      navBar?.classList?.remove('navbar--isAnimating');
      if (isAnimating && navBar.classList?.contains(NAVBAR_ACTIVE_CLASSNAME)) {
        root.classList?.add(NAVBAR_DONE_CLASSNAME);
        navBar.classList?.add(NAVBAR_DONE_CLASSNAME);
      }
      else {
        root.classList?.remove(NAVBAR_DONE_CLASSNAME);
        navBar.classList?.remove(NAVBAR_DONE_CLASSNAME);
      }
    }, ANIMATION_DURATION * 1.1);
    navBar?.classList?.add('navbar--isAnimating');

    return (() => {
      clearTimeout(resetAnimatingId);
    });

  }, [isAnimating, root])
  
  return ReactDOM.createPortal(
      <nav ref={navRef} className="z-index-navbar navbar overflow--hidden" onClick={onNavClick}>
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
        <div onClick={onNavClick} className='navbar__background'></div>
      </nav>
    ,
    document.querySelector('#header')
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAnimating: state.isAnimating,
  }
}

export default connect(mapStateToProps, {
  setIsAnimating,
})(SiteNav);