import React from 'react';
import ReactDOM from 'react-dom';

class NavToggler extends React.Component {
  // const headerHeight
  static headerTogglerWidth = '4rem';

  handleOnClick = (e) => {
    e.currentTarget.parentNode?.classList?.toggle('header-toggler--active')
  }

  render () {
    return (
      ReactDOM.createPortal(
        <svg 
          onClick={this.handleOnClick}  
          className="header-toggler__svg"
        >
          <use xlinkHref="/sprite.svg#icon-angle-double-down"></use>
        </svg>
      ,
        document.body.querySelector('.header-toggler')
      )
    );
  }
}

export default NavToggler;