import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';

class PageNav extends React.Component {
  componentDidMount() {
    
  }

  renderSections = () => {
    
  }

  render() {
    return (
      ReactDOM.createPortal(
        //The idea behind this component is to have a nav element that has quick links  to the sections of each page
        <div class="page-nav">
          renderSections()
        </div>
      ,
        document.querySelector('.header__inner')
      )
    );
  }
}

export default PageNav;