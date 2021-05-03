import React from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

const NavToggler = ({headerHeight}) => {
  //This is how many pixels 1rem equals at given viewport width
  

  useEffect(() => {
    const headerHeightInRem = headerHeight / 10;
    const newWidth = `${headerHeightInRem + 5}rem`;
    document.documentElement.style.setProperty('--header-toggler-height', newWidth);
  }, [headerHeight])

  const handleOnClick = (e) => {
    e.currentTarget.parentNode?.classList?.toggle('header-toggler--active')
  }

  return (
    ReactDOM.createPortal(
      <svg 
        onClick={handleOnClick}  
        className="header-toggler__svg"
      >
        <use xlinkHref="/sprite.svg#icon-angle-double-down"></use>
      </svg>
    ,
      document.body.querySelector('.header-toggler')
    )
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    headerHeight: state.general.headerHeight,
  }
}

export default connect(mapStateToProps, {

})(NavToggler);