import React from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { viewPortPixelToRem, headerTogglerWidth } from '../constants';

const NavToggler = ({headerHeight, viewPortWidth}) => {
  
  //Adjusting NavToggler height to match header height as it changes on resizes
  useEffect(() => {
    const getPixelToRemConversionToUse = () => {
      let pixelToRemConversionToUse = viewPortPixelToRem.full.pixelsToRem;
      for (const [key, value] of Object.entries(viewPortPixelToRem)) {
        if (viewPortWidth >= viewPortPixelToRem[key].min && viewPortWidth <= viewPortPixelToRem[key].max) return viewPortPixelToRem[key].pixelsToRem;

      }
      return pixelToRemConversionToUse;
    }

    // debugger
    const pixelToRemConversionToUse = getPixelToRemConversionToUse();
    const headerHeightInRem = headerHeight / pixelToRemConversionToUse;
    const newWidth = `${headerHeightInRem + parseFloat(headerTogglerWidth)}rem`;
    document.documentElement.style.setProperty('--header-toggler-height', newWidth);
  }, [headerHeight, viewPortWidth])

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
    viewPortWidth: state.general.viewPortWidth,
  }
}

export default connect(mapStateToProps, {

})(NavToggler);