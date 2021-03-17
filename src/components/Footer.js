import React from 'react';
import ReactDOM from 'react-dom';

class Footer extends React.Component {
  render() {
    return ReactDOM.createPortal(
      <div>Footer</div>,
      document.querySelector('#footer')
    );
  }
}

export default Footer;