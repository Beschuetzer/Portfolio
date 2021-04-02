import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';

class PageNav extends React.Component {
  renderSections = () => {
    return (
      <div>Rendered Sections here</div>
    )
  }

  render() {
    console.log('this.props.sectionsToAddToPageNav =', this.props.sectionsToAddToPageNav);
    return (
      ReactDOM.createPortal(
        //The idea behind this component is to have a nav element that has quick links  to the sections of each page
        <div className="page-nav">
          {this.renderSections()}
        </div>
      ,
        document.querySelector('.header__inner')
      )
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { 
    sectionsToAddToPageNav: state.sectionsToAddToPageNav,
  }
}

export default connect(mapStateToProps, {
  
})(PageNav);