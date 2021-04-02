import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setPreviousUrl } from '../../actions';
import { capitalize } from '../../helpers';

class PageNav extends React.Component {
  static cssClass = 'page-nav';

  componentDidMount () {
    const { previousUrl } = this.props;
    const currentUrl = this.props.match?.url;
    
    console.log('previousUrl =', previousUrl);
  }

  renderSections = () => {
    console.log('render------------------------------------------------');
    const { previousUrl } = this.props;
    const currentUrl = this.props.match?.url;

    // if (previousUrl === currentUrl) return;

    if (!previousUrl || previousUrl !== currentUrl) this.props.setPreviousUrl(currentUrl);

    let sectionNames = [];
    const sections = document.querySelectorAll('[data-section]');

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const capitalized = capitalize(section.dataset.section);
      // debugger
      sectionNames.push(capitalized?.replace('-', ' '))
    }
    
    return sectionNames.map((sectionName, index, array) => {
      return (
        <span key={index} className={`${PageNav.cssClass}__section ${PageNav.cssClass}__section-${sectionName}`}>
          {sectionName}
          {index < (array.length - 1) ?
            '/'  
          : 
            null
          }
        </span>
      );
    });
  }

  render() {
    return (
      ReactDOM.createPortal(
        //The idea behind this component is to have a nav element that has quick links  to the sections of each page
        <React.Fragment>
          {this.renderSections()}
        </React.Fragment>
      ,
        document.querySelector('.page-nav')
      )
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { 
    previousUrl: state.general.previousUrl
  }
}

export default connect(mapStateToProps, {
  setPreviousUrl,
})(PageNav);