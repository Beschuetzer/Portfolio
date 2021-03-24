import React from 'react';
import {useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import NavListItem from './NavListItem';

import { setIsAnimating } from '../../actions';
import { checkForParentOfType } from '../../helpers';

const SiteNav = ({isAnimating, setIsAnimating}) => {

  const navRef = useRef();
  const navbarActiveClassname = 'navbar--active';
  const navbarDoneClassname = 'navbar--done';
  const navbarIsAnimatingClassname = 'navbar--isAnimating';
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

    if (!navBar) return;
    navBar.classList.add('overflow--hidden');

    if (!navBar.classList?.contains(navbarActiveClassname) && isChildOfNavBar && isValid ) {
      root.classList?.add(navbarActiveClassname);
      navBar.classList?.add(navbarActiveClassname);
      setIsAnimating(true);
    }
    else {
      root.classList?.remove(navbarActiveClassname);
      navBar.classList?.remove(navbarActiveClassname);
      navBar.classList?.remove(navbarDoneClassname);
      setIsAnimating(false);
    }
  }

  const onNavItemClick = (e) => {
    hide();
  }

  const onMouseEnter = (e) => {
    e.stopPropagation();
    if (!navRef.current || !navRef.current?.classList.contains(navbarActiveClassname)
    ) { 
      navRef.current?.classList.add('overflow--hidden');
      return;
    }
    else if (navRef.current.classList.contains(navbarIsAnimatingClassname) ||navRef.current.classList.contains(navbarDoneClassname)) {
      navRef.current?.classList.remove('overflow--hidden');
    }
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
    const navBar = navRef.current;
    const resetAnimatingId = setTimeout(() => {
      navBar?.classList?.remove('navbar--isAnimating');
      if (isAnimating && navBar.classList?.contains(navbarActiveClassname)) {
        root.classList?.add(navbarDoneClassname);
        navBar.classList?.add(navbarDoneClassname);
      }
      else {
        root.classList?.remove(navbarDoneClassname);
        navBar.classList?.remove(navbarDoneClassname);
      }
    }, animationDuration * 1.1);
    navBar?.classList?.add('navbar--isAnimating');

    return (() => {
      clearTimeout(resetAnimatingId);
    });

  }, [isAnimating, root])
  
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