import React from 'react';
import ReactDOM from 'react-dom';

class NavToggler extends React.Component {
  render () {
    return (
      ReactDOM.createPortal(
        <div className='header-toggle'>
          <svg className="header-toggle__svg">
            <use xlinkHref="sprite.svg#icon-angle-double-down"></use>
          </svg>
        </div>
      ,
        document.body
      )
    );
  }
}

export default NavToggler;