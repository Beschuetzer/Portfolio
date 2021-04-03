import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setPreviousUrl } from '../../actions';
import { capitalize } from '../../helpers';

class PageNav extends React.Component {
  static cssClass = 'page-nav';
  static gradientVarName = '--site-nav-linear-gradient';
  static mainColor = '#f4d160';
  static progressColor = '#8ac4d0';
  static progressPercent = '22.5%';

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e) => {
    const scrollY = window.scrollY;
    const maxScrollY = document.body.scrollHeight - window.innerHeight;
    console.log('scrollY =', scrollY);
    console.log('maxScrollY =', maxScrollY);
  }

  setScrollProgress = () => {
    const newGradient = `
      linear-gradient(to right, 
        ${PageNav.progressColor} 0%, 
        ${PageNav.progressColor} ${PageNav.progressPercent},
        ${PageNav.mainColor} ${PageNav.progressPercent},
        ${PageNav.mainColor} 100%)`
    ;
    document.documentElement.style.setProperty(PageNav.gradientVarName, newGradient);
  }

  renderSections = () => {
    this.setScrollProgress();
    const { previousUrl } = this.props;
    const currentUrl = this.props.match?.url;

    if (!previousUrl || previousUrl !== currentUrl) this.props.setPreviousUrl(currentUrl);

    let sectionNames = [];
    const sections = document.querySelectorAll('[data-section]');
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const capitalized = capitalize(section.dataset.section);
      sectionNames.push(capitalized)
    }
    
    return sectionNames.map((sectionName, index, array) => {
      return (
        <a href={`${this.props.match.url}#${sectionName?.toLowerCase()}`} key={index} className={`${PageNav.cssClass}__section ${PageNav.cssClass}__section-${sectionName}`}>
          {sectionName}
          &nbsp;
          {index < (array.length - 1) ?
            '/'  
          : 
            null
          }
          &nbsp;
        </a>
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